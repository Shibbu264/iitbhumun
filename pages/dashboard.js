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
    Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import data from "./../data/data.json"
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const [registration, setRegistration] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const session = useSession()
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
        fetchRegistration();
    }, [session.status]);

    const fetchRegistration = async () => {
        if (session.status == "loading" || session.status == "unauthenticated") { return; }
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
            setError('Failed to fetch registration data');
        } finally {
            setLoading(false);
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
        { label: 'Referral Code', key: 'referralCode' },
        { label: 'Number of MUNs', key: 'numberOfMUNs' },
        { label: 'Previous MUNs', key: 'listOfPreviousMUNs' },
        { label: 'Awards in MUNs', key: 'awardsInPreviousMUNs' },
    ];

    return (
        <div className='flex flex-col'>
            <NavBar navbar={true} />
            <div className='md:mt-20 mt-16'>
                <div className='max-w-7xl mx-auto w-full'>
                    <div className='grid grid-cols-12 gap-4 md:px-6 px-4 items-center w-full'>
                        <div className='col-span-12'> <TicketSelection registration={registration} /></div>
                        <div className='col-span-12 md:col-start-3 md:col-span-8'>
                            <Paper elevation={3} sx={{ p: 3 }}>
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