import React, { Component, useEffect, useRef, useState,} from 'react';
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
const [filterValue, setFilterValue] = useState('Search the name');

// Create a query to find the relevant data entry based on the user's email

const divRefs = useRef([]);
useEffect(() => {
  if (divRefs.current.length > 0) {
    const firstMatchingDiv = divRefs.current.find((el) => el.classList.contains('highlighted'));
    if (firstMatchingDiv) {
      firstMatchingDiv.scrollIntoView({ behavior: 'auto' });
    }
  }
}, [filterValue]);


  
  async function fetchData() {
    try {
      const response = await fetch('https://mun-2023-default-rtdb.firebaseio.com/preferences.json');
      const data = await response.json();
      
      setDATA(data)
      console.log("data capture done")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  

  
  
  

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
  
      filtered.push({ itemId, ...item });
    
    return filtered;
  }, []);
console.log(filteredData)
 let count=1;
    return (
      <div>
        <div className='fixed bg-green-400  mb-24 top-0  left-0 right-0 m-auto'>
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
        <input className='font-bold border-red-400 ml-4 border-x-4 border-y-4 p-3 my-3'
type="text"
placeholder="Type to filter..."
value={filterValue}
onChange={(event) => setFilterValue(event.target.value)}
/></div>
<div className='mt-72'></div>
        {filteredData.map(({ itemId, ...item },index) => (
        <> 
          <div ref={(el) => (divRefs.current[index] = el)} className={`my-6 px-2 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] border-red-50 ${item.name.includes(filterValue) ? 'highlighted' : ''}`}key={itemId}>
           
              {Object.keys(item).map((key) => {
                if (key=="PaymentSS"&&item["PaymentSS"]!="") {
                  return (
                    <>
                    <h1 className="serial-number font-bold text-xl mx-6"> {count++}</h1>
<h1 className='mx-auto text-center font-bold text-2xl'>{item["email"]}</h1>
<h1 className='mx-auto text-center font-bold text-2xl'>{item["Delegate_type"]}</h1>
<a href={item["PaymentSS"]} target='_blank' rel='noreferrer'><img className={'w-52 h-52   '} src={item["PaymentSS"]}/></a>
<div className='flext justify-center'>
<Button onClick={function(){handleSubmit(itemId)}} className='my-2'>Approve Payment!</Button>
<a href={item["PaymentSS"]} target='_blank' rel='noreferrer'><Button  className=' ml-6 my-2'>View Screenshot</Button></a>
</div>
</>   )}})}  </div></>
                  
                
                
              
          
          
        ))}
        </div>)
        
        
      
    
                  }

                  
export default AdminPanel2;

