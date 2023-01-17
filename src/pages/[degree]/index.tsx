import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { trpc } from "../../utils/trpc";
import DegreeNavbar from "../../components/DegreeNavbar";

const DegreeHome: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query as { degree: string };
  const degreeQuery = trpc.forum.getDegreeInfo.useQuery({ degreeId: degree }, { enabled: false });

  useEffect(() => {
    if (!router.isReady) return;
    degreeQuery.refetch();
  }, [router.isReady])

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <DegreeNavbar active="overview" degreeName={degreeQuery.data?.name!} degreeId={degreeQuery.data?.id!} />
      <main className="p-8">
        <div 
          className="h-80 mt-8 mx-auto relative border w-2/3 
          rounded-xl shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
        >
          <section className="absolute inset-0 flex flex-col justify-center gap-2 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">{degreeQuery.data?.name}</h1>
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
      </main>
    </div>
  );
}

export default DegreeHome;