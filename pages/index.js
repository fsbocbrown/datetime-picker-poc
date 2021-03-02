import Head from "next/head";
import DateTimePicker from "../components/DateTimePicker";

const Home = () => (
  <div className="bg-gray-200">
    <Head>
      <title>Date/Time Picker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex items-center justify-center h-screen w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96">
        <DateTimePicker />
      </div>
    </main>
  </div>
);

export default Home;
