import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useUserContext } from "@/hooks/useUserContext";
import { UserType } from "@/context/UserType";
import Link from "next/link";
import useGreet from "@/hooks/useGreet";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  const { user, setUser } = useUserContext();

  const updateName = () => {
    const updatedUser: UserType = {
      ...user,
      name: "Sonu",
    };

    setUser(updatedUser);
  };

  const updateAge = () => {
    const updatedUser: UserType = {
      ...user,
      age: 35,
    };
    setUser(updatedUser);
  };

  const { message, greet } = useGreet();

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="container mt-5">
        <h1>Use Context Demo Example</h1>

        <p>Name: {user.name}</p>

        <p>Age: {user.age}</p>

        <Link href={"/"}>Home</Link>

        <br />
        <br />
        <button className="btn btn-secondary" onClick={updateName}>
          Update Name
        </button>

        <br />
        <br />
        <button className="btn btn-secondary" onClick={updateAge}>
          Update Age
        </button>

        <br />
        <br />

        <p>{message}</p>
        <button
          className="btn btn-secondary"
          onClick={() => greet({ name: "Sonu", greetType: "Hi!" })}
        >
          Update Age
        </button>
      </div>
    </>
  );
}
