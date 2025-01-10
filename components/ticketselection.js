import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const ticketTypes = [
  {
    id: 'bhu/iitbhu',
    label: 'IIT BHU/BHU Student (899)'
  },
  {
    id: 'non bhu without accomodation ',
    label: 'Non BHU Student (No Accommodation) (999)'
  },
  {
    id: 'accomodation included',
    label: 'Non BHU Student With Accommodation (1899)'
  },
  {
    id: 'Mock',
    label: 'Mock'
  },
];

export default function TicketSelection({ registration }) {
  const [selectedTicketType, setSelectedTicketType] = useState('');

  return (
    <Box border={1} borderRadius={4} sx={{ mt: 4,  p: 4, borderColor: 'divider' }}>
      <Typography variant="h5" gutterBottom>
        Purchase Ticket
      </Typography>
      
      {/* Temporary Coming Soon Message */}
      <Typography variant="h6" color="primary" align="center" sx={{ mt: 3 }}>
        Payment Coming Soon!
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 1 }}>
        Please check back later to purchase your tickets.
      </Typography>

      {/* Original ticket selection code - commented out
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
                  {type.label} - <strong>{type.price}</strong>
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedTicketType && (
          <Box sx={{ mt: 2 }}>
            <iframe
              id="ts-iframe"
              src={`https://www.townscript.com/v2/widget/model-united-nations-412203/booking?td-${selectedTicketType}=1&name=${registration?.name}&emailid=${registration?.emailId}`}
              frameBorder="0"
              height="500"
              width="100%"
            />
          </Box>
        )}
      </Box>
      */}
    </Box>
  );
}