// src/app/api/checkout/route.ts

export async function POST() {
  // Minimal test handler: no request body, no imports needed
  return Response.json(
    {
      ok: true,
      message: "Minimal POST checkout working",
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}
