import React from 'react'
import SponsorCard from '../components/SponsorCard';
import data from '../data/data.json';
import Image from 'next/image';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';


const Partners = () => {
    

    return (
        <div>
            {<NavBar navbar={true}/>}
            <div className="mt-12 sm:mt-[0rem] pt-48 m-auto justify-center">
                <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[3.5rem]">
                    Our Collaborators
                </p>
                <div className="flex flex-row flex-wrap justify-evenly m-[4rem]">
                    <div className="flex flex-col items-center m-[2.5rem]">
                        <Image
                            src="/images/colab-2.svg"
                            width={199.06}
                            height={166}
                            alt="collaborators"
                        />
                        <span className="font-custom text-[1.25rem] text-[#E84C6D] font-medium mt-4 text-center">
                            UN information Centre for
                            <br />
                            India and Bhutan
                        </span>
                    </div>
                    <div className="flex flex-col items-center m-[2.5rem]   ">
                        <Image
                            src="/images/colab-3.png"
                            width={469.4}
                            height={166}
                            alt="collaborators"
                        />

                    </div>
                    <div className="flex flex-col items-center m-[2.5rem]   ">
                        <Image
                            src="/images/inccu.jpeg"
                            width={469.4}
                            height={166}
                            alt="collaborators"
                        />

                    </div>
                </div>
                <div className='flex justify-center'>
                    {data.collaborators.map((item) => {
                        return (
                            <SponsorCard key={item.id} src={item.src} height={item.height} width={item.height} href={item.href} />
                        );
                    })}
                </div>

                <p className="font-bold font-heading text-center mt-16 text-[#1A1E21] text-xl sm:text-[3.5rem]">
                    Our Sponsors
                </p>
                {/* <div className="sm:flex flex-wrap relative justify-around ">
                    {data.sponsors.map((item) => {
                        return (
                            <SponsorCard key={item.id} src={item.src} height={item.height} href={item.href} /> 
                        );
                    })}
                </div> */}

                <div className='flex flex-row flex-wrap justify-evenly mt-[2.5rem]'>
                    {data.sponsors.map((item) => {

                        return (
                            <>
                                <SponsorCard key={item.id} src={item.src} height={item.height} href={item.href} />
                            </>
                        )
                    })}
                </div>


            </div>


            <Footer />

        </div>
    )
}

export default Partners