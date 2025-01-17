import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // If email is provided, fetch for specific user
        if (req.query.email) {
            const userEmail = req.query.email;
            const payments = await prisma.payment.findMany({
                where: {
                    user: {
                        email: userEmail
                    }
                },
                select: {
                    id: true,
                    ticketType: true,
                    amount: true,
                    status: true,
                    imageUrl: true,
                    createdAt: true,
                    idCardUrl: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return res.status(200).json({ success: true, payments });
        }

        // If no email, fetch all payments (for admin panel)
        const payments = await prisma.payment.findMany({
            select: {
                id: true,
                ticketType: true,
                amount: true,
                status: true,
                imageUrl: true,
                createdAt: true,
                idCardUrl: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        );

        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('Payment fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch payments' });
    }
}