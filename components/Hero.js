import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CloseReg from './CloseReg';
import { useDispatch } from 'react-redux';
import { openDialog } from '../lib/slices/GlobalDialogWrapperSlice';
import { useSession } from 'next-auth/react';
export default function Hero() {
  const [closeReg, setCloseReg] = useState(true);
  const session=useSession()
  const dispatch=useDispatch()
  const handleChange = () => {
    setCloseReg(false);
    setTimeout(() => {
      setCloseReg(true);
    }, 1000);
  }
  return (
    <div className="">
    <div className="sm:grid hidden relative">
      <div className="row-span-full col-span-full">
        <Image
          src="/images/HomeFlush2.svg"
          style={{ position: "absolute" }}
          width={1920}
          height={1080}
          layout="responsive"
          alt="hero images"
        />
      </div>

    
    <div className="absolute top-1/2 left-[7%] transform -translate-y-1/2 w-full max-w-4xl">
      <div className="relative">
        <Image
          src="/images/Logo1234.svg"
          width={405}
          height={249.19}
          alt="IITBHU MUN logo"
          className="w-auto h-auto max-w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-semibold">
          IITBHU
        </h1>
        <h1 className="text-white text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-semibold whitespace-nowrap -mt-1">
          MODEL UNITED NATIONS
        </h1>
        <h2 className="text-[#E84C6D] text-lg sm:text-2xl lg:text-3xl xl:text-3xl font-medium whitespace-nowrap">
          RISE. SPEAK. RESOLVE.
        </h2>
        <h2 className="text-white text-lg sm:text-2xl lg:text-3xl xl:text-3xl font-medium whitespace-nowrap">
          21-23 FEBRUARY 2025
        </h2>
      </div>

      {session?.status === "unauthenticated" && (
        <button
          onClick={() => dispatch(openDialog('login'))}
          className="mt-4 px-6 py-2 bg-[#E84C6D] text-white rounded-md text-sm sm:text-md lg:text-lg font-semibold hover:bg-[#d43d5d] transition-colors duration-200"
        >
          Register
        </button>
      )}
    </div>

       

        
        <div className="row-span-full col-span-full self-end text-center pb-4 mr-12">
          <Image
            src="/images/hero-scroll.svg"
            width={33.95}
            height={64.61}
            alt="hero images"
          />
        </div>
      </div>
      <div className="grid sm:hidden">
        <div className="row-span-full col-span-full">
          <Image
            src="/images/AndroidHome.svg"
            width={1079}
            height={2318}
            layout="responsive"
            alt="hero images"
          />
        </div>
        <div className="row-span-full col-span-full">
          <Image
            src=""
            width={1079}
            height={2318}
            layout="responsive"
            alt="hero images"
          />
        </div>
        <div className="row-span-full col-span-full self-center text-center ">
          <Image
            src="/images/Logo12.svg"
            width={300}
            height={123.7}
            alt="hero images"
          />
        </div>
        
          
        
       
        </div>
      </div>
    
  );
}
