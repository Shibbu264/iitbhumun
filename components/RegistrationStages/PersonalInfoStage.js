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
      { id: 'Number of MUNs',label: 'Number of MUNs', key: 'numberOfMUNs',type:'number' },
      { id: 'Awards in MUNs',label: 'Awards in MUNs', key: 'awardsInPreviousMUNs',type:'number' }
    ];
  
    return (
      <div className='w-full flex-col items-center justify-center'>
        {personalInfoFields.map(field => (
          <div key={field.id} className="mb-4 w-full">
            <label htmlFor={field.id} className="block text-black font-bold mb-2">
              {field.label}*
            </label>
            <input 
            onChange={onInputChange}
              type={field.type}
              id={field.id}
              value={formInput[field.id]}
              disabled={field.id=='Email_ID'}
              className="w-full text-blue-gray-900 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required 
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
