import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className="h-full w-full flex flex-col items-center relative rounded-3xl overflow-hidden"
      style={{
        backgroundImage: "url('/images/Login2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
        aspectRatio: "16/9",
        maxHeight: "430px"
      }}>
      
      <div className="w-full h-full flex items-center justify-center">
      <button 
 onClick={() => signIn()}
 className="flex items-center gap-4 px-6 py-2
            bg-white text-black text-lg font-medium 
            border border-gray-200 rounded-xl shadow-md 
            hover:bg-gray-50 transition-colors
            absolute top-[75%] left-[10%]
            sm:text-xl md:left-[10%]">
 <img src="/images/GoogleSymbol.png" alt="Google Icon" 
      className="w-14 h-15" /> 
 Sign in with Google
</button>
      </div>
    </div>
  );
}