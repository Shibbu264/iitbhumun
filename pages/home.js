import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Main from '../components/Main';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { getAuth ,onAuthStateChanged} from 'firebase/auth';
import NavBar2 from '../components/navbarforlogin';
import Doubtbox from '../components/doubtbox';
import Footer2 from '../components/footerforlogin';
import Clientside from '../components/clientside';

export default function Home() {

  const auth=getAuth();
  const [changebar,setbar]=useState(true);
 function abc(){auth.onAuthStateChanged((user)=>{if(user){setbar(false)}else{setbar(true)}})}
  abc()


  const [navbar, setNavbar] = useState(false);
  const [ab, setab] = useState("");
  const changeNavbar = () => {
    if (window.scrollY >= 50) {
     setab("white")
      setNavbar(true);
    } else {
      setab("red")
      setNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);
    return () => window.removeEventListener('scroll', changeNavbar);
  }, []);

  return (
    <Clientside>
    <div className="bg-[#FFFFFF] font-semibold">
     {changebar? <NavBar navbar={true} backgroundColor={ab} qt=''  />:<NavBar2 navbar={true} backgroundColor="white" />}
      
      <Hero />
      <Main />
      <Doubtbox/>
     {changebar? <Footer />:<Footer2/>}

    </div>
    </Clientside>
  );
}
