import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    // Debug session
    console.log('Session data:', session);

    if (!session) {
      return res.status(401).json({ message: 'Please sign in to continue' });
    }

    const { ticketType, amount, imageUrl,idCardUrl } = req.body;

    // Debug request data
    console.log('Payment request:', { ticketType, amount, imageUrl });

    // Validate all required fields
    if (!ticketType) {
      return res.status(400).json({ message: 'Ticket type is required' });
    }
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }
    if (!imageUrl) {
      return res.status(400).json({ message: 'Payment proof image is required' });
    }

    //validate id card required
    if (['iitbhu', 'bhu'].includes(ticketType) && !idCardUrl) {
        return res.status(400).json({ message: 'ID card is required for IIT BHU and BHU students' });
      }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        ticketType: ticketType,
        amount: parseFloat(amount),
        imageUrl: imageUrl,
        idCardUrl: idCardUrl || '',
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    // Return success response
    return res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        ticketType: payment.ticketType,
        amount: payment.amount,
        status: payment.status,
        imageUrl: payment.imageUrl,
        idCardUrl: payment.idCardUrl,
        createdAt: payment.createdAt,
        user: payment.user
      }
    });

  } catch (error) {
    // Log the full error for debugging
    console.error('Payment creation error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });

    // Return appropriate error message
    return res.status(500).json({ 
      message: 'Failed to create payment record',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}