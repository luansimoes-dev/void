import { cookies } from "next/headers";
import { UserType } from "@/types/UserType";

export async function GET() {
  const cookie = await cookies();
  const jwt = cookie.get("jwt");
  if (!jwt) {
    return new Response(null, { status: 401 });
  }
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
    headers: {
      Authorization: `Bearer ${jwt?.value}`,
    },
  });
  if (!user.ok) {
    console.log(user.statusText);
  }
  console.log(jwt);
  const userType: UserType = await user.json();
  userType.jwt = jwt?.value as string;
  console.log(userType);
  return new Response(JSON.stringify(userType), { status: 200 });
}
