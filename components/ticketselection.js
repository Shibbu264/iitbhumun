import { Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
   {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const ticketTypes = [
  {
    id: 'iitbhu',
    label: 'IIT BHU Student',
    price: 699,
    qrCode: '/images/upi699.png'
  },
  {
    id: 'bhu',
    label: 'BHU Student',
    price: 1199,
    qrCode: '/images/upi1199.png'
  },
  {
    id: 'otherstudents',
    label: 'Other Institution Student',
    price: 1759,
    qrCode: '/images/upi1759.png'
  }
];

export default function TicketSelection({ registration }) {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [idCardPreviewUrl, setIdCardPreviewUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setPaymentProof(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleIdCardUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setIdCard(file);
      setIdCardPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitPayment = async () => {
    const requiresIdCard = ['iitbhu', 'bhu'].includes(selectedTicketType);
    
    if (!selectedTicketType || !paymentProof || (requiresIdCard && !idCard)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = paymentProof.name.split('.').pop();
      const fileName = `${registration.id}-${Date.now()}.${fileExt}`;
      const filePath = `payment-proofs/${fileName}`;

      // Simple upload without auth
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ss')
        .upload(filePath, paymentProof, {
          cacheControl: '3600',
          contentType: paymentProof.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data } = supabase.storage
        .from('ss')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      // Upload ID card if required
      let idCardUrl = null;
      if (requiresIdCard) {
        const fileExt = idCard.name.split('.').pop();
        const fileName = `${registration.id}-idcard-${Date.now()}.${fileExt}`;
        const filePath = `id-cards/${fileName}`;

        const { data: idUploadData, error: idUploadError } = await supabase.storage
          .from('ss')
          .upload(filePath, idCard, {
            cacheControl: '3600',
            contentType: idCard.type
          });

        if (idUploadError) throw new Error(`ID card upload failed: ${idUploadError.message}`);

        const { data: idUrlData } = supabase.storage
          .from('ss')
          .getPublicUrl(filePath);

        idCardUrl = idUrlData.publicUrl;
      }

      // Modify API call to include ID card URL
      const response = await fetch('/api/paymentqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketType: selectedTicketType,
          amount: ticketTypes.find(t => t.id === selectedTicketType)?.price,
          imageUrl: data.publicUrl,
          idCardUrl: idCardUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment details');
      }

      toast.success('Payment proof submitted successfully!');
      setSelectedTicketType('');
      setPaymentProof(null);
      setPreviewUrl(null);
      setIdCard(null);
      setIdCardPreviewUrl(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to submit payment proof: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box border={1} borderRadius={4} sx={{ mt: 4, p: 4, borderColor: 'divider' }}>
      <Typography variant="h5" gutterBottom>
        Purchase Ticket
      </Typography>

      <Box>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Select Ticket Type
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={selectedTicketType}
            onChange={(e) => setSelectedTicketType(e.target.value)}
            displayEmpty
            sx={{
              backgroundColor: 'background.paper',
              '& .MuiSelect-select': {
                padding: '10px 14px',
              }
            }}
          >
            <MenuItem value="" disabled>
              Choose your ticket type
            </MenuItem>
            {ticketTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Typography>
                  {type.label} - ₹{type.price}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedTicketType && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payment Instructions
            </Typography>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Image 
                src={ticketTypes.find(type => type.id === selectedTicketType)?.qrCode}
                alt={`Payment QR Code for ${ticketTypes.find(type => type.id === selectedTicketType)?.label}`}
                width={300}
                height={300}
              />
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Scan QR code to pay ₹{ticketTypes.find(t => t.id === selectedTicketType)?.price}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Payment Screenshot
              </Typography>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="payment-proof-upload"
              />
              <label htmlFor="payment-proof-upload">
                <Button 
                  variant="outlined" 
                  component="span"
                  disabled={loading}
                >
                  Upload Screenshot
                </Button>
              </label>
              
              {previewUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>Preview:</Typography>
                  <Image 
                    src={previewUrl} 
                    alt="Payment proof preview" 
                    width={200} 
                    height={200}
                    objectFit="contain"
                  />
                </Box>
              )}
            </Box>

            {['iitbhu', 'bhu'].includes(selectedTicketType) && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Student ID Card (Required)
                </Typography>
                <Typography variant="body2" color="error" gutterBottom>
                  If your ID card is not found valid, our team will contact you.
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleIdCardUpload}
                  style={{ display: 'none' }}
                  id="id-card-upload"
                />
                <label htmlFor="id-card-upload">
                  <Button 
                    variant="outlined" 
                    component="span"
                    disabled={loading}
                  >
                    Upload ID Card
                  </Button>
                </label>
                
                {idCardPreviewUrl && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>ID Card Preview:</Typography>
                    <Image 
                      src={idCardPreviewUrl} 
                      alt="ID card preview" 
                      width={200} 
                      height={200}
                      objectFit="contain"
                    />
                  </Box>
                )}
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmitPayment}
              disabled={loading || !paymentProof || (['iitbhu', 'bhu'].includes(selectedTicketType) && !idCard)}
            >
              {loading ? 'Submitting...' : 'Submit Payment Proof'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}