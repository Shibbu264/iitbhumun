import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Alert, Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
// Import data from a separate file
import data from "../../../data/data.json";
import CommitteeSelectionStage from '../../RegistrationStages/CommitteeSelectionStage';
import PersonalInfoStage from '../../RegistrationStages/PersonalInfoStage';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../../lib/slices/GlobalDialogWrapperSlice';
import { setUser } from '../../../lib/slices/userSlice';

// Constant for committee mapping
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

// Initial form input structure
const INITIAL_FORM_INPUT = {
  Event_ID: 0,
  Name: '',
  Age: 0,
  Gender: '',
  City: '',
  Country: '',
  Institute_Name: '',
  Mobile_Number: '',
  Email_ID: '',
  Referral_Code: '',
  No_of_MUNs: '',
  List_of_previous_MUNs: '',
  Awards_in_previous_MUNs: '',
};

const Register = () => {
  const dispatch=useDispatch()
  const eventId = Math.floor(100000 + Math.random() * 900000);
  const user=useSelector(state=>state.user)
  const session=useSession()
  const [isPersonalInfoStage, setIsPersonalInfoStage] = useState(true);
  const [formInput, setFormInput] = useState({
    ...INITIAL_FORM_INPUT,
    Event_ID: eventId,
    Email_ID:session?.data?.user?.email,
    Name:session?.data?.user?.name
  });
  const [committeeSelections, setCommitteeSelections] = useState({
    committees: ['None', 'None', 'None'],
    countryPreferences: [
      ['Select an option', 'Select an option', 'Select an option'],
      ['Select an option', 'Select an option', 'Select an option'],
      ['Select an option', 'Select an option', 'Select an option']
    ]
  });
  const [formErrors, setFormErrors] = useState({});


  const validatePersonalInfo = () => {
    const errors = {};
    const requiredFields = [
      'Name', 'Age', 'Gender', 'Institute_Name', 
      'Mobile_Number', 'Email_ID'
    ];

    requiredFields.forEach(field => {
      if (!formInput[field]) {
        errors[field] = `${field} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCommitteeSelection = () => {
    const errors = {};

    // Validate committee selections
    committeeSelections.committees.forEach((committee, index) => {
      if (committee === 'None') {
        errors[`committee_${index}`] = 'Please select a committee';
      }
    });

    // Validate country preferences
    committeeSelections.countryPreferences.forEach((preferences, committeIndex) => {
      preferences.forEach((pref, prefIndex) => {
        if (!pref) {
          errors[`preference_${committeIndex}_${prefIndex}`] = 'Please select a country';
        }
      });
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler for personal info input
  const handlePersonalInfoChange = (e) => {
    const { id, value } = e.target;
    setFormInput(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handler for committee selection
  const handleCommitteeSelection = (portfolioIndex, value) => {
    const updatedCommittees = [...committeeSelections.committees];
    updatedCommittees[portfolioIndex] = value;

    setCommitteeSelections(prev => ({
      ...prev,
      committees: updatedCommittees
    }));
  };

  // Handler for country preference selection
  const handleCountryPreferenceSelection = (committeeIndex, optionIndex, value) => {
    const updatedCountryPreferences = [...committeeSelections.countryPreferences];
    updatedCountryPreferences[committeeIndex][optionIndex] = value;

    setCommitteeSelections(prev => ({
      ...prev,
      countryPreferences: updatedCountryPreferences
    }));
  };

  // Render committee options
  const renderCommitteeOptions = (selectedCommittee) => {
    if (!selectedCommittee || selectedCommittee === 'None') return null;
    return COMMITTEE_OPTIONS[selectedCommittee]?.map(option => (
      <option key={option} value={option}>{option}</option>
    )) || null;
  };

  // Stage navigation
  const handleNextStage = (e) => {
    e.preventDefault();
    if (isPersonalInfoStage) {
      if (validatePersonalInfo()) {
        setIsPersonalInfoStage(false);
      }
    } else {
      if (validateCommitteeSelection()) {
        // Handle form submission
        handleFormSubmit();
      }
    }
  };

  const handlePreviousStage = () => {
    setIsPersonalInfoStage(true);
  };

  // Form submission handler
  const [loading,setLoading]=useState(false)
  const handleFormSubmit =async () => {
    setLoading(true)
    try {
      // Combine all form data
      const completeFormData = {
        ...formInput,
        ...committeeSelections
      };

      // Submit registration data
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      if (!response.ok) {
        setLoading(false);
        if (response.status === 409) {
          toast.error('You have already registered with this email.');
        } else {
          toast.error(data.message || 'Registration failed. Please try again.');
        }
        throw new Error(data.message);
      }
      // Show success message and redirect
      setLoading(false)
      toast.success("Registration successfull")
      dispatch(closeDialog())
      dispatch(setUser({ ...user, formFilled: true }))
      router.push('/dashboard'); 

    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <Head>
        <title>MUN Registration Form</title>
      </Head>
      
      <div className={"flex justify-center p-6 flex-col items-center w-full md:w-[720px] mx-auto pb-4"}>
        {/* Progress Indicator */}
        <div className="place-items-center flex justify-center font-semibold text-center pb-8">
          <div 
            className={`text-3xl ${isPersonalInfoStage ? 'bg-[#1A1E21] text-white' : 'bg-white text-[#1A1E21]'} 
            w-10 h-10 border-2 border-[#1A1E21] rounded-full flex items-center justify-center`}
          >
            1
          </div>
          <div className="md:w-40 max-md:w-24 mx-2 border h-0 justify-center border-[#1A1E21] my-6">
            Personal Info
          </div>
          <div 
            className={`text-3xl ${!isPersonalInfoStage ? 'bg-[#1A1E21] text-white' : 'bg-white text-[#1A1E21]'} 
            w-10 h-10 border-2 border-[#1A1E21] rounded-full flex items-center justify-center`}
          >
            2
          </div>
          <div className="md:w-40 max-md:w-24 mx-2 border h-0 justify-center border-[#1A1E21] my-6">
            Portfolio Selection
          </div>
        </div>

        {/* Form Stages */}
        <form className='w-full px-6' onSubmit={handleNextStage}>
          {isPersonalInfoStage ? (
            <PersonalInfoStage 
              formInput={formInput}
              formErrors={formErrors}
              onInputChange={handlePersonalInfoChange}
            />
          ) : (
            <CommitteeSelectionStage 
              committeeSelections={committeeSelections}
              formErrors={formErrors}
              renderCommitteeOptions={renderCommitteeOptions}
              onCommitteeSelect={handleCommitteeSelection}
              onCountryPreferenceSelect={handleCountryPreferenceSelection}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {!isPersonalInfoStage && (
              <Button 
                disabled={loading}
                type="button"
                onClick={handlePreviousStage}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Back
              </Button>
            )}
            <button 
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              {isPersonalInfoStage ? 'Next' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;