import { prisma } from '../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (req.method === 'GET') {
        try {
          const registration = await prisma.registration.findFirst({
            where: {
              emailId: session.user.email
            },
            orderBy: {
              id: 'desc' // Get the most recent registration if multiple exist
            }
          });
    
          if (!registration) {
            return res.status(404).json({ message: 'No registration found' });
          }
    
          return res.status(200).json(registration);
        } catch (error) {
          console.error('Error fetching registration:', error);
          return res.status(500).json({ message: 'Failed to fetch registration', error: error.message });
        }
      }
  else if (req.method == 'POST') {
  try {
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const registrationData = req.body;
    const existingRegistration = await prisma.registration.findFirst({
        where: {
          emailId: registrationData.Email_ID
        }
      });

      if (existingRegistration) {
        return res.status(409).json({ 
          message: 'A registration with this email already exists' 
        });
      }
    const registration = await prisma.registration.create({
      data: {
        eventId: registrationData.Event_ID,
        name: registrationData.Name,
        age: registrationData.Age,
        gender: registrationData.Gender,
        city: registrationData.City,
        country: registrationData.Country,
        instituteName: registrationData.Institute_Name,
        mobileNumber: registrationData.Mobile_Number,
        emailId: registrationData.Email_ID,
        numberOfMUNs: registrationData.No_of_MUNs,
        awardsInPreviousMUNs: registrationData.Awards_in_previous_MUNs,
        committees: registrationData.committees,
        countryPreferences: registrationData.countryPreferences,
        referralCode: registrationData.Referral_Code,
        alloted:{
          set:[]
        },
        paymentDone:false
      },
    });

    if (session.user.email) {
        await prisma.User.update({
            where: { email: session.user.email },
            data: { name: registrationData.Name,
                formFilled:true
             },
          });
    }

   return res.status(200).json(registration);
  } 
  catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}
// ... existing code ...

else if (req.method === 'PUT') {
    try {

      
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const updateData = req.body;
      // Remove email from update data to prevent email changes
      const { Email_ID, emailId, ...updateFields } = updateData;

      const registration = await prisma.registration.update({
        where: {
          emailId: session.user.email
        },
        data: {
          eventId: updateFields.Event_ID,
          name: updateFields.name,
          age: updateFields.age,
          gender: updateFields.gender,
          city: updateFields.city,
          country: updateFields.country,
          instituteName: updateFields.instituteName,
          mobileNumber: updateFields.mobileNumber,
          numberOfMUNs: updateFields.numberOfMUNs,
          awardsInPreviousMUNs: updateFields.awardsInPreviousMUNs,
          committees: updateFields.committees,
          countryPreferences: updateFields.countryPreferences,
          referralCode: updateFields.referralCode,
        },
      });

      // Update user name if it has changed
      if (updateFields.Name && session.user.email) {
        await prisma.User.update({
          where: { email: session.user.email },
          data: { name: updateFields.Name },
        });
      }

      return res.status(200).json(registration);
    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({ message: 'Update failed', error: error.message });
    }
  }
}