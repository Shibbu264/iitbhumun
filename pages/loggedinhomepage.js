
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { IconButton, Progress,Typography } from "@material-tailwind/react";
import Footer from "../components/Footer";
import data from '../data/data.json';

import Doubtbox from '../components/doubtbox';
import Script from "next/script";
import NavBar2 from "../components/navbarforlogin";
import Footer2 from "../components/footerforlogin";
import { useEffect, useState, Ref } from "react";
import { getDatabase, get,set, onValue, ref,update } from "firebase/database";
import { Alert, Button, alert } from "@material-tailwind/react";
import Router, {  useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Loggedinhomepage = () => {
  <Head ><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
 
  
  
 
 
  var ab=false;
  const aippm = data.aippm;
  const unccc = data.unfccc;
  const g20 = data.g20;
  const uncsw = data.uncsw;
  const unhrc = data.unhrc;
  const jpc = data.jpc;
  
  const [selected1, setSelected1] = useState('None');
  const [selected2, setSelected2] = useState('none');
  const [selected3, setSelected3] = useState('none');
  const [pref1option1, setSelected4] = useState('');
  const [pref1option2, setSelected5] = useState('');
  const [pref1option3, setSelected6] = useState('');
  const [pref2option1, setSelected7] = useState('');
  const [pref2option2, setSelected8] = useState('');
  const [pref2option3, setSelected9] = useState('');
  const [pref3option1, setSelected10] = useState('');
  const [pref3option2, setSelected11] = useState('');
  const [pref3option3, setSelected12] = useState('');
  const handleChange1 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_1: e.target.value,
    });
    setSelected1(e.target.value);
  };


  let type1 = null;
  let options1 = null;
  if (selected1 === 'AIPPM') {
    type1 = aippm;
  } else if (selected1 === 'G-20') {
    type1 = g20;
  } else if (selected1 === 'UNFCCC') {
    type1 = unccc;
  } else if (selected1 === 'UNCSW') {
    type1 = uncsw;
  } else if (selected1 === 'UNHRC') {
    type1 = unhrc;
  } else if (selected1 === 'DISEC') {
    type1 = disec;
  } else if (selected1 === 'JPC') {
    type1 = jpc;
  }

  if (type1) {
    options1 = type1.map((el) => <option key={el}>{el}</option>);
  }
  const handleChange2 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_2: e.target.value,
    });
    setSelected2(e.target.value);
  };
  let type2 = null;
  let options2 = null;
  if (selected2 === 'AIPPM') {
    type2 = aippm;
  } else if (selected2 === 'G-20') {
    type2 = g20;
  } else if (selected2 === 'UNFCCC') {
    type2 = unccc;
  } else if (selected2 === 'UNCSW') {
    type2 = uncsw;
  } else if (selected2 === 'UNHRC') {
    type2 = unhrc;
  } else if (selected2 === 'DISEC') {
    type2 = disec;
  } else if (selected2 === 'JPC') {
    type2 = jpc;
  }




  if (type2) {
    options2 = type2.map((el) => <option key={el}>{el}</option>);
  }
  const handleChange3 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_3: e.target.value,
    });
    setSelected3(e.target.value);
  };
  
  let type3 = null;
  let options3 = null;
  if (selected3 === 'AIPPM') {
    type3 = aippm;
  } else if (selected3 === 'G-20') {
    type3 = g20;
  } else if (selected3 === 'UNFCCC') {
    type3 = unccc;
  } else if (selected3 === 'UNCSW') {
    type3 = uncsw;
  } else if (selected3 === 'UNHRC') {
    type3 = unhrc;
  } else if (selected3 === 'DISEC') {
    type3 = disec;
  } else if (selected3 === 'JPC') {
    type3 = jpc;
  }



  if (type3) {
    options3 = type3.map((el) => <option key={el}>{el}</option>);
  }

 
  
  const [formInput, setFormInput] = useState({
    
   
   option1: '',
   option2: '',
   option3: '',
    option4: '',
    option5: '',
    option6: '',
    option7: '',
    option8: '',
    option9: '',
  });










 
  const committees = [];

  data.registerCommittees.map((i) => {
    committees.push(i);
  });



















  const [updateportfolio1,setfolio]=useState(false);
   const [hideportfolio,setportfolio]=useState(false)
  const [buttonname, rename] = useState("Show Portfolio")
const[buttonname1,rename1]=useState("Change portfolio")
const[editprofile,setprofile]=useState(true)
    function pft() {
      rename1(updateportfolio1 ? buttonname1 = "Change portfolio" : buttonname1 = "Avoid Change")
      setfolio(!updateportfolio1)}

    const [usethis,setthis]=useState(true)
   
    return (
      
      <div className="bgchange relative w-fit sm:w-auto" >
       {/* <Script type="application/javascript" src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} crossorigin="anonymous"></Script> */}
        <NavBar2 navbar={true} backgroundColor="white" />
        <div className="  my-50 text-center font-bold block mx-auto ">

        <h2 className="mt-50 text-center font-bold">x</h2>
        <div id="wholescreen" className="sm:block  sm:mx-auto   block mx-auto "><div className="mx-auto block" >
        <h1 className="mt-22 mb-4 text-center inline-block mx-auto text-4xl font-extrabold leading-none tracking-tight text-[#189BA5] md:text-5xl  dark:text-[#189BA5]"></h1>
<div id="ddheader"></div>
<Button className="mt-12 mb-4" onClick={()=>{setprofile(!editprofile)}}>Edit Profile</Button>
      <div id="content" className={editprofile?"mt-29  h-fit px-4 md:w-screen  relative  mx-auto text-center font-bold":"hidden"}></div>
      
      
      <div class={editprofile?'hidden':' datacard bg rounded-lg sm:px-8 px-24   mb-6 w-fit mx-auto block  '} >
             
             <label className="text-white text-left">Name:</label>
            <input id="name_field"   type="text" className=" mt-1 mx-auto mb-6 text-2xl mx-6 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5 dark:bg-gray-700 "/>
            <label className="text-white text-left">Age:</label>
            <input id="age"  type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/>
            <label className="text-white text-left">Gender:</label>
            <input id="gender"  type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/>
            <label className="text-white text-left">Phone Number:</label>
            <input id="number"  type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/>
           
            <label className="text-white text-left">Institute:</label>
            <input id="Institute"type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/>
            <label className="text-white text-left">Number of MUN appeared:</label>
            <input id="muncount"  type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/>
            <label className="text-white text-left">Region:</label>
            <input id="region"  type="text" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/> 
            <label className="text-white text-left">Institute ID:</label>
            <input type="file" id="file" className=" mt-1 mx-auto mb-6 text-2xl border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-4.5 px-4.5  dark:bg-gray-700 "/> 
            
            <Button id="updatebutton1">Update!</Button>
            <h1 className="text-[#ABCF3A] my-2" id="updateresult"></h1>
            </div>



          <div id="reff" className="hidden">
  <h1 className="text-[#ABCF3A]">You haven't used referral code</h1>
  <Button className="my-2" onClick={()=>{setthis(!usethis)}}>use now</Button>
  <div className={usethis?'hidden':'block'}>
    <input type="text" id="reffvalue" className="mx-4"></input>
    <Button type="button" id="reffbutton">Apply!</Button>
  </div>
</div>
          <div id="content3" className="hideit mt-29  h-fit px-4 md:w-screen  relative  mx-auto text-center font-bold" ></div>
          <h1 class="absolute top-0 left-0 bottom-0 right-0 z-[-1] text-9xl font-bold text-white">Heading Behind</h1>
<div id="progressvalue1" class="text-center mx-auto gap-15 mb-1">
  <span class=" text-xl font-medium mx-12 text-white dark:text-white">Registration meter</span>
  
</div>
<div id="progressvalue3"  class="sm:w-96 w-80 block mx-auto bg-[#DCD5D57A] rounded-full h-3 dark:bg-gray-700">
  <div id="progressvalue2" class="bg-[#A3CF3A] h-3 rounded-full w-[50%]"></div><span id="progressvalue" class="text-xl mt-1 text-center font-semibold text-white dark:text-white mx-auto block">50%</span>
</div>
<div className="block mx-auto" id="ssform1">
          <h1 id="showresult" className='my-6 text-[#fff] text-2xl w-30px text-center'></h1>
          <div id="afterpayment">
         <h1 id="paynow!" className="hidden text-2xl text-[#A3CF3A]">Pay on this QR code and upload Screenshot with time of payment.</h1>
         <img  src="/images/join.svg" id="paymentqr" className="inline mx-auto mt-3 hidden"/>
         <form className="hidden my-3" id="ssform">
         
         <input className="bg-white mt-6" type="file" id="photoInput1"/>
         <Button id="ssbutton" className="block mx-auto my-3">Upload</Button></form>
          </div></div>
          <div className=" h-cover border-l-2 border-gray-500">
            
          </div></div>
          <div className="text-[#abcf3a] mt-4 text-2xl">
            <h1>Need Accomodation?</h1><a target="_blank" className="text-white hover:text-blue-gray-200 hover:underline-offset-1" href="https://forms.gle/6hR469cqZxwxD3UdA">Click here!</a>
          </div>
<div className="mt-28 ">

<h1 id="ddportfolio" className="  text-4xl font-extrabold leading-none tracking-tight text-[#189BA5] mb-12 md:text-5xl lg:text-6xl dark:text-[#189BA5]">My Portfolio</h1>
        
          <div className={` sm:flex sm:justify-between  block mx-auto`} id= "showportfolio"  >
            <div className=" sm:mx-auto tablebg mb-[2.938rem] mx-auto w-fit sm:w-fit sm:h-cover bg-white rounded-lg px-4 py-8">
              <h2 className="'block' py-4 text-2xl  text-white">Committee-1  </h2>

              <h1 id="h1"></h1><table className=" sm:w-72 min-w-full border text-center text-[#fff]  text-sm border-black-500 dark:border-neutral-500" id="container2ul">
                <thead className="border-b font-medium dark:border-neutral-500">

                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500 text-xl">Preference type</th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500 text-xl">Name</th>


                </thead>
                <tbody>
                  <tr id="container2ul-row1">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 1</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 2</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 3</td>
                  </tr>
                  <tr id="container2ul-row2" className="text-[#abcf3a]">

                  </tr>

                </tbody>

              </table>
             
            </div>
            <div className=" sm:mx-[auto] tablebg mb-[2.938rem] mx-auto w-[fit-content] sm:w-[fit-content] sm:h-[cover] bg-white rounded-lg px-4 py-8">
              <h2 className="'block' py-4 text-2xl text-white">Committee-2  </h2>
              <h1 id="h2"> </h1><table className="table-auto text-[#fff]  min-w-full border text-center text-sm  dark:border-neutral-500" id="container3ul"><thead className="border-b font-medium dark:border-neutral-500">

                <th
                  scope="col"
                  className="border-r px-6 py-4 dark:border-neutral-500 text-xl">Preference type</th>
                <th
                  scope="col"
                  class="border-r px-6 py-4 dark:border-neutral-500 text-xl">Name</th>


              </thead>
                <tbody>
                  <tr id="container3ul-row1">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 1</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 2</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 3</td>
                  
                  </tr>


                  <tr id="container3ul-row2" className="text-[#abcf3a]">

                  </tr>


                </tbody>

              </table>
            </div>


            <div className=" sm:mx-[auto] tablebg mb-[2.938rem] mx-auto w-[fit-content] sm:w-[fit-content] sm:h-[cover] bg-white rounded-lg px-4 py-8">
              <h2 className="'block' py-4 text-2xl text-white">Committee-3  </h2>
              <h1 id="h3"> </h1><table className="table-auto text-[#fff]  min-w-full border text-center text-sm  dark:border-neutral-500" id="container4ul">
                <thead className="border-b font-medium dark:border-neutral-500">

                  <th

                    className="border-r px-6 py-4 dark:border-neutral-500 text-xl">Preference type</th>
                  <th

                    className="border-r px-6 py-4 dark:border-neutral-500 text-xl">Name</th>

                </thead>
                <tbody>
                  <tr id="container4ul-row1">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 1</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 2</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">Preference 3</td>
                  </tr>
                  <tr id="container4ul-row2"  className="text-[#abcf3a]">

                  </tr>

                </tbody>
              </table>
            
</div></div>
<button onClick={pft} id="showbutton1" className="bg-transparent mx-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">{`${buttonname1}`}</button>
            </div>
          </div>
          <Script src="vanillascript.js" typeof='module' type='module' />
        </div>
        <div className={`flex flex-col  sm:grid sm:grid-flow-col sm:grid-cols-3  items-center py-12 m-auto justify-items-center`}>
            <div className={`${updateportfolio1?'block':'hidden'}`}>
              
              <p className=" text-center font-bold text-3xl mb-5">
                PORTFOLIO I
              </p>

              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>
                <select id='Committee1'
                  name="Committee1" 
                  value={selected1}
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange1(e);
                    
                   
                  }} 
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select id='pref1option1'
                    name="Option 1" value={pref1option1}
                    className="w-72 p-2 rounded-lg"   
                     onChange={(e)=>{setSelected4(e.target.value)}}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select value={pref1option2}
                    name="Option 2" id='pref1option2'
                    className="w-72 p-2 rounded-lg" 
                    onChange={(e)=>{setSelected5(e.target.value)}}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select  value={pref1option3} onChange={(e)=>{setSelected6(e.target.value)}}
                    name="Option 3" id='pref1option3'
                    className="w-72 p-2 rounded-lg"
                  
                  >
                    {options1}
                  </select>
                </div>
              </div>
              
            </div>
           
            <div className={`${updateportfolio1?'block':'hidden'}`}>
            
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO II
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select value={selected2} id='Committee2'
                  name="Committee1"
                  
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange2(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select value={pref2option1} id='pref2option1'onChange={(e)=>{setSelected7(e.target.value)}}
                    name="Option 1"
                    className="w-72 p-2 rounded-lg" >
                    {options2}
                  </select>
                </div>
              </div>{' '}
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select value={pref2option2}
                    name="Option 2" id='pref2option2'
                    className="w-72 p-2 rounded-lg"
                    onChange={(e)=>{setSelected8(e.target.value)}}
                  >
                    {options2}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select value={pref2option3}
                    name="Option 3" id='pref2option3'
                    className="w-72 p-2 rounded-lg"
                    onChange={(e)=>{setSelected9(e.target.value)}}
                  >
                    {options2}
                  </select>
                </div>
              </div>
            </div>
            <div className={`${updateportfolio1?'block':'hidden'}`}>
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO III
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select
                  name="Committee1" id='Committee3'
                  value={selected3}
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange3(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option1} id='pref3option1'
                    onChange={(e)=>{setSelected10(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select
                    name="Option 2"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option2} id='pref3option2'
                    onChange={(e)=>{setSelected11(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select
                    name="Option 3"
                    className="w-72 p-2 rounded-lg"
                    value={pref3option3} id='pref3option3'
                    onChange={(e)=>{setSelected12(e.target.value)}}
                  >
                    {options3}
                  </select>
                </div>
              </div>
            </div>
          </div>
         



<Button id="updatevalues" className={`${updateportfolio1?'block':'hidden'} mx-auto`}>Update portfolio</Button>
<h1 id="after" className={`my-4  text-[#189BA5] text-2xl font-bold text-center`}></h1>




<Script src="vanillascript.js" typeof='module' type='module' />
<Doubtbox/>
        <Footer2 />
      </div>
    );}
   
      
  

  ;

  export default Loggedinhomepage;
