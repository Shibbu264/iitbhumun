import Image from 'next/image';
import Link from 'next/link';
import CloseReg from './CloseReg';
import { useState } from 'react';

export default function Footer() {
  const [closeReg, setCloseReg] = useState(true);
  const handleChange = () => {
    setCloseReg(false);
    setTimeout(() => {
      setCloseReg(true);
    }, 1000);
  }
  return (
    <div className="bg-[#0E114E] w-full">
      <div className="hidden flex-col mt-[8.75rem] text-white sm:flex  max-w-[90%] 2xl:max-w-[80%] mx-auto ">
        <div className="flex flex-row justify-between mt-[3.75rem]">
          <div className="max-w-1/4">
            <div className="flex flex-col">
              <div className="font-custom text-[1.5rem] font-bold">Explore</div>
              <div className="mt-[1.25rem] flex-wrap space-y-3 space-x-0 md:flex justify-between md:space-x-3 font-custom text-[1rem] sm:text-[1.125rem] 2xl:text-[1.25rem] font-medium">
                <div className='flex ' >
                  <Link href="/home">
                    <button className="p-1 hover:text-[#189BA5]">Home</button>
                  </Link>
                  <Link href="">
                    <button className="p-1 hover:text-[#189BA5]" >Committees</button>
                  </Link>
                  <Link href="/secretariat">
                    <button className="p-1 hover:text-[#189BA5]">Secretariat</button>
                  </Link>
                  <Link href="/gallery">
                    <button className="p-1 hover:text-[#189BA5]">Gallery</button>
                  </Link>
                  <Link href="/faq">
                    <button className="p-1 hover:text-[#189BA5]">FAQs</button>
                  </Link>
                </div>
              </div>
              <div>
                <div className="font-custom text-[1.5rem] font-bold mt-[3.75rem]">
                  Contact us
                </div>
                <div className="mt-[1.25rem] flex flex-col font-custom text-[1.25rem] font-medium">
                  <div>
                    <a className="flex" href='https://www.google.com/maps/place/Indian+Institute+of+Technology+(BHU)+Varanasi/@25.2623125,82.9893125,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x7555db6d623dc140!8m2!3d25.2623125!4d82.9893125'>
                      <Image
                        src="/images/location.svg"
                        width={24}
                        height={28.8}
                        alt="location"
                      />
                      <p className="pl-[2.063rem]">
                        IIT (BHU) Varanasi, India.
                      </p>
                    </a>
                  </div>
                  <div className="mt-[1.481rem]">
                    <a className="flex" href='mailto:secretariat@iitbhumun.com'>
                      <Image
                        src="/images/mail.svg"
                        width={24}
                        height={19.2}
                        alt="mail"
                      />
                      <p className="pl-[2.063rem]">
                        information@iitbhumun.com
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <div>
              <div className="font-custom text-[1.5rem] font-bold">
                Participation
              </div>
              <div>
                 <button  className="bg-[#E84C6D] hover:shadow-xl text-[1.125rem] font-custom font-medium mt-[1.25rem] text-white rounded-lg px-10 py-3">
                 <Link href={'/registerpage'}>    Register</Link> 
                </button>
                <button  className="bg-[#E84C6D] hover:shadow-xl text-[1.125rem] mx-6 font-custom font-medium mt-[1.25rem] text-white rounded-lg px-10 py-3">
                 <Link href={'/loginpage'}>    Login</Link> 
                </button>

              </div>
            </div>
            <div className="mt-[3.75rem]">
              <div className="font-custom text-[1.5rem] font-bold mt-[3.75rem]">
                Follow us
              </div>
              <div className="mt-[1.25rem] flex flex-row space-x-5">
                <div>
                  <Link href="https://www.instagram.com/iitbhu_mun/?hl=en">
                    <button>
                      <Image
                        src="/images/ig.svg"
                        width={24.08}
                        height={24.08}
                        alt="icons"
                      />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href="https://www.linkedin.com/company/iitbhumun/?originalSubdomain=in " >
                    <button>
                      <Image
                        src="/images/linkedin.svg"
                        width={24}
                        height={21}
                        alt="icons"
                      />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href="https://twitter.com/iitbhu_mun">
                    <button>
                      <Image
                        src="/images/twitter.svg"
                        width={28}
                        height={22}
                        alt="icons"
                      />
                    </button></Link>

                </div>
                <div>
                  <Link href="https://medium.com/@iitbhumun">
                    <button>
                      <Image
                        src="/images/medium.svg"
                        width={38.5}
                        height={22}
                        alt="icons"
                      />
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center my-[0.875rem] font-custom font-normal text-[1rem]">
          © 2025 All Rights Reserved
        </div>
      </div>

      <div className="bg-[#0E114E] mt-12 text-white px-4 sm:hidden flex flex-col items-center font-custom">
        <div className="w-full flex items-start justify-between mt-8">
          <div className="ml-2 flex flex-col">
            <div>
              <p className="font-bold"> Explore</p>
              <div className="flex flex-wrap text-xs mt-2">
                <Link href="/home">
                  <button className="p-1 hover:text-[#189BA5]">Home</button>
                </Link>
                <Link href="">
                  <button className="p-1 hover:text-[#189BA5]" >Committees</button>
                </Link>
                <Link href="/secretariat">
                  <button className="p-1 hover:text-[#189BA5]">Secretariat</button>
                </Link>
                <Link href="/gallery">
                  <button className="p-1 hover:text-[#189BA5]">Gallery</button>
                </Link>
                <Link href="/faq">
                  <button className="p-1 hover:text-[#189BA5]">FAQs</button>
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold">Contact us</p>
              <div className="flex flex-col text-xs mt-2">
                <div className="flex items-center my-[2px]">
                  <Image
                    src="/images/location.svg"
                    width={10}
                    height={13}
                    alt="icons"
                  />
                  <span className="ml-2 text-[10px]">
                    IIT (BHU) Varanasi, India.
                  </span>
                </div>
                <div className="flex items-center my-[2px]">
                  <Image
                    src="/images/mail.svg"
                    width={10}
                    height={13}
                    alt="icons"
                  />
                  <span className="ml-2 text-[10px]">
                    information@iitbhumun.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <div className="flex flex-col">
              <p className="font-bold">Participation</p>
              <button  className="bg-[#E84C6D] hover:shadow-xl text-[1.125rem] mx-6 font-custom font-medium mt-[1.25rem] text-white rounded-lg px-10 py-3">
                 <Link href={'/loginpage'}>    Login</Link> 
                </button>
                <button  className="bg-[#E84C6D] text-[1.125rem] font-custom font-medium mt-[1.25rem] text-white rounded-lg px-10 py-3">
                 <Link href={'/registerpage'}> Register</Link>
                </button>
                
              
            </div>
            <div className="mt-[44px]">
              <p className="font-bold">Follow us</p>
              <div className="flex flex-col mt-2">
                <div className="flex">
                  <div className="mr-2">
                    <Link href="https://www.instagram.com/iitbhu_mun/?hl=en">
                      <button>
                        <Image
                          src="/images/ig.svg"
                          width={18}
                          height={18}
                          alt="icons"
                        />
                      </button></Link>
                  </div>
                  <div className="ml-2">
                    <Link href="https://www.linkedin.com/company/iitbhumun/?originalSubdomain=in " >
                      <button>
                        <Image
                          src="/images/linkedin.svg"
                          width={24}
                          height={21}
                          alt="icons"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-2">
                    <Link href="https://twitter.com/iitbhu_mun">
                      <button>
                        <Image
                          src="/images/twitter.svg"
                          width={28}
                          height={22}
                          alt="icons"
                        />
                      </button></Link>
                  </div>
                  <div className="ml-2">
                    <Link href="https://medium.com/@iitbhumun">
                      <button>
                        <Image
                          src="/images/medium.svg"
                          width={38.5}
                          height={22}
                          alt="icons"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-2 text-[10px]">© 2025 All Rights Reserved</div>
      </div>
    </div >
  );
}
