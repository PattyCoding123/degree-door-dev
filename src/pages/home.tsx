import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="bg-tokyo-night text-white h-screen w-screen flex items-center justify-center">
      <section className="max-w-md rounded-lg shadow-xl p-6">
        <p className="text-tokyo-night">Hello, this is my home page.</p>
      </section>
    </main>
  );

}

export default Home;