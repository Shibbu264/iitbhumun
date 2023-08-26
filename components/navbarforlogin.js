import Image from 'next/image';
import Link from 'next/link';
import {  FaSignInAlt, FaUserCircle } from "react-icons/fa";

import app from "../public/firebaseconfig";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useRouter } from "next/router";
import Register from './CloseReg';
import { getAuth,onAuthStateChanged,signOut,sendPasswordResetEmail } from 'firebase/auth';
import Script from 'next/script';


const   NavBar2 = ({ navbar,backgroundColor})=> {
  const auth = getAuth();
  

const [adminpanel,showadminpanel]=useState(false)
  const [closeReg, setCloseReg] = useState(true);
  const [display, buttonhide] = useState(false);
  const handleChange = () => {
    setCloseReg(false);
    setTimeout(() => {
      setCloseReg(true);
    }, 1000);
    buttonhide(true)
  }
  
    
  const [isOpen, setIsOpen] = useState(false);
   
  const router = useRouter();
      
    
  
    function handleLogout(){
     
     
      signOut(auth)
  .then(() => {
    
      router.push("/home");
    
  })
  .catch((error) => {
    console.log(error);
  });
      setTimeout(function(){setIsOpen(!isOpen)},100)

    };
  
    function handleMyProfile(){
      
      console.log("My Profile clicked");
      window.location.href = "/loggedinhomepage";
      setTimeout(function(){setIsOpen(!isOpen)},100)
    };
  
    function  handleChangePassword(){
    
      sendPasswordResetEmail(auth,auth.currentUser.email)
  .then(() => {
  
    alert("Password reset link sent to your email")
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
  });

      setTimeout(function(){setIsOpen(!isOpen)},100)
    };
  return (
    <div 
      className={`fixed w-full z-30 font-medium text-white sm:py-2 ${navbar
        ? `sm:bg-[#113C48] bg-white `
        : `bg-[#113C48]  `
        }`}
    >
      <div className="hidden sm:flex  flex-row items-center justify-between mx-16">
        <Image
          src="/images/active-nav-log.svg"
          width={50}
          height={50}
          alt="active-nav-logo"
        />
        <div className="justify-end hidden  text-white  items-center sm:flex space-x-12 2xl:space-x-24 font-medium">
          <Link href="home">
            <button className=" 2xl:text-xl border-[#A3CF3A]  hover:border-b-2 hover:border-spacing-4   duration-100">
              Home
            </button>
          </Link>
          <Link href="/committees">
            <button className="2xl:text-xl border-[#A3CF3A] hover:border-b-2 hover:border-spacing-4 text-lg  duration-100">
              Committees
            </button>
          </Link>
          <Link href="/secretariat">
            <button className="2xl:text-xl border-[#A3CF3A] hover:border-b-2 hover:border-spacing-4  text-lg  duration-100">
              Secretariat
            </button>
          </Link>
          <Link href="/partners">
            <button className="2xl:text-xl border-[#A3CF3A] hover:border-b-2 hover:border-spacing-4 text-lg  duration-100">
              Partners
            </button>
          </Link>
          <Link href="/gallery">
            <button className="2xl:text-xl border-[#A3CF3A] hover:border-b-2 hover:border-spacing-4 text-lg  duration-100">
              Gallery
            </button>
          </Link>
          <Link href="/faq">
            <button className="2xl:text-xl border-[#A3CF3A] hover:border-b-2 hover:border-spacing-4 text-lg  duration-100">
              FAQ
            </button>
          </Link></div>
          {adminpanel?<Link href={"/adminpanel"}><Button>Admin Panel</Button></Link>:''}
           <FaSignInAlt className='w-[40px] ml-20' fontSize='30'  color='#189BA5' markerHeight="5px" width="20px"></FaSignInAlt> 
         
          <div className="profile-dropdown">
          
          <FaUserCircle className='text-white cursor-pointer'  id='profileicon' onClick={function(){setIsOpen(!isOpen)}}  /> 
          {isOpen?(
        <div className='dropdowncontent'>
          <ul>
            <li onClick={handleMyProfile}>User dashboard</li>
           
            <li onClick={()=>{}}><Link href={'/CADB'}>CA Dashboard</Link></li>
            <li onClick={handleChangePassword}>Change Password</li>
            <li onClick={handleLogout}>Logout </li>
          </ul>
        </div>
      ):''}
    </div>

         
         
        
      </div>
      <div
        className={`sm:hidden w-full flex ${navbar
          ? 'items-center justify-between p-2'
          : 'flex justify-between w-full p-6'
          }`}
      >
        <div>
          <Menu>
            <MenuHandler className={`${!navbar ? 'hidden' : ''}`}>
              <Image
                src="/images/mobile-actinav.svg"
                width={52}
                height={20}
                alt="mobile-actinav"
              />
            </MenuHandler>
            <MenuList className="sm:hidden absolute z-30 top-0 h-full w-[100vw] rounded-none flex flex-col items-center justify-center bg-[#ABCF3A] bg-opacity-50 text-white text-3xl font-heading font-bold text-center backdrop-blur-lg">
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/">Home</Link></MenuItem>
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/committees">Committee</Link></MenuItem>
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/secretariat">Secretariat</Link></MenuItem>
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/partners">Partners</Link></MenuItem>
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/gallery">Gallery</Link></MenuItem>
              <MenuItem className='text-center hover:text-yellow-400'><Link href="/faq">FAQs</Link></MenuItem>
              <MenuItem className='text-center text-xl pt-12'><button className='text-black bg-white px-4 rounded-lg'>Close</button></MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className={`${!navbar ? 'hidden' : ''}`}>
          <Image
            src="/images/mobile-activenav-logo.svg"
            width={52}
            height={54.45}
            alt="mobile-activenav-logo"
          />
        </div>
        <FaSignInAlt className='w-[40px] ml-20' fontSize='30'  color='#189BA5' markerHeight="5px" width="20px"></FaSignInAlt> 
        <div className="profile-dropdown">
        <FaUserCircle className='text-black cursor-pointer ' id='profileicon' onClick={function(){setIsOpen(!isOpen)}}/> 
          {isOpen?(
        <div className=' mr-4 dropdowncontent1 '>
          <ul>
            <li className='mr-4 pr-2' onClick={handleMyProfile}>User dashboard</li>
            <li className='mr-6 px-4 'onClick={()=>{}}><Link href={'/CADB'}>CA Dashboard</Link></li>
            <li className='mr-4' onClick={handleChangePassword}>Change Password</li>
            <li className='mr-4'onClick={handleLogout}>Logout </li>
          </ul>
        </div>
      ):''}
      </div>
      </div>
    </div>
  );
}
export default NavBar2