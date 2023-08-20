import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState } from 'react';
import Register from './CloseReg';


export default function NavBar({ navbar,backgroundColor,qt}) {

  const [closeReg, setCloseReg] = useState(true);
  const [display, buttonhide] = useState(false);
  const handleChange = () => {
    setCloseReg(false);
    setTimeout(() => {
      setCloseReg(true);
    }, 1000);
    buttonhide(true)
  }
  return (
    <div
      className={`fixed w-full z-30 font-medium  sm:py-2  ${navbar
        ? `bg-[#113C48]  shadow-lg  text-white`
        : `bg-[#113C48] text-white`
        }`}
    >
      <div className="hidden sm:flex flex-row items-center justify-between mx-16">
        <Image
          src="/images/munvector.svg"
          width={60}
          height={60}
          alt="active-nav-logo"
        />
        <div className="justify-end hidden items-center sm:flex space-x-12 2xl:space-x-24 font-medium">
          <Link href="home">
            <button className=" border-[#A3CF3A] hover:border-b-2 2xl:text-xl hover:border-spacing-4 duration-100">
              Home
            </button>
          </Link>
          <Link href="/committees">
            <button className="2xl:text-xl text-lg border-[#A3CF3A] hover:border-b-2 hover:border-spacing-2 duration-100">
              Committees
            </button>
          </Link>
          <Link href="/secretariat">
            <button className="2xl:text-xl  text-lg border-[#A3CF3A] hover:border-b-2 hover:border-spacing-2 duration-100">
              Secretariat
            </button>
          </Link>
          <Link href="/partners">
            <button className="2xl:text-xl  text-lg border-[#A3CF3A] hover:border-b-2 hover:border-spacing-2 duration-100">
              Partners
            </button>
          </Link>
          <Link href="/gallery">
            <button className="2xl:text-xl  text-lg border-[#A3CF3A] hover:border-b-2 hover:border-spacing-2 duration-100">
              Gallery
            </button>
          </Link>
          <Link href="/faq">
            <button className="2xl:text-xl  text-lg border-[#A3CF3A] hover:border-b-2 hover:border-spacing-2 duration-100">
              FAQ
            </button>
          </Link><div>
<Link href="/registerpage">
  
         <button 
            className={'px-12 2xl:px-12 h-10 rounded-md text-xl font-semibold mx-2 text-black bg-[#ABCF3A] hover:bg-yellow-300'
              }
          >
            Register
          </button ></Link>
          <Link href="/loginpage">
         <button onClick={handleChange}
            className={`px-12 2xl:px-12 h-10 targetDiv rounded-md text-xl font-semibold mx-4  text-black bg-[#ABCF3A] hover:bg-yellow-300 ${qt} `}
          >
            Login
          </button></Link>
         
         </div>
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
                src="/images/mobile-actinav1.svg"
                
                width={52}
                height={20}
                alt="mobile-actinav"
              />
            </MenuHandler>
            <MenuList className="sm:hidden absolute z-30 top-0 h-full w-[100vw] rounded-none flex flex-col items-center justify-center bg-[#189BA5] bg-opacity-50 text-white text-3xl font-heading font-bold text-center backdrop-blur-lg">
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
            src="/images/munvector.svg"
            width={54}
            height={56.45}
            alt="mobile-activenav-logo"
          />
        </div>
       
          <button onClick={handleChange} className="py-2 px-[1.5rem] text-xs font-custom font-semibold text-white bg-[#A3B63A] rounded-lg">
            <Link href={'/registerpage'}>Register</Link>
          </button>
          <button  className="py-2 px-[1.5rem] text-xs font-custom font-semibold text-white bg-[#A3B63A] rounded-lg">
                 <Link href={'/loginpage'}>    Login</Link> 
                </button>
      </div>
    </div>
  );
}
