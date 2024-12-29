import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div
      className="h-full w-full md:w-[700px] max-h-[720px] bg-cover gap-6 bg-center aspect-[16/9] flex md:flex-row flex-col items-center rounded-3xl"
    >
      <img className="w-full  !rounded-none md:h-full h-2/3" src="/images/Login.svg"/>
      <div className="md:absolute bottom-24 left-24" style={{left:'2.5rem'}}>
        <button
          onClick={() => signIn()}
          className="flex items-center gap-4 px-6 py-2
            bg-white text-black text-lg font-medium 
            border border-gray-200 rounded-xl shadow-md 
            hover:bg-gray-50 transition-colors
            
            sm:text-xl "
        >
          <Image
            src="/images/GoogleSymbol.png"
            alt="Google Icon"
            width='35'
            height='20'
          />
          Sign in with Google
        </button>
        </div>
    </div>
  );
}
