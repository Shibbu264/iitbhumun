import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { registrationId } = req.body;

    // First fetch the current registration to get the countryPreferences
    const currentRegistration = await prisma.registration.findUnique({
      where: { id: registrationId }
    });

    if (!currentRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Update the registration
    const updatedRegistration = await prisma.registration.update({
      where: {
        id: registrationId
      },
      data: {
        allotmentApproved: true,
        countryPreferences: {
          ...currentRegistration.countryPreferences,
          pendingRequest: null
        }
      }
    });

    return res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error('Error in acceptallocation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}