import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/Navbar';
import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";



export default function ClarionPage  () {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

  return (
    <>
<NavBar navbar={true} backgroundColor="white" qt='' />
<div className='flex flex-col z-40 items-center justify-center '>
<div className="flex mt-12 flex-row items-center justify-between gap-[1%]">
        <Image className=''
          src="/images/Vector.png"
          width={72}
          height={72}
          alt="active-nav-logo"
        />
    <h1 className='ml-50% text-4xl mt-24 mb-12 text-center font-bold text-[#189BA5] '> 12th Edition Clarion </h1></div>
    <Fragment>
            <Accordion open={open === 1} className={open ? "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[12.563rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2" : "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[6rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2}?"}>
                <AccordionHeader onClick={() => handleOpen(1)} className="sm:text-[1.125rem] font-custom border-none text-left">
                DAY-0
                </AccordionHeader>
                <AccordionBody className="text-[1rem] font-custom border-t-[1px] border-black/50">
                    <a href='https://drive.google.com/file/d/1RKSnt4_PuzxvQcDDF2WEnDDaf2xD3JDX/view?usp=drive_link' target='_blank'>View!</a>
                </AccordionBody>
            </Accordion>
        </Fragment>
        <Fragment>
            <Accordion open={open === 1} className={open ? "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[12.563rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2" : "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[6rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2}?"}>
                <AccordionHeader onClick={() => handleOpen(1)} className="sm:text-[1.125rem] font-custom border-none text-left">
                DAY-1
                </AccordionHeader>
                <AccordionBody className="text-[1rem] font-custom border-t-[1px] border-black/50">
                    <a href='https://drive.google.com/file/d/1AdZFtGcMsbpZMotNw4DrEZ1C6Sq3N3zr/view?usp=drive_link' target='_blank'>View!</a>
                </AccordionBody>
            </Accordion>
        </Fragment>
        <Fragment>
            <Accordion open={open === 1} className={open ? "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[12.563rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2" : "flex flex-col sm:mx-[8.188rem] mb-[2.938rem] w-[80vw] sm:w-[34.313rem] sm:h-[6rem] bg-white shadow-black/10 shadow-xl rounded-lg px-4 py-2}?"}>
                <AccordionHeader onClick={() => handleOpen(1)} className="sm:text-[1.125rem] font-custom border-none text-left">
                DAY-2
                </AccordionHeader>
                <AccordionBody className="text-[1rem] font-custom border-t-[1px] border-black/50">
                    <a></a>
                </AccordionBody>
            </Accordion>
        </Fragment>
    
    
    
    
    </div>
    
    <footer/>
    </>
  );
};

;
