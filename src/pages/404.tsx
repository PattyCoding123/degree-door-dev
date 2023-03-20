import type { NextPage } from "next/types";
import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";

// ! Custom 404 page for error handling
const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <Layout
      title="Degree Door - Not Found"
      description="This page does not exist"
    >
      <main className="flex flex-1 items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl">404 - Page Not Found</h1>
          <button
            className="text-2xl hover:text-amber-400 active:text-amber-600"
            onClick={() => router.push("/")}
          >
            Go back to home page
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default Custom404;
