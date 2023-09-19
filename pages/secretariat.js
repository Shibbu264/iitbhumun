import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer';
import SecretariatCard from '../components/SecretariatCard';
import data from '../data/data.json'
import TeamCard from '../components/TeamCard';
import NavBar2 from '../components/navbarforlogin';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import Doubtbox from '../components/doubtbox';

export default function Secretariat() {
    const auth=getAuth();
    const [changebar,setbar]=useState(true);
   function abc(){auth.onAuthStateChanged((user)=>{if(user){setbar(false)}else{setbar(true)}})}
    abc()

    return (
        
        <div className='bg-gray-200 w-[100%] sm:w-[100%] ' >
            {changebar? <NavBar navbar={true} backgroundColor="white" qt='' />:<NavBar2 navbar={true} backgroundColor="white" />}

            <div className='   text-5xl pt-24 text-center'>
                Secretariat
            </div>

            <div>
                <div className='flex mt-24 w-[350px] sm:w-[80%] sm:max-w-[1500px] m-auto gap-20 flex-wrap justify-center p-2 '>
                    {data.secretariat.map((i) => {
                        return (
                            <SecretariatCard
                                key={i.id}
                                id={i.id}
                                name={i.name}
                                position={i.position}
                                description={i.description}
                                src={i.img}
                            />
                        )

                    })}
                </div>
            </div>
            

          
            <div>
                <div className='flex ] mt-24 w-[350px] sm:w-[80%] sm:max-w-[1500px]  m-auto gap-32 flex-wrap justify-center p-10'>
                    {data.vertical.map((i) => {
                        return (
                            <TeamCard
                                key={i.id}
                                id={i.id}
                                vertical={i.vertical}
                                member1={i.member1}
                                member2={i.member2}
                                member3={i.member3}
                                member4={i.member4}
                                member5={i.member5}
                                member6={i.member6||""}
                                member7={i.member7||""}
                                member8={i.member8||""}
                                member9={i.member9||""}
                                img={i.img}
                            />
                        )

                    })}
                </div>
            </div>
<Doubtbox/>
            <Footer />
        </div >
    )
}
