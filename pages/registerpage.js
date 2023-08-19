import Head from 'next/head';
import Script from 'next/script'
import Link from 'next/link';
import data from '../data/data.json';
import { Alert, Button } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import GoogleButton from 'react-google-button'
import Doubtbox from '../components/doubtbox';
const HomePage = () => {
  
var ab=false;
const aippm = data.aippm;
const unccc = data.unfccc;
const g20 = data.g20;
const uncsw = data.uncsw;
const unhrc = data.unhrc;
const jpc = data.jpc;



const id = Math.floor(100000 + Math.random() * 900000);

const[abcd,setbool]=useState(true);
  var [error, setError] = useState(true);
  const [error1, setError1] = useState(true);
  const [check, setCheck] = useState(false);
  const [member, setMember] = useState(false);
  const [solo, setSolo] = useState(true);
const[buttondisplay,setdisplay]=useState(false)
  const useEmailValidation = (email) => {
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    return isEmailValid;
  };
  
  const [formInput, setFormInput] = useState({
    Event_ID: id,
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
    Committee_Preference_1: '',
    Committee_Preference_2: '',
    Committee_Preference_3: '',
    Committee_1_Country_Preference_1: '',
    Committee_1_Country_Preference_2: '',
    Committee_1_Country_Preference_3: '',
    Committee_2_Country_Preference_1: '',
    Committee_2_Country_Preference_2: '',
    Committee_2_Country_Preference_3: '',
    Committee_3_Country_Preference_1: '',
    Committee_3_Country_Preference_2: '',
    Committee_3_Country_Preference_3: '',
  });
  const [formInput2, setFormInput2] = useState({
    Event_ID: id,
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
    Committee_Preference_1: '',
    Committee_Preference_2: '',
    Committee_Preference_3: '',
    Committee_1_Country_Preference_1: '',
    Committee_1_Country_Preference_2: '',
    Committee_1_Country_Preference_3: '',
    Committee_2_Country_Preference_1: '',
    Committee_2_Country_Preference_2: '',
    Committee_2_Country_Preference_3: '',
    Committee_3_Country_Preference_1: '',
    Committee_3_Country_Preference_2: '',
    Committee_3_Country_Preference_3: '',
  });

  const isEmailValid1 = useEmailValidation(formInput.Email_ID);
  const isEmailValid2 = useEmailValidation(formInput2.Email_ID);
  // const isPhoneValid1 = usePhoneValidation(formInput.Mobile_Number);
  // const isPhoneValid2 = usePhoneValidation(formInput2.Mobile_Number);

  


  const handleCheck = (e) => {




    if (error == false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  useEffect(() => {
    if (member == true) {
      if (
        formInput2.Name === '' ||
        formInput2.Age === '0' ||
        formInput2.Gender === '' ||
        formInput2.City === '' ||
        formInput2.Country === '' ||
        formInput2.Institute_Name === '' ||
        formInput2.Mobile_Number === '' ||
        formInput2.Email_ID === '' ||
        formInput2.No_of_MUNs === '' ||
        formInput.Name === '' ||
        formInput.Age === '0' ||
        formInput.Gender === '' ||
        formInput.City === '' ||
        formInput.Country === '' ||
        formInput.Institute_Name === '' ||
        formInput.Mobile_Number === '' ||
        formInput.Email_ID === '' ||
        formInput.No_of_MUNs === '' ||
        isEmailValid1 == false ||
        isEmailValid2 == false
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [formInput, formInput2, member]);
  useEffect(() => {
    if (member == false) {
      if (
        formInput.Name === '' ||
        formInput.Age === '0' ||
        formInput.Gender === '' ||
        formInput.City === '' ||
        formInput.Country === '' ||
        formInput.Institute_Name === '' ||
        formInput.Mobile_Number === '' ||
        formInput.Email_ID === '' ||
        formInput.No_of_MUNs === '' ||
        isEmailValid1 == false
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [formInput, member]);
  useEffect(() => {
    if (
      formInput.Committee_Preference_1 === '' ||
      formInput.Committee_Preference_2 === '' ||
      formInput.Committee_Preference_3 === '' ||
      formInput.Committee_1_Country_Preference_1 === '' ||
      formInput.Committee_1_Country_Preference_2 === '' ||
      formInput.Committee_1_Country_Preference_3 === '' ||
      formInput.Committee_2_Country_Preference_1 === '' ||
      formInput.Committee_2_Country_Preference_2 === '' ||
      formInput.Committee_2_Country_Preference_3 === '' ||
      formInput.Committee_3_Country_Preference_1 === '' ||
      formInput.Committee_3_Country_Preference_2 === '' ||
      formInput.Committee_3_Country_Preference_3 === ''
    ) {
      setError1(true);
    } else {
      setError1(false);
    }
  }, [formInput]);

  const committees = [];
  const[boolcheck,setbool1]=useState(true)
  data.registerCommittees.map((i) => {
    
if(i=='AIPPM'&&boolcheck==false){}
else{committees.push(i);}
  });
  

  const [selected1, setSelected1] = useState('None');

  const handleChange1 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_1: e.target.value,
    });
    setSelected1(e.target.value);
  };

  let type1 = null;
  let options1 = null;

  if (selected1 === 'AIPPM') {
    type1 = aippm;
  } else if (selected1 === 'G-20') {
    type1 = g20;
  } else if (selected1 === 'UNFCCC') {
    type1 = unccc;
  } else if (selected1 === 'UNCSW') {
    type1 = uncsw;
  } else if (selected1 === 'UNHRC') {
    type1 = unhrc;
  } else if (selected1 === 'DISEC') {
    type1 = disec;
  } else if (selected1 === 'JPC') {
    type1 = jpc;
  }

  if (type1) {
    options1 = type1.map((el) => <option key={el}>{el}</option>);
  }

  const [selected2, setSelected2] = useState('none');
  const [selected3, setSelected3] = useState('none');
  const [pref1option1, setSelected4] = useState('');
  const [pref1option2, setSelected5] = useState('');
  const [pref1option3, setSelected6] = useState('');
  const [pref2option1, setSelected7] = useState('');
  const [pref2option2, setSelected8] = useState('');
  const [pref2option3, setSelected9] = useState('');
  const [pref3option1, setSelected10] = useState('');
  const [pref3option2, setSelected11] = useState('');
  const [pref3option3, setSelected12] = useState('');

  const handleChange2 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_2: e.target.value,
    });
    setSelected2(e.target.value);
  };

  let type2 = null;
  let options2 = null;

  if (selected2 === 'AIPPM') {
    type2 = aippm;
  } else if (selected2 === 'G-20') {
    type2 = g20;
  } else if (selected2 === 'UNFCCC') {
    type2 = unccc;
  } else if (selected2 === 'UNCSW') {
    type2 = uncsw;
  } else if (selected2 === 'UNHRC') {
    type2 = unhrc;
  } else if (selected2 === 'DISEC') {
    type2 = disec;
  } else if (selected2 === 'JPC') {
    type2 = jpc;
  }

  if (type2) {
    options2 = type2.map((el) => <option key={el}>{el}</option>);
  }

  

  const handleChange3 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_3: e.target.value,
    });
    setSelected3(e.target.value);
  };

  let type3 = null;
  let options3 = null;

  if (selected3 === 'AIPPM') {
    type3 = aippm;
  } else if (selected3 === 'G-20') {
    type3 = g20;
  } else if (selected3 === 'UNFCCC') {
    type3 = unccc;
  } else if (selected3 === 'UNCSW') {
    type3 = uncsw;
  } else if (selected3 === 'UNHRC') {
    type3 = unhrc;
  } else if (selected3 === 'DISEC') {
    type3 = disec;
  } else if (selected3 === 'JPC') {
    type3 = jpc;
  }
  if (type3) {
    options3 = type3.map((el) => <option key={el}>{el}</option>);
  }

  return (
    <div id='qt'>
      <Head>
      
        
        <title>MUN Registration Form</title>
      </Head>
      <Script src="/registermyversion.js"/>
        <Script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js" />
    <Script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js" />
      <style global></style>
      <div className={check?'hidden':'block'}>
    <div className="container mx-auto my-auto mb-auto  px-4 py-8" >
    <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[4.5rem] pt-8">
        Delegate Application Form
          </p>
          
          <div className="place-items-center flex justify-center font-semibold text-center py-16">
            <div
              
              className="text-3xl text-[#FFFFFF] justify-center bg-[#1A1E21] w-10 h-10   border-2 border-[#1A1E21] rounded-full "
            >
              1
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6">Personal Info</div>
            <div
             onClick={handleCheck}
              className={`text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full cursor-pointer ${ab?`text-[#FFFFFF] bg-[#1A1E21]`:``}`}
            >
              2
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6">Portfolio Selection</div>
            <div className="  text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full cursor-pointer ">
              3
            </div>
          </div>
      <form id="registrationForm"  className=" bg-white rounded-lg shadow-md p-6">
        
        <button type="button" onClick={()=>{setbool1(!boolcheck)}} class="py-2.5 px-5 mx-auto block  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full  border-black border-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{boolcheck?"Register as Double Delegate":"Register as Single Delegate"}</button>
    { boolcheck? <h1 value="nothing" id='valuecheck' className='text-center font-semibold sm:xl text-2xl mt-2 mb-2'><span className='text-red-500'>Note: </span>Campus Ambassadors also need to fill up this form.</h1>:<h1 value="something" id='valuecheck1' className='text-center text-2xl my-3 font-bold'>Double Delegate Registration</h1>}
       
    <div id='google'className="m-auto"> <GoogleButton className="m-auto" id='google'
  onClick={() => { }}
/>
</div>
<h1 className="text-2xl m-auto 'block' justify-center text-center my-3" id='or' >OR</h1>
{boolcheck?<div></div>:<h1 className='text-xl text-center my-4 font-bold'>Delegate-1 Details</h1>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-[#189BA5] font-bold mb-2">Name:<span className='text-red-500'>*</span></label>
          <input type="text" id="name_field" placeholder="Enter your name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="age" required className="block text-[#189BA5] font-bold mb-2">Age:<span className='text-red-500'>*</span></label>
          <input type="number" id="age" placeholder="Age" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-[#189BA5] font-bold mb-2">Gender<span className='text-red-500'>*</span></label>
          <select id="gender" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
            
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Insitute" required className="block text-[#189BA5] font-bold mb-2">Name of Institution:<span className='text-red-500'>*</span></label>
          <input type="text" placeholder="College or University" id="Institute" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          <div id="autocomplete-list" class="autocomplete-items"></div>
        </div>
        <div className="mb-4">
          <label htmlFor="Insitute" required className="block text-[#189BA5] font-bold mb-2">Institute ID card if from BHU or IIT BHU:<span className='text-red-500'></span></label>
          <input type="file" placeholder="College or University" id="photoInput" required className="w-full px-4 py-2 border rounded-lg focus:outline-none text-[#189BA5] focus:ring-blue-500 focus:border-blue-500"/>
          <label className='text-red-500 font-medium'>Kindly Upload For Availing Student Benefit</label>
        </div>
        <div className="mb-4">
          <label htmlFor="region" required className="block text-[#189BA5] font-bold mb-2">Region:<span className='text-red-500'>*</span></label>
          <input type="text" placeholder="City or state" id="region" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="number" required className="block text-[#189BA5] font-bold mb-2" >Phone number:<span className='text-red-500'>*</span></label>
          <input type="tel" placeholder="+919279279289" id='number' required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" required className="block text-[#189BA5] font-bold mb-2">Email:<span className='text-red-500'>*</span><span className='mx-2 text-red-500'> (Use the same email if signed up with google) </span></label>
          <input type="email" placeholder="Use same email if signed up with google" id="email_field" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="Password" required className="block text-[#189BA5] font-bold mb-2">Password:<span className='text-red-500'>*</span></label>
          <input type="password" placeholder="Use a strong password" id="password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="MUNcount" className="block text-[#189BA5] font-bold mb-2">Number of MUNS participated earlier:<span className='text-red-500'>*</span></label>
          <input type="number" id="muncount" placeholder="" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="pastaward" className="block text-[#189BA5] font-bold mb-2">MUN Awards won in past:</label>
          <input type="text" placeholder="Leave if none" id="pastaward"  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="refferalcode"  className="block text-[#189BA5] font-bold mb-2">Referral code:</label>
          <input type="text"   placeholder="Optional" id="refferalcode"   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        {<div className={boolcheck?'hidden':''}><h1 className='text-xl text-center my-4 font-bold'>Delegate-2 Details</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-[#189BA5] font-bold mb-2">Name:<span className='text-red-500'>*</span></label>
          <input type="text" id="name_field2" placeholder="Enter your name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="age" required className="block text-[#189BA5] font-bold mb-2">Age:<span className='text-red-500'>*</span></label>
          <input type="number" id="age2" placeholder="Age" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-[#189BA5] font-bold mb-2">Gender<span className='text-red-500'>*</span></label>
          <select id="gender2" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
            
          </select>
        </div>
       
        <div className="mb-4">
          <label htmlFor="Insitute" required className="block text-[#189BA5] font-bold mb-2">Name of Institution:<span className='text-red-500'>*</span></label>
          <input type="text" placeholder="College or University" id="Institute2" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          <div id="autocomplete-list2" class="autocomplete-items"></div>
        </div>
        <div className="mb-4">
          <label htmlFor="Insitute" required className="block text-[#189BA5] font-bold mb-2">Institute ID card if from BHU or IIT BHU:<span className='text-red-500'></span></label>
          <input type="file" placeholder="College or University" id="photoInput2" required className="w-full px-4 py-2 border rounded-lg focus:outline-none text-[#189BA5] focus:ring-blue-500 focus:border-blue-500"/>
          <label className='text-red-500 font-medium'>Kindly Upload For Availing Student Benefit</label>
        </div>
        <div className="mb-4">
          <label htmlFor="region" required className="block text-[#189BA5] font-bold mb-2">Region:<span className='text-red-500'>*</span></label>
          <input type="text" placeholder="City or state" id="region2" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="number" required className="block text-[#189BA5] font-bold mb-2" >Phone number:<span className='text-red-500'>*</span></label>
          <input type="tel" placeholder="+919279279289" id='number2' required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" required className="block text-[#189BA5] font-bold mb-2">Email:<span className='text-red-500'>*</span></label>
          <input type="email" placeholder="Use same email if signed up with google" id="email_field2" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
       
        <div className="mb-4">
          <label htmlFor="MUNcount" className="block text-[#189BA5] font-bold mb-2">Number of MUNS participated earlier:<span className='text-red-500'>*</span></label>
          <input type="number" id="muncount2" placeholder="" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="pastaward" className="block text-[#189BA5] font-bold mb-2">MUN Awards won in past:</label>
          <input type="text" placeholder="Leave if none" id="pastaward2"  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-4">
          <label htmlFor="refferalcode"  className="block text-[#189BA5] font-bold mb-2">Referral code:</label>
          <input type="text"   placeholder="Optional" id="refferalcode2"   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div></div>}
        
        
        <div className="registeroptions2">
        <button  type="button" onClick={handleCheck}  className="w-full bg-green-500 text-white weight-bold py-2 px-1 font-bold rounded-lg hover:bg-blue-600" >
      Select portfolio in next page</button>
      <Link href="/home">
                      <button              
          className="w-full bg-red-500 text-white py-2 px-2 rounded-lg font-bold hover:bg-blue-600">
                        Cancel
                      </button>
                    </Link>
                    </div>
      </form>
    </div></div>
    
                    
                   
                  
                
  
                  {error=false}
                 
        <div className={check ? 'block' : 'hidden' }>
          <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[4.5rem] pt-8 my-5 ">
            Delegate Application Form
          </p>

          <div className="place-items-center flex justify-center font-semibold text-center  pt-12 mb-12 mt-60px ">
            <div
              onClick={() => {
                setCheck(false);
              }}
              className="text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  "
            >
              1
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div
              onClick={() => {
                setCheck(true);
              }}
              className="text-3xl text-[#FFFFFF] justify-center bg-[#1A1E21] w-10 h-10   border-2 border-[#1A1E21] rounded-full "
            >
              2
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div className="  text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  ">
              3
            </div>
          </div>
          <form id='form2'> 
          <div className="flex flex-col sm:grid sm:grid-flow-col sm:grid-cols-3 items-center py-12 m-auto justify-items-center">
            <div>
              
              <p className=" text-center font-bold text-3xl mb-5">
                PORTFOLIO I
              </p>

              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>
                <select id='Committee1'
                  name="Committee1" 
                  value={selected1}
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange1(e);
                    
                   
                  }} 
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select id='pref1option1'
                    name="Option 1" value={pref1option1}
                    className="w-72 p-2 rounded-lg"   
                    on onChange={(e)=>{setSelected4(e.target.value)}}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select value={pref1option2}
                    name="Option 2" id='pref1option2'
                    className="w-72 p-2 rounded-lg" 
                    onChange={(e)=>{setSelected5(e.target.value)}}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select  value={pref1option3} onChange={(e)=>{setSelected6(e.target.value)}}
                    name="Option 3" id='pref1option3'
                    className="w-72 p-2 rounded-lg"
                  
                  >
                    {options1}
                  </select>
                </div>
              </div>
              
            </div>
           
            <div>
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO II
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select value={selected2} id='Committee2'
                  name="Committee1"
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange2(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select value={pref2option1} id='pref2option1'onChange={(e)=>{setSelected7(e.target.value)}}
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                   
                  >
                    {options2}
                  </select>
                </div>
              </div>{' '}
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select value={pref2option2}
                    name="Option 2" id='pref2option2'
                    className="w-72 p-2 rounded-lg"
                    onChange={(e)=>{setSelected8(e.target.value)}}
                  >
                    {options2}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select value={pref2option3}
                    name="Option 3" id='pref2option3'
                    className="w-72 p-2 rounded-lg"
                    onChange={(e)=>{setSelected9(e.target.value)}}
                  >
                    {options2}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO III
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select
                  name="Committee1" id='Committee3'
                  value={selected3}
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange3(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option1} id='pref3option1'
                    onChange={(e)=>{setSelected10(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select
                    name="Option 2"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option2} id='pref3option2'
                    onChange={(e)=>{setSelected11(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select
                    name="Option 3"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option3} id='pref3option3'
                    onChange={(e)=>{setSelected12(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
            </div>
          </div>
         
          
          {error1 && (
            <Alert
              className=" m-auto justify-around w-max"
              color="red"
              variant="outlined"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 m-auto justify-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              Note: You can also update your portfolio after registration.
            </Alert>
          )}
          <h1 className='registeras'>Register as:</h1>
              <div className="registeroptions">
       
 <button id="register2" type="submit" onClick={handleCheck}  className={`${boolcheck?'sm:ml-52 sm:mr-52 ':'block mx-auto'}sm:w-full w-48 mx-auto block cursor-pointer bg-green-500 text-white py-2 sm:px-2 px-4 m-auto rounded-lg hover:bg-blue-600`} data-tooltip="As determined by the committee, representing a specific nation or individual and participating as a single delegate means speaking, discussing and debating on the committee's agenda. Delegating has many advantages, including the chance to engage with others with extensive expertise and improve one's speaking and communication abilities. A certificate recognised by the UN and a delegate kit given by us are just two of its benefits. Additionally, with an additional fee, housing and meals will be covered. Above all, it is an honour in and of itself to participate in one of India's largest MUNs.">{boolcheck?"Single Delegate":"Double Delegate"} </button>
     {boolcheck? <button id="register3" type="submit"   className={`sm:w-full w-48 sm:ml-52 sm:mr-52 mx-auto  bg-green-500 text-white weight-bold py-2 sm:px-2 px-4 font-bold rounded-lg hover:bg-blue-600`} data-tooltip="Through the Campus Ambassador programme, candidates can demonstrate their leadership skills while helping to bring delegates from all across the nation together. They can also represent IITBHU MUN in their local communities. Getting a certificate recognised by the UN for bringing eight or more delegates is just one of its advantages. The delegates will also receive a subsequent reduction in the delegate price depending on how many delegates they bring. The person who brings the most delegates will receive a memento and be featured on the official IITHBHU MUN Instagram page if they bring more than 25 delegates." >Campus ambassador</button>:''}
     </div>
     </form>  <div className="flex justify-center m-auto mt-3">
            <button
              onClick={() => {
                setCheck(false);
                setCheck(false);
              }}
              className="bg-transparent mb-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded"
            >
              Back
            </button>
            
          </div>
            </div>
       
    

  

    


    

    
<Script src="registermyversion.js" typeof='module' type='module'/>
<Script src="https://smtpjs.com/v3/smtp.js"/>


    </div>
  );
};

export default HomePage;