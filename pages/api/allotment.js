import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { registrationId, committee, country, allotmentString } = req.body;

  try {
    if (country === "Select an option") {
      return res.status(400).json({ 
        message: 'Please select a valid country' 
      });
    }

    // Update the registration with only the new allotment
    await prisma.registration.update({
      where: { id: registrationId },
      data: { 
        alloted: [allotmentString] // Only store the latest allotment
      },
    });

    res.status(200).json({ 
      message: `Country ${country} allotted under committee ${committee} successfully`,
      allotments: [allotmentString]
    });
  } catch (error) {
    console.error('Error allotting country:', error);
    res.status(500).json({ message: 'Error allotting country' });
  }
}