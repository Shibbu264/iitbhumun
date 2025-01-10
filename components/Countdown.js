import Countdown from 'react-countdown';

export default function CountdownElement() {
  const arr = ["DAYS", "HOURS", "MINUTES", "SECOND"]

  
  const renderer = ({ days, hours, minutes, seconds}) => {
    {
      // Render a countdown
      return (
        <div className="grid grid-cols-4 gap-3 lg:gap-5 mt-12 max-w-[90%] lg:max-w-[80%] 2xl:max-w-[60%] mx-auto">
          {[days, hours, minutes, seconds].map((count, index) => (
              <div
                key={count}
                className="p-5 md:py-8 lg:py-10 text-4xl sm:text-5xl md:text-7xl rounded-md text-[#E84C6D] text-center border-[#E84C6D] border-2"
              >
                {count}
                <div className='pt-2 text-heading font-bold text-xs sm:text-xl text-[#E84C6D]'>{arr[index]}</div>
              </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <Countdown date="2025-02-21" renderer={renderer} />
    </div>
  );
}
