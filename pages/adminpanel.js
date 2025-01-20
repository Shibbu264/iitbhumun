import React, { useState, useEffect } from 'react';
import committeeData from '../data/data.json';
import { toast } from 'react-hot-toast';

const AdminPanelPrisma = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [allAllocations, setAllAllocations] = useState({});
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    const loginStatus = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    if (loginStatus) {
      fetchRegistrations();
      fetchPayments();
    }
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const sortRegistrations = (regs) => {
    // Sort registrations: non-allotted first, allotted last
    return [...regs].sort((a, b) => {
      const aHasAllotment = a.alloted && a.alloted.length > 0;
      const bHasAllotment = b.alloted && b.alloted.length > 0;
      
      if (aHasAllotment && !bHasAllotment) return 1;  // a goes to end
      if (!aHasAllotment && bHasAllotment) return -1; // b goes to end
      return 0;
    });
  };

  // Fetch all allocations and organize them by committee
  const fetchAllAllocations = async () => {
    try {
      const response = await fetch('/api/getallocations');
      const allocatedCountries = await response.json();
      setAllAllocations(allocatedCountries);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    }
  };

  // Modify fetchRegistrations to also fetch allocations
  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/findregistration');
      if (!response.ok) {
        throw new Error('Failed to fetch register');
      }
      const data = await response.json();
      setRegistrations(sortRegistrations(data));
      await fetchAllAllocations(); // Fetch current allocations
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleLogin = () => {
    if (password === "SHIVANSHURISHABHMUN") {
      localStorage.setItem('adminLoggedIn', 'true'); // Store login state
      fetchRegistrations().then(() => setIsLoggedIn(true));
    } else {
      alert("Incorrect password");
    }
  };

  // Add logout functionality (optional)
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setPassword(""); // Clear the password state
  };

  const handleAllotCountry = async (registrationId, committee, country) => {
    try {
      if (country === "Select an option") {
        alert("Please select a valid country");
        return;
      }

      const response = await fetch('/api/allotment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          registrationId, 
          committee, 
          country,
          allotmentString: `${committee}:${country}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to allot country');
      }
      alert(`Country ${country} allotted under committee ${committee} successfully`);
      fetchRegistrations();
    } catch (error) {
      console.error('Error allotting country:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/fetchpayment');
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await response.json();
      setPayments(data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handlePaymentStatusUpdate = async (paymentId, status) => {
    try {
        const response = await fetch('/api/paymentapproval', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                paymentId: parseInt(paymentId),
                status 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update payment status');
        }

        // Update the payments state locally
        setPayments(prevPayments => 
            prevPayments.map(payment => 
                payment.id === paymentId 
                    ? { ...payment, status } 
                    : payment
            )
        );

        // Update the registrations state to reflect payment status
        setRegistrations(prevRegistrations => 
            prevRegistrations.map(reg => {
                const paymentForReg = payments.find(p => p.user.email === reg.emailId);
                if (paymentForReg && paymentForReg.id === paymentId) {
                    return {
                        ...reg,
                        paymentDone: status === 'verified'
                    };
                }
                return reg;
            })
        );

        toast.success(`Payment ${status} successfully`);
    } catch (error) {
        console.error('Error updating payment status:', error);
        toast.error(error.message || 'Failed to update payment status');
    }
  };

  const handleRejectRequest = async (registration) => {
    try {
        const updatedPreferences = {
            ...registration.countryPreferences
        };
        delete updatedPreferences.pendingRequest;

        const response = await fetch('/api/register', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...registration,
                countryPreferences: updatedPreferences
            }),
        });

        if (response.ok) {
            toast.success('Request rejected successfully');
            fetchRegistrations();
        } else {
            throw new Error('Failed to reject request');
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        toast.error('Failed to reject request');
    }
  };

  const getChangeRequests = () => {
    return registrations.filter(reg => reg.countryPreferences?.pendingRequest);
  };

  const isCountryAvailable = (committee, country, allAllocations, currentAllotment) => {
    if (!allAllocations[committee]) return true;
    // Country is available if it's not in allocations OR if it's the user's current allocation
    return !allAllocations[committee].includes(country) || 
           (currentAllotment && currentAllotment[0] === committee && currentAllotment[1] === country);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(registrations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCurrentItems = (items) => {
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const PaginationControls = () => (
    <div className="flex flex-col items-center gap-4 mt-4 mb-8">
      <div className="flex items-center gap-2">
        <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === idx + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className='mb-5 text-center font-bold'>ADMIN PANEL FOR MUN IIT BHU</h1>
        <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Enter password" 
          className="text-center font bold mx-auto my-3 block" 
        />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto rounded block" 
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className='text-center font-bold'>ADMIN PROXY ACTIVE FOR MUN IIT BHU</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="border rounded-lg overflow-hidden">
          <button
            className={`px-6 py-2 ${activeTab === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('all')}
          >
            All Registrations
            <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {registrations.length}
            </span>
          </button>
          <button
            className={`px-6 py-2 ${activeTab === 'changes' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('changes')}
          >
            Change Requests
            <span className="ml-2 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-xs">
              {getChangeRequests().length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'changes' && (
        <div className="mb-6">
          <h2 className="text-yellow-600 font-bold text-center my-4">Pending Change Requests</h2>
          {getChangeRequests().length === 0 ? (
            <p className="text-center text-gray-500">No pending change requests</p>
          ) : (
            getChangeRequests().map((registration, index) => {
              const currentAllotment = registration.alloted?.[0]?.split(':') || null;

              return (
                <div key={registration.id} className="mb-4 p-4 border rounded shadow bg-yellow-50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p><strong>Name:</strong> {registration.name}</p>
                      <p><strong>Email:</strong> {registration.emailId}</p>
                      <p><strong>Current Allocation:</strong> {registration.alloted[0] || 'None'}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded shadow">
                    <h4 className="font-bold mb-2">Requested Changes:</h4>
                    {registration.countryPreferences.pendingRequest.choices.map((choice, index) => (
                      <div key={index} className="mb-3 p-3 border rounded">
                        <p className="font-semibold text-blue-600">{choice.committee}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {choice.preferences.map((country, prefIndex) => {
                            const isAvailable = isCountryAvailable(
                              choice.committee, 
                              country, 
                              allAllocations,
                              currentAllotment
                            );

                            return (
                              <div key={prefIndex} className="relative">
                                <button
                                  onClick={() => {
                                    if (isAvailable) {
                                      handleAllotCountry(registration.id, choice.committee, country);
                                      handleRejectRequest(registration);
                                    }
                                  }}
                                  className={`px-4 py-2 rounded-full transition-colors ${
                                    isAvailable 
                                      ? 'bg-green-100 hover:bg-green-200 text-green-700' 
                                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                  disabled={!isAvailable}
                                >
                                  Allot {country}
                                </button>
                                {!isAvailable && (
                                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    Taken
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {choice.preferences.every(country => 
                          !isCountryAvailable(choice.committee, country, allAllocations, currentAllotment)
                        ) && (
                          <div className="mt-2 text-red-500 text-sm">
                            ⚠️ All requested countries for this committee are no longer available
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-3 border-t">
                      <button
                        onClick={() => handleRejectRequest(registration)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Reject Request
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="mb-6">
          <h2 className="text-red-500 font-bold text-center my-4">Registration Details</h2>
          <PaginationControls />
          {getCurrentItems(registrations).map((registration, index) => {
            const isAllotted = registration.alloted && registration.alloted.length > 0;
            const currentAllotment = isAllotted ? registration.alloted[0].split(':') : null;
            
            return (
              <div key={registration.id} 
                className={`mb-4 p-4 border rounded shadow ${
                  registration.paymentDone ? 'bg-green-50' : 
                  isAllotted ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="mr-4"><strong>{indexOfFirstItem + index + 1}.</strong></p>
                  {registration.paymentDone && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Payment Verified
                    </span>
                  )}
                </div>
                
                <div>
                  <p><strong>Email:</strong> {registration.emailId}</p>
                  <p><strong>Name:</strong> {registration.name || 'N/A'}</p>
                  <p><strong>Mobile Number:</strong> {registration.mobileNumber || 'N/A'}</p>
                  <p><strong>College name: </strong>{registration.instituteName || 'N/A'}</p>
                  <p><strong>Referral Code: </strong>{registration.referralCode || 'None'}</p>
                  <p><strong>Number of MUNs: </strong>{registration.numberOfMUNs || 'None'}</p>
                  <p><strong>Awards in Previous MUNs: </strong>{registration.awardsInPreviousMUNs || 'None'}</p>
                  <p>
                    <strong>Allotment Status: </strong>
                    {registration.allotmentApproved ? (
                      <span className="text-green-600 font-medium">Approved</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending Approval</span>
                    )}
                  </p>
                  
                  {/* Current Allotment Display */}
                  {isAllotted && (
                    <div className="mt-2 mb-2 p-2 bg-green-100 rounded">
                      <p><strong>Current Allotment:</strong></p>
                      <p className="text-green-600">
                        Committee: {currentAllotment[0]} - Country: {currentAllotment[1]}
                      </p>
                    </div>
                  )}

                  {/* Allotment Section */}
                  <div className="mt-4">
                    {registration.allotmentApproved ? (
                      <div className="p-3 bg-green-100 rounded-md">
                        <p className="text-green-700 font-medium">
                          Allotment approved and accepted by delegate
                        </p>
                        {currentAllotment && (
                          <p className="text-green-600">
                            Committee: {currentAllotment[0]} - Country: {currentAllotment[1]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="font-bold mb-2">
                          {isAllotted ? 'Edit Allotment:' : 'Allot Country:'}
                        </p>
                        {registration.committees.map((committee, idx) => {
                          const preferences = Array.isArray(registration.countryPreferences) ? 
                            registration.countryPreferences[idx] : [];
                          
                          const availablePreferences = preferences.filter(country => {
                            if (currentAllotment && 
                                currentAllotment[0] === committee && 
                                currentAllotment[1] === country) {
                              return true;
                            }
                            return !allAllocations[committee]?.includes(country);
                          });

                          // Get all available countries for this committee
                          const committeeKey = committee.toLowerCase().replace('-', '_');
                          const allCommitteeCountries = committeeData[committeeKey] || [];
                          const availableCountries = allCommitteeCountries.filter(country => 
                            country !== "Select an option" && 
                            !allAllocations[committee]?.includes(country)
                          );

                          return (
                            <div key={idx} className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {committee}:
                              </label>
                              <select 
                                value={currentAllotment && currentAllotment[0] === committee ? currentAllotment[1] : ""}
                                onChange={(e) => handleAllotCountry(registration.id, committee, e.target.value)}
                                className="block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="">Select Country to Allot</option>
                                
                                {/* User's Preferences */}
                                {availablePreferences.length > 0 && (
                                  <optgroup label={`${committee} - User's Preferences`}>
                                    {availablePreferences.map((country, countryIdx) => (
                                      <option key={`pref-${countryIdx}`} value={country}>
                                        {country}
                                      </option>
                                    ))}
                                  </optgroup>
                                )}
                                
                                {/* All Available Countries */}
                                {availableCountries && availableCountries.length > 0 && (
                                  <optgroup label={`${committee} - Available Countries`}>
                                    {availableCountries.map((country, countryIdx) => (
                                      <option key={`all-${countryIdx}`} value={country}>
                                        {country}
                                      </option>
                                    ))}
                                  </optgroup>
                                )}
                              </select>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  {/* Payment Information */}
                  {payments.filter(payment => payment.user.email === registration.emailId).map((payment, idx) => (
                    <div key={idx} className="mt-4 p-4 bg-gray-50 rounded border">
                      {/* Add a prominent status banner at the top */}
                      {payment.status === 'verified' && (
                          <div className="mb-4 p-3 bg-green-100 border border-green-500 rounded-md flex items-center">
                              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-green-700 font-medium">Payment Verified Successfully</span>
                          </div>
                      )}
                      {payment.status === 'rejected' && (
                          <div className="mb-4 p-3 bg-red-100 border border-red-500 rounded-md flex items-center">
                              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              <span className="text-red-700 font-medium">Payment Rejected</span>
                          </div>
                      )}

                      <h3 className="font-bold text-lg mb-3">Payment Information</h3>
                      
                      {/* Payment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Ticket Type:</strong> {payment.ticketType.split('_').join(' ').toUpperCase()}</p>
                          <p><strong>Amount:</strong> ₹{payment.amount}</p>
                          <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                          
                          {/* Payment Status Buttons with Loading State */}
                          {payment.status !== 'verified' && (
                              <div className="mt-4 space-x-2">
                                  <button
                                      onClick={() => handlePaymentStatusUpdate(payment.id, 'verified')}
                                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                                      disabled={payment.status === 'verified'}
                                  >
                                      Verify Payment
                                  </button>
                                  <button
                                      onClick={() => handlePaymentStatusUpdate(payment.id, 'rejected')}
                                      className={`px-4 py-2 rounded-md ${
                                          payment.status === 'rejected' 
                                              ? 'bg-gray-300 cursor-not-allowed' 
                                              : 'bg-red-500 hover:bg-red-600 text-white'
                                      }`}
                                      disabled={payment.status === 'rejected'}
                                  >
                                      Reject Payment
                                  </button>
                              </div>
                          )}
                        </div>

                        {/* Payment Screenshot */}
                        <div className="border rounded-lg p-3 bg-white">
                          <p className="font-semibold mb-2">Payment Screenshot:</p>
                          <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={payment.imageUrl} 
                              alt="Payment Proof"
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="mt-2 text-center">
                            <a 
                              href={payment.imageUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                            >
                              View Full Image
                            </a>
                          </div>
                        </div>

                        {/* ID Card Display - Add this section */}
                        {payment.idCardUrl && (
                          <div className="border rounded-lg p-3 bg-white mt-4">
                            <p className="font-semibold mb-2">Student ID Card:</p>
                            <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                src={payment.idCardUrl} 
                                alt="Student ID Card"
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="mt-2 text-center">
                              <a 
                                href={payment.idCardUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                              >
                                View Full ID Card
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {registration.countryPreferences?.pendingRequest && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                          <h4 className="font-bold mb-2">Allocation Change Request</h4>
                          {registration.countryPreferences.pendingRequest.choices.map((choice, index) => (
                              <div key={index} className="mb-3 p-3 bg-white rounded shadow">
                                  <p className="font-semibold">{choice.committee}</p>
                                  <div className="mt-2">
                                      {choice.preferences.map((country, prefIndex) => (
                                          <button
                                              key={prefIndex}
                                              onClick={() => handleAllotCountry(
                                                  registration.id,
                                                  choice.committee,
                                                  country
                                              )}
                                              className="mr-2 mb-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors"
                                          >
                                              Allot {country}
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          ))}
                          
                          <div className="mt-4 pt-3 border-t border-yellow-200">
                              <button
                                  onClick={() => handleRejectRequest(registration)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                              >
                                  Reject All Requests
                              </button>
                          </div>
                      </div>
                  )}
                </div>
              </div>
            );
          })}
          <PaginationControls />
        </div>
      )}
    </div>
  );
};

export default AdminPanelPrisma;