import { cookies } from "next/headers";

export async function DELETE() {
  const cookie = await cookies();
  cookie.delete("jwt");
  return new Response(null, { status: 200 });
}
