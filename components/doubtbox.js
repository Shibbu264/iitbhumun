import Link from "next/link";
import React, { useState,useEffect } from "react";
import axios from "axios";
const Doubtbox = () => {
  const [doubt, setDoubt] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setDoubt(e.target.value);
    // e.target.style.height = "auto";
    // e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const OPENAI_API_KEY = process.env.OPENAIKEY; // Replace with your OpenAI API key
  useEffect(() => {
    if (isLoading) {
      // Replace 'yourDivId' with the actual ID or reference of the div you want to scroll to
      const element = document.getElementById('yourDivId');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isLoading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/ai', {
        'model': 'text-davinci-003',
        'prompt': doubt,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });
  
      
      if (response.status === 200) {
        const botResponse = response.data.botResponse;
        setBotResponse(botResponse);
        
        // Add the user's input and bot's response to the messages array
        setMessages([...messages, { role: 'user', content: doubt }, { role: 'bot', content: botResponse }]);
        setIsLoading(false);
        setDoubt('');
      } else {
        setIsLoading(false);
        setMessages([...messages, { role: 'user', content: doubt }, { role: 'bot', content: 'Failed to get a response from the server.' }]);
      }
    } catch (error) {
      setIsLoading(false);
      setMessages([...messages, { role: 'user', content: doubt }, { role: 'bot', content: 'Failed to get a response from the server.' }]);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setDoubt("");
    setBotResponse("");
  };

  return (
    <div id="titu99" className="fixed bottom-4 right-4">
    {isExpanded ? (
      <div className="bg-gray-100 max-w-2xl w-96 z-30 min-h-96 absolute l-0  bottom-0 right-0 px-4 py-2 border-2 border-black rounded-2xl shadow">
        <div className="flex">
         
 <div>
                  <Link href="https://www.linkedin.com/company/iitbhumun/?originalSubdomain=in " >
<button className="cursor:pointer">
                      <img src="https://img.freepik.com/free-icon/linkedin_318-157468.jpg?size=626&ext=jpg&ga=GA1.1.353350214.1689486593&semt=sph" className="w-12 h-12 rounded-full hover:w-14 hover:h-14 px-1 my-2  transition-all"/>
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href="https://twitter.com/iitbhu_mun">
                    <button>
                    
  <img src="https://img.freepik.com/free-icon/twitter_318-187597.jpg?size=626&ext=jpg&ga=GA1.1.353350214.1689486593&semt=sph" className="w-12 h-12 rounded-full hover:w-14 hover:h-14 px-1 my-2 transition-all"/>
                    </button></Link>
                </div> <div>
                  <Link href="https://www.instagram.com/iitbhu_mun/?hl=en">
<button className="cursor:pointer mb-2">
                      <img src="https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg?size=626&ext=jpg&ga=GA1.1.353350214.1689486593&semt=ais" className="w-14 h-14 hover:w-14 hover:h-14 px-1 my-2 transition-all"/>
                    </button>
                  </Link>
                </div>
               <div >
                    <Link href="https://discord.gg/5VJPdtaX2G">
  <button className="cursor:pointer">
  <img src="https://img.freepik.com/free-icon/discord_318-688926.jpg?size=626&ext=jpg&ga=GA1.1.353350214.1689486593&semt=ais"className="w-12 h-12 rounded-full hover:w-14 hover:h-14 px-1 my-2 transition-all"/>
                      
                      </button>
                    </Link>
                  </div>
              





          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 hover:text-red-500 p-1"
              onClick={handleCollapse}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="font-bold text-lg text-blue-500 mb-4">Chat with me!</h1>
        {/* ... Rest of your code */}
        <form onSubmit={handleSubmit}>
  <textarea
    className="min-w-64 h-32 text-xl peer sm:w-80  rounded-lg  leading-[1.6] outline-none transition-all duration-200 ease-linear py-4    text-black border-2 placeholder-red-500 border-black   p-2 mb-4 focus:outline-none focus:border-blue-400"
    placeholder="Enter your doubts here..."
    value={doubt}
    onChange={handleInputChange}
    rows="1" // Set this to 1 initially
  style={{ width: '100%' }} // Add this style
  />
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      type="button"
      onClick={handleCollapse}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      Ask!
    </button>
  </div>
</form>

        {/* Display bot response */}
        <div className="mt-4 max-h-96 overflow-y-auto ">
          <h1 className="mb-2 font-bold text-blue-500">Chat:</h1>
          <ul>
            {messages.map((message, index) => (
              <>
              <li
              key={index}
              className={message.role === "user" ? "text-[#113C48] my-3 text-lg font-semibold  " : "text-[#189BA5] my-3 text-lg font-bold " }
              style={{ maxWidth: "80%", wordWrap: "break-word" }}
            >
                {message.content}
              </li>
              <hr className="my-2 border-red-300" />
              
              </>
            ))}
            {isLoading ? (
  <div className="flex items-center justify-center">
    <div id="yourDivId" className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  </div>
) : (
  <></>
)}
          </ul>
        </div>
      </div>
   ) : (
    <button
      className="bg-center bg-no-repeat bg-cover text-white px-4 w-20 h-20 py-2 rounded-full shake-and-rotate transition duration-300 ease-in-out"
      style={{ backgroundImage: 'url("/images/emoji.png")' }}
      onClick={handleExpand}
    ></button>
  )}
</div>
);
};

export default Doubtbox;
