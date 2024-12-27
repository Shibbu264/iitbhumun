import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Logout() {
  const { data: session } = useSession();
  const router = useRouter();

  const [hover, setHover] = useState({ logout: false, cancel: false });

  if (session) {
    return (
      <div className="flex justify-center items-center max-w-[735px]:min-h-screen">
      <div className="w-[305px] h-[305px] bg-cover bg-center scale-[0.85] sm:scale-100" 
           style={{ backgroundImage: "url('/images/Logout4.svg')" }}>
        <div className="flex flex-col items-center">
          <h2 className="text-[#E84C6D] font-semibold mt-20 text-[24px]">Confirm session</h2>
          <h3 className="text-[#E84C6D] font-semibold mt-3 text-[24px]">termination ?</h3>
          
          <p className="text-white font-semibold mt-10 text-[18px]">You'll need to sign in again to</p>
          <p className="text-white font-semibold mt-1 text-[18px]">access your account</p>
        </div>

        <div className="flex justify-evenly mt-10">
          <button
            className="h-10 w-32 border-2 border-[white] rounded-2xl text-lg font-semibold bg-transparent text-white transition-transform hover:scale-110"
            onMouseEnter={() => setHover({ ...hover, logout: true })}
            onMouseLeave={() => setHover({ ...hover, logout: false })}
            onClick={() => { signOut({ redirect: "/" }) }}
          >
            Logout
          </button>
          
          <button
            className="h-10 w-32 border-2 border-[white] rounded-2xl text-lg font-semibold bg-transparent text-white transition-transform hover:scale-110"
            onMouseEnter={() => setHover({ ...hover, cancel: true })}
            onMouseLeave={() => setHover({ ...hover, cancel: false })}
            
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    );
  }
}
