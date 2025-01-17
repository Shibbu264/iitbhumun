import React from 'react'

export default function PersonalInfoStage ({ formInput, formErrors, onInputChange }) {
    const personalInfoFields = [
      { id: 'Name', label: 'Name', type: 'text' },
      { id: 'Age', label: 'Age', type: 'number' },
      { id: 'Mobile_Number', label: 'Phone Number', type: 'tel' },
      { id: 'Email_ID', label: 'Email', type: 'email' },
      { id: 'Institute_Name', label: 'Institution', type: 'text' },
      { id: 'City', label: 'City', type: 'text' },
      { id: 'Country', label: 'Country', type: 'text' },
      { id: 'No_of_MUNs',label: 'Number of MUNs',type:'number' },
      { id: 'Awards_in_previous_MUNs',label: 'Awards in MUNs',type:'number' },
      { id: 'Referral_Code',label: 'Referral Code',type:'text' }
    ];
  
    return (
      <div className='w-full flex-col items-center justify-center'>
        {personalInfoFields.map(field => (
          <div key={field.id} className="mb-4 w-full">
            <label htmlFor={field.id} className="block text-black font-bold mb-2">
              {field.id === 'Referral_Code' ? field.label : `${field.label}*`}
            </label>
            <input 
              onChange={onInputChange}
              type={field.type}
              id={field.id}
              value={formInput[field.id]}
              disabled={field.id=='Email_ID'}
              className="w-full text-blue-gray-900 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required={field.id !== 'Referral_Code'}
            />
            {formErrors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{formErrors[field.id]}</p>
            )}
          </div>
        ))}
        
        {/* Gender Dropdown */}
        <div className="mb-4">
          <label htmlFor="Gender" className="block text-black font-bold mb-2">
            Gender*
          </label>
          <select 
            id="Gender"
            value={formInput.Gender}
            onChange={onInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    );
  };
