import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { closeDialog } from "../../../lib/slices/GlobalDialogWrapperSlice";

export default function Logout() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch=useDispatch()

  if (session) {
    return (
      <div className="flex p-6 flex-col w-full bg-gradient-to-bl from-[#02006d] to-black justify-center items-center h-full" style={{border:'2px', borderColor:'pink'}}>
          <div className="flex flex-col items-center">
            <h2 className="text-[#E84C6D] font-bold mt-10 text-[24px]">
              Confirm session termination ?
            </h2>
            <p className="text-white font-semibold mt-6 text-[18px]">
              You&#39;ll need to sign in again to
            </p>
            <p className="text-white font-semibold mt-1 text-[18px]">
              access your account
            </p>
          </div>

          <div className="flex gap-4 justify-between mt-6">
            <button
              className="h-10 w-32 border-2 border-[white] rounded-2xl text-lg font-semibold bg-transparent text-white transition-transform hover:scale-105"
              onClick={() => {
                signOut({ redirect: "/" }).then(()=>router.push('/'));
              }}
            >
              Logout
            </button>

            <button
              className="h-10 w-32 border-2 border-[white] rounded-2xl text-lg font-semibold bg-transparent text-white transition-transform hover:scale-105"
              onClick={() => {
                dispatch(closeDialog())
              }}
            >
              Cancel
            </button>
          </div>
        </div>
    );
  }
}
