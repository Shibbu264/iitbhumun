import Image from 'next/image';
import Link from 'next/link';
import ReactDOM from 'react-dom'
import { getDatabase, ref, get, set, onValue, update, query,key, orderByChild, equalTo, child } from 'firebase/database';
import app from "../public/firebaseconfig";
import {
  
  Button,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useRouter } from "next/router";
import Footer2 from "../components/footerforlogin";
import { getAuth,onAuthStateChanged,signOut,sendPasswordResetEmail } from 'firebase/auth';
import Script from 'next/script';
import NavBar2 from '../components/navbarforlogin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Doubtbox from '../components/doubtbox';
import Head from 'next/head';












const CADB = () => {
  
  const [DATA, setDATA] = useState({});
  const [DATA3, setDATA3] = useState({});
  const [DATA4, setDATA4] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [name1, setname] = useState("<th className='table-auto min-w-full border text-center text-sm  dark:border-neutral-500'>Name</th>");
  const [name2, setname2] = useState("<th className='table-auto min-w-full border text-center text-sm  dark:border-neutral-500'>Payment status</th>");

  const handleFacebookShare = () => {
    const sharingURL = 'https://www.facebook.com/sharer/sharer.php?u=https://iitbhumun-om6k.vercel.app/';
    openSharePopup(sharingURL);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(sharingURL, '_blank');
    }
  };

  const handleTwitterShare = () => {
    const sharingURL = 'https://twitter.com/intent/tweet?url=https://iitbhumun-om6k.vercel.app/';
    openSharePopup(sharingURL);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(sharingURL, '_blank');
    }
  };

  const handleLinkedInShare = () => {
    const sharingURL = 'https://www.linkedin.com/sharing/share-offsite/?url=https://iitbhumun-om6k.vercel.app/';
    openSharePopup(sharingURL);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(sharingURL, '_blank');
    }
  };

  const handleWhatsAppShare = () => {
    const sharingURL = 'whatsapp://send?text=https://iitbhumun-om6k.vercel.app/';
    openSharePopup(sharingURL);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(sharingURL, '_blank');
    }
  };
  
  const openSharePopup = (url) => {
    window.open(
      url,
      'share-dialog',
      'width=800,height=600'
    );
  };
  
      // Check if user is on mobile and open WhatsApp sharing option
     
    
  

const auth=getAuth();




  
  async function fetchData() {
    try {
      const response = await fetch('https://mun-2023-default-rtdb.firebaseio.com/Referral_program.json');
      const data = await response.json();
      
      setDATA(data)
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
 
  setTimeout(()=>{
    if (true) {
      async function fetchData1() {
        try {
          await fetchData();
          // Wait for the first command to complete
          setIsLoading(false); // Execute the second command after the first one is finished
          
        } catch (error) {
          
        }
      }
   
      
        
      
     
        fetchData1();
    
    } },2000)
    

  
  
  if (isLoading) {
    return <div className='loader block my-auto'></div>
  }


  

  const filteredData = Object.keys(DATA).reduce((filtered, itemId) => {
    const item = DATA[itemId];
    if (item.email === auth.currentUser.email) {
      filtered.push({ itemId, ...item });
    }
    return filtered;
  }, []);




const name=localStorage.getItem("name")

  

  if(filteredData.length==0&&isLoading==false)
 {
  if(auth.currentUser!=""){
 return(
 
 <div className=' my-40'><h1 className='m-auto text-center text-4xl  block font-bold text-red-500'>Sorry,You aren't a conference ambassador.</h1>
 
 <Button className='mx-auto my-4 block w-100'><Link href={'/home'}>Home</Link></Button>
 </div>)}
 
}





else{



















    
     return (
      <div className=" block mx-auto p-0 w-100% sm:w-auto" >
        <Head><meta name="viewport" content="width=device-width, initial-scale=1"/>
</Head>
       <NavBar2 navbar={true} backgroundColor="white"/>
       <div className="my-50 mx-auto block text-center font-bold">
       {
        filteredData.map((item) => (
         
          <><h2 className="mt-50 text-center font-bold">Record of this user:</h2>
          <div className='flex'>
          <img className='mt-24 block mx-auto w-72 h-72' src={'images/5847920.jpg'} ></img>
          <img className='mt-24 mx-auto w-72 h-72' src={'images/referral1.png'} ></img>
          <img className='mt-24 mx-auto w-72 h-72 hidden sm:block' src={'images/5847920.jpg'} ></img></div>
          <h1 className="mt-26 mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#189BA5] md:text-5xl lg:text-6xl dark:text-[#189BA5]">Campus Ambassador Program</h1>
         <div className='shadow-[0_5px_10px_#189BA5] w-fit block mx-auto p-10 h-fit mt-10 rounded'>
          <ul className=''>
          <li className='mb-1 text-3xl font-bold' >
          Hello {name}<img src='/images/wave.gif' className='ml-3 w-14 h-14 mb-2 inline'></img></li>
            <li className='mb-1 text-xl'> Your Referral Code: <span className='text-[#189BA5] text-3xl font-bold mx-2'>{item.referralCode}</span><img onClick={async () => {
      try {
        await navigator.clipboard.writeText(item.referralCode);
        alert('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }} src='/images/copy.png' className='ml-3 inline w-8 h-8 cursor-pointer'></img></li>
          <li className='mb-1 text-xl'>  User Registered using your referral code:<span className='text-[#189BA5] font-bold '> {item.UserRegistered}</span> </li>
          <li className='mb-4 text-xl'>   Payment Confirmed: <span className='text-[#189BA5] font-bold'> {item.PaymentConfirmed}</span></li>
         <Button id='viewdetails'
           className='my-1 mb-3'>View Details</Button>

          </ul>
          <table className="mx-auto px-2 table-auto  border text-center text-sm  dark:border-black hidden" id='showtable'>
          <tbody>
         <tr id='html1' className=" text-center  mx-auto px-2">
<td className='table-auto min-w-full border text-center text-lg font-semibold text-red-500  dark:border-neutral-500 py-2'>Name </td>
         </tr>
         <tr id='html2'className=" text-center  mx-auto px-2">
<td className='table-auto min-w-full border text-center text-lg  font-semibold text-red-500 dark:border-neutral-500 py-2'>Payment done</td>
         </tr></tbody>
         </table>
          <h1 className=' text-center block mx-auto text-white  px-3 py-1 mt-10 rounded-md' ><span className='rounded-md px-3 py-1 bg-[#189BA5] w-fit '>Invite your friends!</span></h1>
          <div className="social-buttons mt-5">
  <button className="social-button sm:flex hidden facebook " onClick={handleFacebookShare}>
   
    Share on Facebook
    <img onClick={handleFacebookShare}  src='/images/facebook.png' className='ml-3 w-8 h-8'></img>
  </button>
 
  <button className="social-button twitter sm:flex hidden" onClick={handleTwitterShare}>
   
    Share on Twitter
    <img onClick={handleTwitterShare} src='/images/twitter.png' className='ml-3 w-8 h-8'></img>
  </button>
  <div className=' flex justify-between mx-auto  gap-12'>
  <img onClick={handleFacebookShare}  src='/images/facebook.png' className=' w-10 h-10 flex  sm:hidden'></img>
  <img onClick={handleTwitterShare} src='/images/twitter.png' className=' w-10 h-10 flex  sm:hidden'></img>
  <img onClick={handleLinkedInShare}  src='/images/linkedin.png' className=' w-10 h-10 flex  sm:hidden'></img>
  <img onClick={handleWhatsAppShare} src='/images/whatsapp.png' className=' w-10 h-10 flex  sm:hidden'></img></div>
  <button className="social-button sm:flex hidden linkedin" onClick={handleLinkedInShare}>
    
    Share on LinkedIn
    <img onClick={handleLinkedInShare}  src='/images/linkedin.png' className='ml-3 w-8 h-8'></img>
  </button>
  
  <button className="social-button sm:flex hidden whatsapp" onClick={handleWhatsAppShare}>
 
    Share on WhatsApp
    <img onClick={handleWhatsAppShare} src='/images/whatsapp.png' className='ml-3 w-8 h-8'></img>
  </button>
  
</div>

          </div>
          <h1 className="mt-32 mb-6 text-4xl font-extrabold leading-none tracking-tight text-[#189BA5]   md:text-4xl lg:text-5xl dark:text-[#189BA5]">Perks Of Campus Ambassador</h1>
           <ul className='list-disc w-content mx-4 h-content  text-center text-xl md:mx-52 sm:mx-auto my-4 text-center text-xl flex flex-col items-center'>
<li className='my-2  md:my-4 mx-auto'><span className='text-[#189] font-bold'>Leadership Opportunity:</span> The Campus Ambassador programme offers candidates a chance to showcase their leadership skills by bringing delegates from various regions together for the IITBHU MUN. As ambassadors, they will play a crucial role in fostering a diverse and inclusive delegation.</li>
<li className='my-2 md:my-4 mx-auto'><span className='text-[#189] font-bold'>Recognition and Certificate:</span> Campus Ambassadors who successfully bring eight or more delegates will receive a certificate recognized by the United Nations (UN). This recognition serves as a testament to their dedication and contribution to the success of the event.</li>
<li className='my-2 md:my-4 mx-auto'><span className='text-[#189] font-bold'>Delegate Price Reduction:</span> Ambassadors can enjoy additional benefits based on the number of delegates they bring. They will be eligible for a subsequent reduction in the delegate price, encouraging them to actively recruit participants for the conference.</li>
<li className='my-2 md:my-4 mx-auto'><span className='text-[#189] font-bold'>Top Ambassador Rewards:</span> The Campus Ambassador who brings the most delegates, surpassing a threshold of 25 participants, will receive a special memento as a token of appreciation. Additionally, they will be featured on the official IITBHU MUN Instagram page, gaining recognition and exposure for their outstanding efforts in mobilizing a large delegation.</li>




           </ul>
           
           
           
           
           
           </>
        ))}
      </div>
      <Doubtbox/>
      <Footer2 />
      <Doubtbox/>
      <Script src="vanillascript2.js" typeof='module' type='module' />
      </div>
    );
  
        }
        
    
    
    
    
    
    
    
    
    
    
    
  











  }


export default CADB