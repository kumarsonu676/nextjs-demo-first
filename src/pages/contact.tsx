import Head from "next/head";
import ContactUs from "@/components/ContactUs";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Dynamic Form Example</title>
      </Head>

      <div className="container mt-5">
        <ContactUs />
      </div>
    </>
  );
}
