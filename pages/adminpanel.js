// AdminPanel.js
// AdminPanel.js
// AdminPanel.js
// AdminPanel.js
// AdminPanel.js
// AdminPanel.js
import React, { Component, useEffect, useState,} from 'react';
import app from "../public/firebaseconfig";

import { getDatabase, ref, get, set, onValue, update, } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { text } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';
import Script from 'next/script';

const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn1, setIsLoggedInn] = useState(false);

  const [DATA, setDATA] = useState({});
  const [submitValues, setSubmitValues] = useState({});
  const [submitValues1, setSubmitValues1] = useState("");
  const [inputValues, setInputValues] = useState({});
const[delegate,setdelegate]=useState("Outstation");
const [inputData,setinputadta]=useState("");


// Create a query to find the relevant data entry based on the user's email


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  async function fetchData() {
    try {
      const response = await fetch('https://mun-2023-default-rtdb.firebaseio.com/preferences.json');
      const data = await response.json();
      
      setDATA(data)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
//   useEffect(() => {
//  fetchPreferencesData()
//   }, [isLoggedIn]);
  const handleLogin = () => {
    if (password === "SHIVANSHUMUN") {
      setIsLoggedInn(true);
      async function fetchData1() {
        try {
          await fetchData(); // Wait for the first command to complete
          setIsLoggedIn(true); // Execute the second command after the first one is finished
          // Any other code that depends on the completion of both commands
        } catch (error) {
          // Handle errors if necessary
        }
      }
      
      
        
      
      // Functional component
     
        fetchData1();
    
    } else {
      alert("Incorrect password");
    }
  };
  

  const handleOptionChange = (event, itemId) => {
    const { value } = event.target;
    setSubmitValues((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));
  };
  const handleOptionChange1 = (event, itemId) => {
    const { value } = event.target;
    setSubmitValues1((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));
  };
  
  const handleinputChange = (event) => {
    const  value  = event.target.value;
    setInputValues(
       value
    )
  };
  const handleInput = (itemId) => {
    console.log("Inside handleInput");
    if(submitValues1!=""){
      handleSubmit1(itemId)}
    const database = getDatabase();
    const itemRef = ref(database, `preferences/${itemId}`);
    update(itemRef, { alloted: inputValues })
      .then(() => {
        setTimeout(() => {
          alert("Allotted successfully");
        }, 300);
      })
      .catch((error) => {
        console.log("Error updating value:", error);
      });
  };
  

let i=0;

const handleSubmit1 = (itemId) => {
  console.log("Inside handleSubmit");
  const database = getDatabase();
  const itemRef = ref(database, `preferences/${itemId}`);
  update(itemRef, {  
  Delegate_type:submitValues1[itemId],
  })
    .then(() => {
     
    })
    .catch((error) => {
      alert("Error updating value:", error);
    });
};
  const handleSubmit = (itemId) => {
    if(submitValues1!=""){
    handleSubmit1(itemId)}
    
    const database = getDatabase();
    const itemRef = ref(database, `preferences/${itemId}`);
    update(itemRef, { alloted: submitValues[itemId] ,
    
    })
      .then(() => {
        setTimeout(() => {
          alert("Allotted successfully");
        }, 300);
      })
      .catch((error) => {
        alert("Error updating value:", error);
      });
  };
 
  
  const filteredData = Object.keys(DATA).reduce((filtered, itemId) => {
    const item = DATA[itemId];
    if (item.alloted === "NO") {
      filtered.push({ itemId, ...item });
    }
    return filtered;
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className='mb-5 text-center font-bold'>ADMIN PANEL MUN IIT BHU</h1>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" className="text-center font bold mx-auto my-3 block" />
        {isLoggedIn1?<button className="buttonload mx-auto block">
  <i class="fa fa-circle-o-notch fa-spin mx-2"></i>Loading...
</button>:<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto rounded block" onClick={handleLogin}>
          Login
        </button>}
      </div>
    );
  } else {
    return (
      <div className='m-0'>
        <div className='fixed mb-24 top-0  left-0 right-0 bg-blue-gray-500'>
        <div className='flex justify-center gap-2 '>
        <Image
          src="/images/active-nav-log.svg"
          width={50}
          height={50}
          alt="active-nav-logo"
        />
        <h1 className='mb-5 text-center text-xl font-bold'>ADMIN PANEL MUN IIT BHU</h1></div>
     
        <h2 className="text-red-500 font-bold text-center my-4">Allotment of preferences for delegates</h2>
        <Link href={'/adminpanel2642023'}><Button>Go to Payment SS verification</Button></Link>
       
        
        <input type='text' id='Institute' className="ml-14 px-2 border-rounded border-black" placeholder='Copy-Paste Helper' ></input>
       
        <img onClick={async () => {
      try {
        await navigator.clipboard.writeText(document.getElementById("Institute").value);
        document.getElementById("Institute").value=""
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }} src='/images/copy.png' className='ml-3 hover:border-2 hover:border-red-500 hover:p-1 inline w-8 h-8 cursor-pointer'></img>
         <div id="autocomplete-list" className="autocomplete-items "></div>  </div>
         <div className='mt-48'></div>
        {filteredData.map(({ itemId, ...item }) => (
          
          <div className="my-6   px-2 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] border-red-50"key={itemId}>
            <select className="bg-gray-50 border  border-blue-500 text-gray-900 font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => handleOptionChange(event, itemId)}>
              {Object.keys(item).map((key) => {
                if (key=="email" ) {
                  return (
<><option className="font-bold" key={key} value={item[key]}>
                      {item[key]}
                    </option>
                    <option className="font-bold" key="MUNcount" value={item["MUNcount"]}>
                      {item["MUNcount"]}
                    </option>
                    <option className="font-bold" key={"PastAwards"} value={item["PastAwards"]}>
                    {item["PastAwards"]}
                  </option>
                  <option className="font-bold" key={"option6"} value={item["option6"]}>
                  {item["option6"]}
                </option>
                <option className="font-bold" key={"option7"} value={item["option7"]}>
                {item["option7"]}
              </option>
              <option className="font-bold" key={"option8"} value={item["option8"]}>
              {item["option8"]}
            </option>
            <option className="font-bold" key={"option9"} value={item["option9"]}>
            {item["option9"]}
          </option>
          <option className="font-bold" key={"option1"} value={item["option1"]}>
          {item["option1"]}
        </option>
        <option className="font-bold" key={"option2"} value={item["option2"]}>
        {item["option2"]}
      </option>
      <option className="font-bold" key={"option3"} value={item["option3"]}>
      {item["option3"]}
    </option>
    <option className="font-bold" key={"option4"} value={item["option4"]}>
    {item["option4"]}
  </option>
  <option className="font-bold" key={"option5"} value={item["option5"]}>
  {item["option5"]}
</option>
</>
                  );
                }
                
               
              })}
            </select>
            <button className="bg-transparent ml-4 mx-auto 'block' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleSubmit(itemId)}>Allot!</button>
          <div >
           <input type="text" placeholder='Input the different choice you want to give!' className='  p-5 text-xl block  ml-0 w-96 text-center border rounded-md border-black' onChange={(event) => handleinputChange(event, itemId)} ></input>
           
            <button className="bg-transparent ml-4 mx-auto block hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleInput(itemId)}>Allot!</button>
            
         </div>
         
         {Object.keys(item).map((key) => {if (key==="Institute_ID"&&item["Institute_ID"]!=""&&item["Institute_ID"]!="null"){return (<a target='_blank'rel='noreferrer' key={key} href={item['Institute_ID']} >
          <button key={key} className="bg-transparent ml-4 mx-auto  'block' hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-4 border border-blue-500 hover:border-transparent rounded" >View ID</button></a>)}})}
          <label className='block font-sans my-2' >Payment QR code type to assign</label>
         <select className="bg-gray-50 border  border-blue-500 text-gray-900 font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={(event) => handleOptionChange1(event, itemId) }>
              {Object.keys(item).map((key) => {
                if (key=="Delegate_type") {
                  return (
<>

                    <option className="font-bold" key={key} value={item[key]}>
                      {item[key]}
                    </option>
                    <option className="font-bold"  value="IIT BHU">
                     IIT BHU
                    </option>
                    <option className="font-bold"  value="BHU">
                     BHU
                    </option>
                    </>
                    
                    
                  );
                }
                
               
              })}
            </select>
            

          </div>

  

        ))
        
        
        }
        <Script src="foradmin.js" typeof='module' type='module' />
      </div>
    );
  }
};

export default AdminPanel;

