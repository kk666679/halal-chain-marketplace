import { NextResponse } from 'next/server';

/**
 * Process chatbot feedback
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { messageId, feedback, message } = body;
    
    if (!messageId || !feedback) {
      return NextResponse.json(
        { error: 'MessageId and feedback are required' },
        { status: 400 }
      );
    }

    // In a production environment, you would store this feedback in a database
    // and use it to improve the assistant's responses
    console.log(`Feedback received for message ${messageId}: ${feedback}`);
    console.log(`Message content: ${message}`);
    
    // You could also send this feedback to an analytics service or your own API
    
    // Return success response
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chatbot feedback API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}