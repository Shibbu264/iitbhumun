export default function Card(props) {
  return (
    <div className="border-[0.125rem] border-[#E84C6D] min-w-[75%] h-[13rem] sm:h-[20rem] sm:min-w-[31%] flex flex-col justify-start items-center mx-4 px-2 sm:px-6 py-6 2xl:px-16 sm:mx-[1.254rem] rounded-lg">
      <p className="font-heading font-bold text-center sm:font-semibold sm:text-[1.5rem] text-[#E84C6D]">
        {props.name}
      </p>
      <p className="sm:mt-[0.625rem] font-custom font-normal text-xs sm:text-[1.125rem] text-[#E84C6D]">
        {props.designation}
      </p>
      <p className="my-4 px-2 sm:px-0 sm:mt-[3.125rem] text-justify font-light font-custom text-xs sm:text-lg overflow-auto sm:overflow-hidden sm:leading-6">
        {props.review}
      </p>
    </div>
  );
}
