import Image from 'next/image';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import CloseReg from './CloseReg';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../public/firebaseconfig';
import data from '../data/data.json';
import { Button } from '@material-tailwind/react';
export default function Hero() {
  const [closeReg, setCloseReg] = useState(true);
  const handleChange = () => {
    setCloseReg(false);
    setTimeout(() => {
      setCloseReg(true);
    }, 1000);
  }
  const testimonial = [];

  data.testimonials.map((i) => {
    testimonial.push(i.review);
  });
  const[index,setCurrentTextIndex]=useState("4")
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  
  const [changebar,setbar]=useState(true);
  const auth=getAuth()
  function abc(){auth.onAuthStateChanged((user)=>{if(user){setbar(false)}else{setbar(true)}})}
  abc()
  
  return (
   
    <div className=''>
      <div className="sm:block sm:w-full sm:overflow-x-hidden hidden relative">
        <div className="row-span-full sm:w-full sm:h-screen sm:overflow-x-hidden col-span-full hero mx-0">
          <div className='flex justify-center gapmanager'>
            <div className='leftside block '>
          <h1 className='finaldate1 text-4xl text-[#B6FF1A] whitespace-nowrap text-left md:text-8xl mt-72 ml-24 border-[#fff] border-solid'>IIT BHU MODEL</h1>
          <h1 className='finaldate2 text-4xl text-[#B6FF1A] text-left whitespace-nowrap md:text-8xl ml-24'>UNITED NATIONS</h1>
          <h1 className='finaldate3 typewriter text-3xl text-[#fff] mt-4 text-left my-2 whitespace-nowrap md:text-6xl ml-24'>RISE.SPEAK.RESOLVE</h1>
          {changebar?<div className='flex gap-24 justify-center ml-4 mt-14'><Link href={'/registerpage'}><button className='bg-[#B6FF1A] hover:bg-[#ABCF3A]  text-4xl px-12 p-4 rounded-lg'>Register</button></Link>
         <Link href={'/loginpage'}><button className='bg-[#B6FF1A] hover:bg-[#ABCF3A]  text-4xl p-4 px-12 rounded-lg mr-32'>Login</button></Link></div>:<Button onClick={()=>{window.location.replace("/loggedinhomepage")}} className='block bg-[#B6FF1A] text-black-500  mx-auto my-8 text-4xl'>View Profile</Button>}
          </div>
          <div className='rightside block mr-28'>
        <img className='block mb-12 md:w-56 w-44 ml-48 mt-48' src='/images/Group.png'></img>
          <h1 className=' finaldate text-4xl text-center text-[#fff] whitespace-nowrap md:text-6xl mt-18 ml-24 mx-auto border-[#fff] border-solid'>29 SEPT - 1 OCT</h1>
          <h1 className='  text-4xl text-[#fff] currentyear font-bold text-center mt-16 ml-20 mx-auto border-[#fff]  border-solid'>  2023</h1>
          </div>
        </div></div>
       

      
        {/* <div className=" row-span-full  justify-center col-span-full self-center text-center mt-96 mr-56 ">
        
         {changebar?<button
            className="text-black bg-[#F5CE3F] hover:bg-yellow-500  mx-auto  px-12 2xl:px-12 h-12 absolute rounded-md text-[1.125rem]  font-semibold "
          ><Link href="/registerpage">
            REGISTER</Link>
          </button>:''}
         
         
        </div>
         */}
        <div className="row-span-full col-span-full self-end  text-center pb-4 mb-28 block">
         
          {/* <div id="testimo" className='text-[#FFFDFA] line-clamp-2 font-italic font-semibold text-3xl text-center inline mx-auto relative border-xl testimo border-black'>"{(testimonial[index])}" </div>*/}
        </div> 
      </div>
      <div className="grid sm:hidden">
        <div className="row-span-full col-span-full">
          <Image className='relative'
            src="/images/mobile-hero-bg.png"
            width={1079}
            height={2318}
          
            layout="responsive"
            alt="hero images"
          />
            <div className="row-span-full absolute bottom-96 block left-0 right-0 col-span-full self-center text-center z-10  "  data-te-animation-init
  data-te-animation-start="onScroll"
  data-te-animation-on-scroll="repeat"
  data-te-animation-reset="true"
  data-te-animation="[slide-right_1s_ease-in-out]">
          <Image className=''
            src="/images/hero-logo.svg"
            width={300}
            height={123.7}
            alt="hero images"
          />
         
        </div>
            {/* <div className='z-10 absolute top-96 bottom-0 left-0 right-0'>
        
        <h1 className=' finaldate text-3xl text-center text-[#fff] whitespace-nowrap md:text-6xl mt-18  mx-auto border-[#fff] border-solid'>29 SEPT - 1 OCT</h1>
       
        </div> */}
          {changebar? <Link href={'/registerpage'}><button className='absolute block mx-auto t-0 left-0 w-52 right-0 z-10 bottom-52 bg-[#B6FF1A] hover:bg-[#ABCF3A] text-2xl px-4 p-4 rounded-xl'>Register now!</button></Link>:<Button onClick={()=>{window.location.replace("/loggedinhomepage")}} className='absolute block mx-auto t-0 left-0 w-52 right-0 z-10 bottom-52 bg-[#B6FF1A] hover:bg-[#ABCF3A] text-2xl px-4 p-4 rounded-xl'>View Profile</Button>}
        </div>
        <div className="row-span-full col-span-full">
          <Image
            src="/images/hero-filter.png"
            width={1079}
            height={2318}
            layout="responsive"
            alt="hero images"
          />
        </div>
      
        
          
        
       
        </div>
      </div>
     
  );
}
