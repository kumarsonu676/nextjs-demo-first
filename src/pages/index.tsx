import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useUserContext } from "@/hooks/useUserContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useUserContext();

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="container mt-5">
        <div>
          <Link href={"/about"}>Use Context</Link>

          <br />
          <br />

          <p>Name: {user.name}</p>

          <p>Age: {user.age}</p>
        </div>
      </div>
    </>
  );
}
