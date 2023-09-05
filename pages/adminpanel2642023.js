import React, { Component, useEffect, useState,} from 'react';
import app from "../public/firebaseconfig";

import { getDatabase, ref, get, set, onValue, update, } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { text } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const AdminPanel2 = () => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn1, setIsLoggedInn] = useState(false);
const[enlarge,setenlarge]=useState(true)
  const [DATA, setDATA] = useState({});
  const [submitValues, setSubmitValues] = useState({});
  const [submitValues1, setSubmitValues1] = useState({});
  const [inputValues, setInputValues] = useState({});
const[delegate,setdelegate]=useState("Outstation");
const [inputData,setinputadta]=useState("");


// Create a query to find the relevant data entry based on the user's email


  
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
//   },
  

  
  
  

let i=0;


  const handleSubmit = (itemId) => {
    
    console.log("Inside handleSubmit");
    const database = getDatabase();
    const itemRef = ref(database, `preferences/${itemId}`);
    update(itemRef, { Payment_done:"YES" ,
    
    })
      .then(() => {
        
          alert("Payment verified successfully");
       console.log(itemRef.Referralcode)
      })
      .catch((error) => {
        console.log("Error updating value:", error);
      });
  };
  

  const filteredData = Object.keys(DATA).reduce((filtered, itemId) => {
    const item = DATA[itemId];
    if (item.Payment_done === "NO") {
      filtered.push({ itemId, ...item });
    }
    return filtered;
  }, []);

 
    return (
      <div>
        <Button className=" ml-4 my-4 block mx-auto"onClick={()=>{
          console.log("done")
          fetchData()}}>Load Data!</Button>
        <div className='flex justify-center gap-2'>
        <Image
          src="/images/active-nav-log.svg"
          width={50}
          height={50}
          alt="active-nav-logo"
        />
        <h1 className='mb-5 text-center text-xl font-bold'>ADMIN PANEL MUN IIT BHU</h1></div>
        <h2 className="text-red-500 font-bold text-center my-4">Allotment of preferences for delegates</h2>
        {filteredData.map(({ itemId, ...item }) => (
          
          <div className="my-6   px-2 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] border-red-50"key={itemId}>
           
              {Object.keys(item).map((key) => {
                if (key=="PaymentSS"&&item["PaymentSS"]!="") {
                  return (
                    <>
<h1 className='mx-auto text-center font-bold text-2xl'>{item["email"]}</h1>
<a href={item["PaymentSS"]} target='_blank' rel='noreferrer'><img className={'w-52 h-52   '} src={item["PaymentSS"]}/></a>
<div className='flext justify-center'>
<Button onClick={function(){handleSubmit(itemId)}} className='my-2'>Approve Payment!</Button>
<a href={item["PaymentSS"]} target='_blank' rel='noreferrer'><Button  className=' ml-6 my-2'>View Screenshot</Button></a>
</div>
</>   )}})}  </div>
                  
                
                
              
          
          
        ))}
        </div>)
        
        
      
    
                  }

                  
export default AdminPanel2;

