import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const allocations = await prisma.registration.findMany({
      select: {
        id: true,
        alloted: true
      }
    });
    
    // Create a map of allocated countries by committee
    const allocatedCountries = {};
    allocations
      .filter(reg => reg.alloted && reg.alloted.length > 0)
      .forEach(registration => {
        const [committee, country] = registration.alloted[0].split(':');
        if (!allocatedCountries[committee]) {
          allocatedCountries[committee] = [];
        }
        allocatedCountries[committee].push(country);
      });

    res.status(200).json(allocatedCountries);
  } catch (error) {
    console.error('Error fetching allocations:', error);
    res.status(500).json({ message: 'Error fetching allocations' });
  }
}