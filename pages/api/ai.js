import {  OpenAI } from 'openai';
const apiKey = process.env.OPENAIKEY;
const openai = new OpenAI({apiKey});
import Cors from 'cors';


export default async function handler(req, res) {
 

  if (req.method === 'POST') {
    // Ensure you have your OpenAI API key in a secure way, e.g., through environment variables
    

    // Initialize the OpenAI configuration
   

    // Initialize the OpenAI API
  
    try {
      // Assuming you're sending a POST request with a 'prompt' in the request body
      const { prompt } = req.body;

      // Make a request to the OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
       messages:[{"role":"user","content":`"questions": [
        ${prompt}
        if the above prompt  contains words like (MUN,IIT BHU MUN,secreteriat, teams,members,Who are you etc) then read the below text else answer the prompt according to your brain
        
        the below text is with respect to iit bhu mun 
        {Birthday today-Chetan Chavan,Secretary-General IIT BHU MUN
          I am IIT BHU MUN BOT,I am a part of IIT BHU MUN Secreteriat and team.I answer queries related to IIT BHU MUN.
       
          website: iitbhumun.com
        
          Accomodation charges-999 perday
        delegate registration fee
        1599 for outstation 
        599 for IIT BHU students
        1099 for BHU students
         
        "question": "Who can register?",
          "ans": "Anyone undergoing formal education is eligible."
        },
        {
         
          "question": " Is there an age restriction for a delegate?",
          "ans": "Yes, you should be 15 years or older."
        },
        {
          
          "question": "Do I need prior experience to register?",
          "ans": "No prior experience is necessary to register for the conference."
        },
        {
         
          "question": "What committees are being simulated?",
          "ans": "AIPPM, JPC, UNFCCC, UNHRC, UNCSW and G20  alongside the International Press."
        },
        {
         
          "question": "Is prior experience needed for any of the committees?",
          "ans": "Delegates with prior MUN experience will be given preference for the Crisis Committee. No prior experience is required for the other committees."
        },
        {
         
          "question": "For how many committees can one apply?",
          "ans": "Can apply to maximum 3 choices for committee preference."
        },
        {
          
          "question": "When is the conference?",
          "ans": "The Conference will be held between 29 September-1 October 2023. Save the date!"
        },
        {
         
          "question": "How will the conference be conducted?",
          "ans": "IITBHU MUN 2023 will be conducted offline at the IIT(BHU) Varanasi campus."
        },
        {
          
          "question": " What will be the accommodation arrangements for delegates?",
          "ans": "Students would be provided with accomodation in nearby hotels. Details will be released soon. "
        },
        {
         
          "question": " What is the dress code for the conference?",
          "ans": "Formal attire is strongly recommended but not required."
        }
      ],
      "senior secretariat IIT BHU MUN": [
        {
          "name": "Chetan Chavan",(birthday today)
          "position": "Secretary-General IIT BHU MUN",
          
        },
        { 
          "name": "Satwik Trivedi",
          "position": "Director-General IIT BHU MUN", 
        },
        {
          "id": 3,
          "name": "Abhishek Dwivedi",
          "position": "Public Relations Head IIT BHU MUN",
          
        },
        {
          "id": 4,
          "name": "Aastha Ojha",
          "position": "Head of Committee Affairs IIT BHU MUN",
         
        },
        {
          "id": 5,
          "name": "Shreeyam Saklecha",
          "position": "Head of Social Media Management IIT BHU MUN",
        },
        {
          "id": 6,
          "name": "Swaralee Nagwanshi",
          "position": "Head of Creative Affairs",
        },    
      ],
     
      "vertical": [
        {
          "id": 1,
          "vertical": "Publicity team iit bhu mun",
          "member1": "Rachit",
          "member2": "Shivansh",
          "member3": "Mridul",
          "member4": "Bhavesh",
          "member5": "Aditya",
          "member6": "Virat",
          "member7": "Arushi",
          "member8": "Shivansh",
          "img":"/images/3.svg"
        },
        {
          "id": 1,
          "vertical": "Committee Affairs team iit bhu mun",
          "member1": "Mayank",
          "member2": "Kanishk",
          "member3": "Aishi",
          "member4": "Ron",
          "member5": "Aarya",
          "member6": "Arnipa",
          "member7": "Satyam",
          "img":"/images/7.svg"
          
    
        },
        {
          "id": 1,
          "vertical": "Tech team iit bhu mun",
          "member1": "Shivanshu",
          "member2": "Chaitanya",
          "img":"/images/4.svg"
         
        },
        {
          "id": 1,
          "vertical": "Creative Team team iit bhu mun",
       
          "member1": "Ricktho",
         
          "member2": "Ranya",
        
          "member3": "Hemanth",
          "member4": "Anjali",
          "img":"/images/undraw_content_team_re_6rlg.svg"
          
          
        },
        {
          "id": 1,
          "vertical": "Public Relations team iit bhu mun",
          "member1": "Pulkit",
          "member2": "Siddhi ",
          "member3": "Naini",
          "img":"/images/2.svg"
        },
        {
          "id": 1,
          "vertical": "Marketing team iit bhu mun",
          "member1": "Tilak",
        
          "member2": "Smarth",
          "member3": "Agrim",
          "member4": "Jatin",
      
          "member5": "Aarushi",
          "img":"/images/undraw_savings_re_eq4w.svg"
    
        },
       
        {
          "id": 1,
          "vertical": "Hospitality & Logistics team iit bhu mun",
          "member1": "Rachit",
          "member2": "Shivansh",
          "img":"/images/5.svg"
          
        }read this and answer the question that is in next line.
        `}],
       max_tokens:90
      });

      // Return the response from the OpenAI API
      res.status(200).json({ botResponse: response.choices[0].message.content });
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      res.status(500).json({ error: 'An error occurred while fetching data from OpenAI.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
