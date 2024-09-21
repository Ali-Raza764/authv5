import { auth } from "@/auth";
import UpdateUserInfo from "@/components/UpdateUserInfo";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return (
      <main>
        <Link href={"/auth/signin"}>signIn page</Link>
      </main>
    );
  }
  return (
    <main>
      name: {session.user.name}
      <UpdateUserInfo />
    </main>
  );
}
