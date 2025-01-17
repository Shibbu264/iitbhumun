import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { paymentId, status } = req.body;

        if (!paymentId || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Start a transaction to update both payment and registration
        const updatedPayment = await prisma.$transaction(async (prisma) => {
            // 1. First update the payment status
            const payment = await prisma.payment.update({
                where: {
                    id: paymentId
                },
                data: {
                    status
                },
                include: {
                    user: true // Include user to get their email
                }
            });

            // 2. If payment is verified, update the registration's paymentDone field
            if (status === 'verified') {
                await prisma.registration.update({
                    where: {
                        emailId: payment.user.email
                    },
                    data: {
                        paymentDone: true
                    }
                });
            } else if (status === 'rejected') {
                // If payment is rejected, set paymentDone to false
                await prisma.registration.update({
                    where: {
                        emailId: payment.user.email
                    },
                    data: {
                        paymentDone: false
                    }
                });
            }

            return payment;
        });

        res.status(200).json({ 
            success: true, 
            payment: updatedPayment,
            message: `Payment ${status} successfully`
        });

    } catch (error) {
        console.error('Payment update error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update payment status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}