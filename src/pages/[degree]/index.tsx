import { type NextPage } from "next";
import DegreeNavbar from "../../components/DegreeNavbar";

const DegreeHome: NextPage = () => {
  return (
    <main>
      <div className="w-screen h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
        <DegreeNavbar />
        <div 
          className="h-1/3 mt-8 mx-auto relative items-center justify-center flex 
          border w-2/3 rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute flex flex-col gap-2 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Computer Science</h1>
            <p className="text-lg md:text-xl">Apart of the College of Engineering at Wayne State University</p>
          </section>
        </div>
        <section className="mt-8">
          <h1 className="text-white text-xl text-center font-bold">More Info...</h1>
          <div className="mt-8 flex flex-col md:flex-row items-center align-middle justify-center gap-16">
            <article className="w-80 h-80 p-4 border bg-gradient-to-b from-rose-100 to-teal-100 rounded-xl shadow-2xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-center font-bold">Information about the University</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi suscipit voluptatem natus!
                  Eum, deleniti fugit. Illo veniam laborum distinctio placeat fugiat temporibus molestiae, quis 
                  voluptates soluta debitis cupiditate neque!
                </p>
              </div>
            </article>
            <article className="w-80 h-80 p-4 border bg-gradient-to-b from-rose-100 to-teal-100 rounded-xl shadow-2xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-center font-bold">Information about the University</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi suscipit voluptatem natus!
                  Eum, deleniti fugit. Illo veniam laborum distinctio placeat fugiat temporibus molestiae, quis 
                  voluptates soluta debitis cupiditate neque!
                </p>
              </div>
            </article>
            <article className="w-80 h-80 p-4 border bg-gradient-to-b from-rose-100 to-teal-100 rounded-xl shadow-2xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-center font-bold">Information about the University</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quasi suscipit voluptatem natus!
                  Eum, deleniti fugit. Illo veniam laborum distinctio placeat fugiat temporibus molestiae, quis 
                  voluptates soluta debitis cupiditate neque!
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DegreeHome;