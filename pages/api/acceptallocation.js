import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { registrationId } = req.body;

        if (!registrationId) {
            return res.status(400).json({ message: 'Registration ID is required' });
        }

        // Convert registrationId to number if it's a string
        const id = parseInt(registrationId, 10);

        const updatedRegistration = await prisma.registration.update({
            where: {
                id: id
            },
            data: {
                allotmentApproved: true
            }
        });

        return res.status(200).json(updatedRegistration);
    } catch (error) {
        console.error('Error in acceptallocation:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
}