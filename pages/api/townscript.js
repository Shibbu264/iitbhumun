import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";




// {
//     "userEmailId":"example@email.com",
//     "userName":"John Doe",
//     "currency":"INR",                       // Transaction Currency
//     "ticketName":"Ticket Name",
//     "eventName":"Townscript: Best Event Ticketing Platform",
//     "eventCode":"townscript-best",
//     "ticketPrice":600,
//     "discountCode": "EARLY100",							// NA, if no discount was applied
//     "discountAmount":100,
//     "customQuestion1":"customValue1",				// deprecated, use answerList key
//     "customQuestion20":"customValue20",     // deprecated, use answerList key
//     "answerList":[
//       {
//           "uniqueQuestionId": 111,
//         "question": "Country",
//         "answer": "India"
//       },
//       {
//           "uniqueQuestionId": 222,
//         "question": "Have you been at Taj Mahal?",
//         "answer": "Yes"
//       }
//     ],
//     "uniqueOrderId":"9347234294742974",
//     "registrationTimestamp":"2014-08-22 06:41:27"
//   }

// this is data format









export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    try {
        console.log(req.data)
      const user = await prisma.user.update({
        where: { email: session.user.email },
        update:{
            paymentDone:true
        }
      });
      console.log(user)
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({"message":"Unauthorised"})
    }
  }
