import { type NextPage } from "next";

import DegreeNavbar from "../../components/DegreeNavbar";
import Review from "../../components/Review";

const DegreeHome: NextPage = () => {
  const sample = {
    course: "BE 0000",
    pros: "Lorem ipsum dolor sit amet, consectetur adip",
    cons: "Lorem ipsum dolor sit amet, consectetur adip"
  }

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <DegreeNavbar />
      <main>
        <div 
          className="h-80 mt-8 mx-auto relative items-center justify-center flex 
          border w-2/3 rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute flex flex-col gap-2 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Computer Science</h1>
            <p className="text-xl md:text-3xl">Reviews</p>
          </section>
        </div>
        <section className="mt-8">
          <div className="mt-8 flex flex-col items-center align-middle justify-center gap-10">
            <Review course={sample.course} pros={sample.pros} cons={sample.cons}/>
            <Review course={sample.course} pros={sample.pros} cons={sample.cons}/>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DegreeHome;