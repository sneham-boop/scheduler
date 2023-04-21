import Head from "next/head";
import Application from "@component/components/Application";

export default function Home() {
  return (
    <>
      <Head>
        <title>Interview Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Application />
    </>
  );
}
