import Image from 'next/image';
import CountdownElement from './Countdown';
import data from '../data/data.json';
import Card from '../components/TestimonialCard';
import Link from 'next/link';

export default function Main() {
  return (
    <div className="w-[90%] mx-auto pt-16 bg-[#F5F5F5]  flex flex-col space-y-24">
      <div className="">
        <p className="font-extrabold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          Conference begins in
        </p>
        <CountdownElement />
      </div>
      <div className="mt-12 sm:mt-[8.75rem]">
        <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          United Nations Collaboration in This Edition
        </p>
        <div className="mt-[3.75rem] sm:flex justify-center hidden">
          <div className="flex flex-col items-center mx-[5.188rem]">
          <Image
              src="/images/inccu.jpeg"
              width={400}
              height={180}
              alt="collaborators"
            />
            <span className="font-custom text-[1.25rem] text-[#189BA5] font-medium mt-4">
              UNESCO (INCCU)
            </span>
          </div>
          <div className="flex flex-col items-center m-auto">
                        <Image
                            src="/images/colab-2.svg"
                            width={200}
                            height={150}
                            alt="collaborators"
                        />
                        <span className="font-custom text-[1.25rem] text-[#189BA5] font-medium mt-4 text-center">
                            UN information Centre for India and Bhutan
                        </span>
                    </div>

          <div className="flex flex-col items-center mx-[5.188rem]">
            <Image
              src="/images/colab-3.svg"
              width={469.4}
              height={166}
              alt="collaborators"
            />
          </div>
        </div>
        <div className="sm:hidden mt-4">
          <Image
            src="/images/mobile-collaborators.svg"
            width={1080}
            height={100}
            alt="mobile-collaborators"
          />
          <div className="flex px-8">
            <div className="font-custom font-semibold text-[0.625rem] text-[#189BA5] text-center">
              UNESCO (INCCU)
            </div>
            <div className="font-custom font-semibold text-[0.625rem] text-[#189BA5] text-center ml-[1.375rem]">
              UN information Centre <br />
              for India and Bhutan
            </div>
            <div className="font-custom font-semibold text-[0.625rem] text-[#189BA5] text-center ml-[1.25rem]">
              MUN Refugee <br />
              Challenge
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-[8.75rem]">
        <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          Letter from Secretary-General
        </p>
        <div className="flex justify-center mt-8 sm:mt-[3.75rem]">
          <p className="px-8 w-[58.75rem] sm:w-[73.375rem] text-[#03001E] sm:text-lg font-light font-custom text-justify">
            <p>Dear Delegates, Faculty Advisors, and Members of the Secretariat, </p>
            <p className='mt-2'>It is with immense pride and anticipation that I welcome you to the 13th edition of IITBHU Model United Nations. Representing one of India’s premier institutions, IITBHU MUN has long been a stage where intellect meets diplomacy, and ideas transform into action.
            </p>
            <p className='mt-2'>Over the past twelve years, this conference has not only become one of the largest MUNs in India but also a hallmark of excellence, attracting delegates of unparalleled caliber and distinguished leaders from across the globe. From policymakers like Dr. Ajay Kumar, former Defence Secretary of India, to other eminent personalities, our legacy is built on the insights of those who shape the world and the ambitions of those who will inherit it.
</p>
            <p>This year, we continue that legacy with a renewed vision. IITBHU MUN is not merely a conference—it is a confluence of bright minds, a platform for bold ideas, and a crucible for innovative solutions to global challenges. It is where debate transcends rhetoric and becomes a force for change, where every resolution carries the weight of potential impact.
</p>
            <p className='mt-2'>As Secretary-General, I am honored to lead this year’s endeavor. With the combined strength of IITBHU’s storied reputation and the relentless dedication of our extraordinary Secretariat, this edition promises to elevate our already illustrious standards.
</p>
<p className='mt-2'>To those who join us, know that this conference is more than an opportunity to engage in diplomacy—it is a chance to challenge convention, shape discourse, and leave your mark. Here, in the heart of Banaras, a city as timeless as the ideals of unity and progress we aspire to uphold, you will take part in something truly remarkable.
</p>
            <p className='mt-2'>I look forward to seeing your passion, creativity, and resolve define the 13th edition of IITBHU MUN. The stage is yours.
</p>
            <p className='mt-2 font-bold'>Yours sincerely,
</p>
            <p className='mt-2 font-bold'>Ron Rexy</p>
            <p className='font-bold'>Secretary-General, IITBHU MUN’25
</p>
          </p>
        </div>
      </div>
      <div className="mt-16 flex flex-col space-y-10 max-w-[58.75rem] sm:max-w-[73.375rem] mx-auto">
        <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          Legacy
        </p>
        <div className="hidden sm:flex justify-between">
          <div className="flex flex-col items-center">
            <Image
              src="/images/conferences.svg"
              width={230}
              height={230}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-[1.25rem] font-custom text-[#189BA5] font-medium">
              Conferences
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/legacy-circle2.png"
              width={230}
              height={230}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-[1.25rem] font-custom text-[#189BA5] font-medium">
              Nationalities
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/legacy-circle3.svg"
              width={230}
              height={230}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-[1.25rem] font-custom text-[#189BA5] font-medium">
              Delegates
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <div className="mr-2 flex flex-col items-center">
            <Image
              src="/images/legacy-circle1.svg"
              width={100}
              height={100}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-xs font-custom text-[#189BA5] font-semibold">
              Conferences
            </span>
          </div>
          <div className="mx-2 flex flex-col items-center">
            <Image
              src="/images/legacy-circle2.svg"
              width={100}
              height={100}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-xs font-custom text-[#189BA5] font-semibold">
              Countries
            </span>
          </div>
          <div className="ml-2 flex flex-col items-center">
            <Image
              src="/images/legacy-circle3.svg"
              width={100}
              height={100}
              alt="legacy"
            />
            <span className="mt-[0.25rem] text-xs font-custom text-[#189BA5] font-semibold">
              Delegates
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-[#03001E] px-8 sm:text-lg font-light font-custom text-justify">
            {data.legacyText}
          </p>
        </div>
      </div>
      <div className="mt-12 sm:mt-[8.75rem]">
        <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          About us
        </p>
        <div className="flex justify-center mt-8 sm:mt-[3.75rem]">
          <p className="px-8 w-[58.75rem] sm:w-[73.375rem] text-[#03001E] sm:text-lg font-light font-custom text-justify">
            {data.about}
            <br />
            <span className="text-[#189BA5] underline mt-2">
              <Link href="/secretariat">Meet our secretariat!</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="mt-12 sm:mt-[8.75rem]">
        <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[2.5rem]">
          Testimonials
        </p>
        <div className="flex items-center w-full justify-start mt-8 sm:mt-[3.75rem] overflow-x-scroll">
          {data.testimonials.map((item) => {
            return (
              <Card
                key={item.id}
                name={item.name}
                designation={item.designation}
                review={item.review}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
