// Disable NextAuth for now to fix build issues
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Auth endpoint temporarily disabled for maintenance' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  return new Response(JSON.stringify({ message: 'Auth endpoint temporarily disabled for maintenance' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';