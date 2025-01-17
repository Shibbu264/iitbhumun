import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const registrations = await prisma.registration.findMany({
      select: {
        id: true,
        emailId: true,
        name: true,
        mobileNumber: true,
        committees: true,
        countryPreferences: true,
        instituteName: true,
        alloted: true,
        allotmentApproved: true,
      }
    });
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
}