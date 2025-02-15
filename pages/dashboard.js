import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import TicketSelection from '../components/ticketselection';
import {
    Box,
    Paper,
    Typography,
    Grid,
    IconButton,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Snackbar,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import data from "./../data/data.json"
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import useSWR, { preload } from 'swr';
export default function Dashboard() {
    const [registration, setRegistration] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const session = useSession();
    const COMMITTEE_OPTIONS = {
        'None': [],
        'JPC': data.jpc,
        'UNODC': data.unodc,
        'AIPPM': data.aippm,
        'BCCI': data.bcci,
        'DISEC': data.disec,
        'UNCSW': data.uncsw,
        'UNHRC': data.unhrc,
        'GA-LEGAL': data.ga_legal,
      };

    useEffect(() => {
        if (session.status == "authenticated") 
        {
            fetchRegistration();
            fetchPayments();
        }
    }, [session]);

    const fetchRegistration = async () => {
        try {
            const response = await fetch('/api/register');
            const data = await response.json();
            if (response.ok) {
                setRegistration(data);
                setEditedData(data);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error('Failed to fetch registration data:', err);
            toast.error('Failed to fetch registration data');
        } finally {
            setLoading(false);
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await fetch('/api/fetchpayment');
            if (response.ok) {
                const data = await response.json();
                setPayments(data.payments.filter(p => p.user.email === registration.emailId));
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditedData(registration);
        setEditMode(false);
    };
    // ... existing code ...

    const handleChange = (field) => (event) => {
        if (field.includes('[')) {
            const value = event.target.value;
            setEditedData(prevData => {
                const newData = { ...prevData };
                const matches = field.match(/([\w]+)\[(\d+)\](?:\[(\d+)\])?/);
                if (matches) {
                    const [_, arrayName, index1, index2] = matches;

                    if (arrayName === 'committees') {
                        if (!newData.committees) newData.committees = [];
                        newData.committees[index1] = value;
                    } else if (arrayName === 'countryPreferences') {
                        if (!newData.countryPreferences) newData.countryPreferences = [];
                        if (!newData.countryPreferences[index1]) newData.countryPreferences[index1] = [];
                        newData.countryPreferences[index1][index2] = value;
                    }
                }

                return newData;
            });
        } else {
            setEditedData(prevData => ({
                ...prevData,
                [field]: event.target.value
            }));
        }
    };

    const renderCommitteeOptions = (selectedCommittee) => {
        if (!selectedCommittee || selectedCommittee === 'None') return null;
        return COMMITTEE_OPTIONS[selectedCommittee]?.map(option => (
            <option key={option} value={option}>{option}</option>
        )) || null;
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            const data = await response.json();

            if (response.ok) {
                setRegistration(data);
                setEditMode(false);
                toast.success('Data updated successfully!');
            } else {
                setError(data.message);
            }
        } catch (err) {
            toast.error('Failed to update data');
        }
    };

    // Define fetcher function
    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    };

    // Preload payment data as soon as we have the email
    useEffect(() => {
        if (registration?.emailId) {
            preload(`/api/fetchpayment?email=${registration.emailId}`, fetcher);
        }
    }, [registration?.emailId]);

    // Use SWR for payments with optimized config
    const { data: paymentData, error: paymentError } = useSWR(
        registration?.emailId ? `/api/fetchpayment?email=${registration.emailId}` : null,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshInterval: 10000,
            dedupingInterval: 2000,
            keepPreviousData: true,
        }
    );

    const payments = paymentData?.payments || [];
    const isPaymentLoading = !paymentData && !paymentError;

    // Memoized Payment Status Component
    const PaymentStatusSection = React.memo(() => {
        if (!registration?.emailId) return null;

        if (isPaymentLoading) {
            return (
                <Box mb={3} p={2} bgcolor="#f5f5f5" borderRadius={1} display="flex" alignItems="center">
                    <CircularProgress size={20} />
                    <Typography ml={2}>Loading payment status...</Typography>
                </Box>
            );
        }

        if (!payments.length || payments.every(p => p.status === 'rejected')) {
            return <TicketSelection registration={registration} />;
        }

        return (
            <Box 
                mb={3} 
                p={2} 
                bgcolor={payments.some(p => p.status === 'verified') ? "#e8f5e9" : "#fff3e0"} 
                borderRadius={1}
                border={1}
                borderColor={payments.some(p => p.status === 'verified') ? "success.main" : "warning.main"}
            >
                <Typography variant="h6" gutterBottom>
                    Payment Status
                </Typography>
                {payments.map((payment) => (
                    <Box key={payment.id} mb={1}>
                        <Typography variant="body1">
                            <strong>Ticket Type:</strong> {payment.ticketType.split('_').join(' ').toUpperCase()}
                            <br />
                            <strong>Amount:</strong> ₹{payment.amount}
                            <br />
                            <strong>Status:</strong> {
                                payment.status === 'verified' ? (
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>Payment Verified ✓</span>
                                ) : payment.status === 'rejected' ? (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Payment Rejected ✕</span>
                                ) : (
                                    <span style={{ color: 'orange', fontWeight: 'bold' }}>Verification Pending...</span>
                                )
                            }
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    });
    PaymentStatusSection.displayName = 'PaymentStatusSection';

    const AllocationSection = React.memo(({ registration, COMMITTEE_OPTIONS }) => {
        const [showRequestForm, setShowRequestForm] = useState(false);
        const [requestChoices, setRequestChoices] = useState({
            committees: Object.keys(COMMITTEE_OPTIONS).reduce((acc, committee) => {
                acc[committee] = ['', '']; 
                return acc;
            }, {})
        });
        const [availableCountries, setAvailableCountries] = useState({});

        // Reset form when registration changes
        useEffect(() => {
            if (registration?.allotmentApproved) {
                setShowRequestForm(false);
            }
        }, [registration?.allotmentApproved]);

        // Fetch available countries for all committees when form opens
        useEffect(() => {
            if (showRequestForm) {
                fetch(`/api/getallocations`)
                    .then(res => res.json())
                    .then(allocatedCountries => {
                        const available = {};
                        Object.keys(COMMITTEE_OPTIONS).forEach(committee => {
                            if (committee !== 'None') {
                                const allCountries = COMMITTEE_OPTIONS[committee] || [];
                                available[committee] = allCountries.filter(country => 
                                    !allocatedCountries[committee]?.includes(country)
                                );
                            }
                        });
                        setAvailableCountries(available);
                    });
            }
        }, [showRequestForm]);

        const handleReject = async () => {
            setShowRequestForm(true);
        };

        const handleAccept = async () => {
            try {
                console.log('Accepting allocation for registration:', registration.id); // Debug log

                const response = await fetch('/api/acceptallocation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        registrationId: registration.id
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server response:', errorText); // Debug log
                    throw new Error(`Server responded with ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                
                // Update local state
                setRegistration(prev => ({
                    ...prev,
                    allotmentApproved: true
                }));
                
                toast.success('Allocation accepted successfully!');
            } catch (error) {
                console.error('Error accepting allocation:', error);
                toast.error('Failed to accept allocation: ' + error.message);
            }
        };

        const handleCountryChange = (committee, choiceIndex, value) => {
            setRequestChoices(prev => ({
                committees: {
                    ...prev.committees,
                    [committee]: prev.committees[committee].map((choice, idx) => 
                        idx === choiceIndex ? value : choice
                    )
                }
            }));
        };

        const handleRequestSubmit = async () => {
            try {
                // Format the choices for submission
                const choices = Object.entries(requestChoices.committees)
                    .filter(([committee, countries]) => countries.some(country => country !== ''))
                    .map(([committee, countries]) => ({
                        committee,
                        preferences: countries.filter(country => country !== '')
                    }));

                // Store the request in countryPreferences
                const updatedPreferences = {
                    ...registration.countryPreferences,
                    pendingRequest: {
                        choices: choices,
                        status: 'pending'
                    }
                };

                const response = await fetch('/api/register', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...registration,
                        countryPreferences: updatedPreferences,
                        allotmentApproved: false
                    }),
                });

                if (response.ok) {
                    toast.success('Allocation change request submitted successfully!');
                    setShowRequestForm(false);
                    window.location.reload();
                } else {
                    throw new Error('Failed to submit request');
                }
            } catch (error) {
                toast.error('Failed to submit allocation request');
            }
        };

        if (!registration?.alloted?.length) return null;

        const [currentCommittee, currentCountry] = registration.alloted[0].split(':');

        // If allocation is approved, show only the current allocation
        if (registration.allotmentApproved) {
            return (
                <Box mb={3}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom color="success.main">
                            Your Confirmed Allocation
                        </Typography>
                        <Box mb={2} sx={{ bgcolor: '#f0f9f0', p: 2, borderRadius: 1 }}>
                            <Typography variant="h6" color="success.dark">
                                Committee: <strong>{currentCommittee}</strong>
                            </Typography>
                            <Typography variant="h6" color="success.dark">
                                Country: <strong>{currentCountry}</strong>
                            </Typography>
                        </Box>
                        <Alert severity="success" sx={{ mt: 2 }}>
                            You have accepted this allocation. Good luck with your committee!
                        </Alert>
                    </Paper>
                </Box>
            );
        }

        // Show pending request or allocation options
        return (
            <Box mb={3}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Current Allocation
                    </Typography>
                    
                    <Box mb={2}>
                        <Typography>
                            Committee: <strong>{currentCommittee}</strong>
                            <br />
                            Country: <strong>{currentCountry}</strong>
                        </Typography>
                    </Box>

                    {!registration.countryPreferences?.pendingRequest && (
                        <Box display="flex" gap={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleAccept}
                            >
                                Accept Allocation
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleReject}
                            >
                                Request Change
                            </Button>
                        </Box>
                    )}

                    {registration.countryPreferences?.pendingRequest && (
                        <Box mt={3} p={2} bgcolor="#fff3e0" borderRadius={1} border={1} borderColor="warning.main">
                            <Typography variant="h6" gutterBottom color="warning.dark">
                                Pending Change Request
                            </Typography>
                            {registration.countryPreferences.pendingRequest.choices.map((choice, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {choice.committee}
                                    </Typography>
                                    <Typography>
                                        Preferences: {choice.preferences.join(', ')}
                                    </Typography>
                                </Box>
                            ))}
                            <Typography variant="body2" color="warning.dark" mt={2}>
                                Your request is under review by the administrators.
                            </Typography>
                        </Box>
                    )}

                    {showRequestForm && (
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>
                                Request New Allocation
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                {"Select up to 2 country preferences for each committee you're interested in."}
                            </Typography>
                            
                            {Object.keys(COMMITTEE_OPTIONS).map(committee => {
                                if (committee === 'None') return null;
                                
                                return (
                                    <Box key={committee} mb={4}>
                                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                            {committee}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {[0, 1].map((choiceIndex) => (
                                                <Grid item xs={12} sm={6} key={choiceIndex}>
                                                    <TextField
                                                        fullWidth
                                                        select
                                                        label={`Preference ${choiceIndex + 1}`}
                                                        value={requestChoices.committees[committee][choiceIndex]}
                                                        onChange={(e) => handleCountryChange(committee, choiceIndex, e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {availableCountries[committee]?.map((country) => (
                                                            <MenuItem 
                                                                key={country} 
                                                                value={country}
                                                                disabled={requestChoices.committees[committee].includes(country) && 
                                                                         requestChoices.committees[committee][choiceIndex] !== country}
                                                            >
                                                                {country}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                );
                            })}
                            
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleRequestSubmit}
                                    disabled={!Object.values(requestChoices.committees)
                                        .some(choices => choices.some(choice => choice !== ''))}
                                >
                                    Submit Request
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>
        );
    });
    AllocationSection.displayName = 'AllocationSection';

    if (loading || registration == null) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress className="w-12 h-12" />
            </Box>

        );
    }

    const fields = [
        { label: 'Name', key: 'name' },
        { label: 'Age', key: 'age' },
        { label: 'Gender', key: 'gender' },
        { label: 'City', key: 'city' },
        { label: 'Country', key: 'country' },
        { label: 'Institute Name', key: 'instituteName' },
        { label: 'Mobile Number', key: 'mobileNumber' },
        { label: 'Email ID', key: 'emailId', readOnly: true },
        { label: 'Number of MUNs', key: 'numberOfMUNs' },
        { label: 'Awards in MUNs', key: 'awardsInPreviousMUNs' },
        { label: 'Referral Code', key: 'referralCode' }
    ];

    return (
        <div className='flex flex-col'>
            <NavBar navbar={true} />
            <div className='md:mt-20 mt-16'>
                <div className='max-w-7xl mx-auto w-full'>
                    <div className='grid grid-cols-12 gap-4 md:px-6 px-4 items-center w-full'>
                        <div className='col-span-12'>
                            <PaymentStatusSection />
                        </div>
                        
                        <div className='col-span-12 md:col-start-3 md:col-span-8'>
                            <Box display="flex" justifyContent="center">
                                <Button 
                                    variant="contained" 
                                    href="https://forms.gle/VD5vELwEVNbCmZYdA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ 
                                        px: 4,
                                        py: 2,
                                        mb: 3,
                                        bgcolor: '#dc2626',
                                        '&:hover': {
                                            bgcolor: '#b91c1c',
                                        }
                                    }}
                                >
                                    Accommodation Form
                                </Button>
                            </Box>
                        </div>

                        {/* Add Allocation Section here, before the registration details */}
                        <div className='col-span-12 md:col-start-3 md:col-span-8'>
                            <AllocationSection 
                                registration={registration}
                                COMMITTEE_OPTIONS={COMMITTEE_OPTIONS}
                            />
                        </div>

                        <div className='col-span-12 md:col-start-3 md:col-span-8'>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                {registration?.alloted && registration.alloted.length > 0 && (
                                    <Box 
                                        mb={3} 
                                        p={2} 
                                        bgcolor="#e8f5e9" 
                                        borderRadius={1}
                                        border={1}
                                        borderColor="success.main"
                                    >
                                        <Typography variant="h6" color="success.main" gutterBottom>
                                            Allotted Committee and Country
                                        </Typography>
                                        {registration.alloted.map((allotment, index) => {
                                            const [committee, country] = allotment.split(':');
                                            return (
                                                <Typography key={index} variant="body1" color="success.dark">
                                                    Committee: <strong>{committee}</strong> | Country: <strong>{country}</strong>
                                                </Typography>
                                            );
                                        })}
                                    </Box>
                                )}

                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h4">Registration Details</Typography>
                                    {!editMode ? (
                                        <IconButton onClick={handleEdit} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    ) : (
                                        <Box>
                                            <IconButton onClick={handleSubmit} color="primary">
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={handleCancel} color="error">
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                                <Grid container spacing={3}>
                                    {fields.map((field) => (
                                        <Grid item xs={12} sm={6} key={field.key}>
                                            {editMode ? (
                                                <TextField
                                                    fullWidth
                                                    label={field.label}
                                                    value={editedData[field.key] || ''}
                                                    onChange={handleChange(field.key)}
                                                    disabled={field.readOnly}
                                                />
                                            ) : (
                                                <Box>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        {field.label}
                                                    </Typography>
                                                    <Typography>{registration[field.key]}</Typography>
                                                </Box>
                                            )}
                                        </Grid>
                                    ))}

                                    {/* New Committee and Country Preferences Section */}
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>Committee Selections</Typography>
                                        <Grid container spacing={3}>
                                            {['PORTFOLIO I', 'PORTFOLIO II', 'PORTFOLIO III'].map((portfolio, index) => (
                                                <Grid item xs={12} md={4} key={portfolio}>
                                                    <Paper elevation={2} sx={{ p: 2 }}>
                                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                                                            {portfolio}
                                                        </Typography>

                                                        <Box sx={{ mb: 2 }}>
                                                            <Typography variant="subtitle2" color="textSecondary">
                                                                Committee
                                                            </Typography>
                                                            {editMode ? (
                                                                <TextField
                                                                    fullWidth
                                                                    select
                                                                    value={editedData.committees?.[index] || ''}
                                                                    onChange={handleChange(`committees[${index}]`)}
                                                                    SelectProps={{ native: true }}
                                                                >
                                                                    {data.registerCommittees.map(committee => (
                                                                        <option key={committee} value={committee}>
                                                                            {committee}
                                                                        </option>
                                                                    ))}
                                                                </TextField>
                                                            ) : (
                                                                <Typography>
                                                                    {registration.committees?.[index]}
                                                                </Typography>
                                                            )}
                                                        </Box>

                                                        {[0, 1, 2].map((prefIndex) => (
                                                            <Box key={prefIndex} sx={{ mb: 1 }}>
                                                                <Typography variant="subtitle2" color="textSecondary">
                                                                    Country Preference {prefIndex + 1}
                                                                </Typography>
                                                                {editMode ? (
                                                                    <TextField
                                                                        fullWidth
                                                                        select
                                                                        value={editedData.countryPreferences?.[index]?.[prefIndex] || ''}
                                                                        onChange={handleChange(`countryPreferences[${index}][${prefIndex}]`)}
                                                                        SelectProps={{ native: true }}
                                                                    >
                                                                        {renderCommitteeOptions(editedData.committees?.[index])}
                                                                    </TextField>
                                                                ) : (
                                                                    <Typography>
                                                                        {registration.countryPreferences?.[index]?.[prefIndex]}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        ))}

                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {editMode && <div className='flex justify-center mt-4 mx-auto'><Button variant="contained" onClick={handleSubmit}>Submit</Button></div>}
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}