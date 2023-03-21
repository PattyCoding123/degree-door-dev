import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

import ForumLayout from "../../../components/layouts/ForumLayout";
import { useDegreeQuery } from "../../../utils/custom-hooks";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
// ! Test dynamic loading with long resolve
// const ReviewsDisplay = dynamic(
//   async () => {
//     return new Promise((resolve) => setTimeout(resolve, 2000)).then(
//       () => import("../../../components/containers/ReviewsDisplay")
//     );
//   },
//   { loading: () => <Loading />, ssr: false }
// );

// const ReviewsDisplay = dynamic(
//   () => import("../../../components/containers/ReviewsDisplay"),
//   { loading: () => <Loading />, ssr: false }
// );

// ! Test lazy import
const ReviewsDisplay = lazy(async () => {
  return new Promise((resolve) => setTimeout(resolve, 5000)).then(
    () => import("../../../components/containers/ReviewsDisplay")
  );
});

// const ReviewsDisplay = "../../../components/containers/ReviewsDisplay";
import GeneralLoadingIndicator from "../../../components/loading-ui/GeneralLoadingIndicator";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";

// The Reviews page will render all the reviews for a specific degree forum.
// It will also allow user's to delete reviews if they are the author
const ReviewsPage: NextPage = () => {
  const router = useRouter();
  const { degree } = router.query;

  // Dependent query, will not run unless degree is defined
  // Push to page /404 if degree info is not found
  const degreeQuery = useDegreeQuery(degree);

  return (
    <ForumLayout
      title="Degree Door Forum Reviews"
      description="Degree Door forum reviews page"
      degreeId={degreeQuery.data?.id}
      degreeName={degreeQuery.data?.name}
      active="reviews"
    >
      <Toaster />
      {/* Toaster component for rendering react-hot-toast messages */}

      {/* ! Only render the degrees if the degreeQuery is a success */}
      <main className="relative flex flex-1 flex-col p-8">
        <div
          className="relative mx-auto mt-8 flex h-80 w-2/3 
            flex-col items-center justify-center rounded-xl border bg-primary shadow-2xl"
        >
          <h1 className="text-4xl font-bold md:text-6xl">
            {degreeQuery.data?.name}
          </h1>
          <p className="text-xl md:text-3xl">Reviews</p>
        </div>
        <section className="mt-16 mb-8 flex flex-col items-center justify-center gap-8">
          {degreeQuery.data?.id && (
            // ! In order to successfully use the Suspense options of React-Query,
            // ! you must wrap the component that contains the query in both a suspense
            // ! component and ErrorBoundary component, and you must lazily import the
            // ! component that contains the query
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={({ resetErrorBoundary }) => (
                    <div className="text-3xl text-black">
                      <p className="text-black">There was an error!</p>
                      <button
                        className="bg-slate-400 text-black"
                        onClick={() => resetErrorBoundary()}
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                >
                  <Suspense
                    fallback={[...Array(5).keys()].map((i) => (
                      <ReviewSkeleton key={i} />
                    ))}
                  >
                    <ReviewsDisplay degreeId={degreeQuery.data.id} />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          )}
        </section>
      </main>
    </ForumLayout>
  );
};

export default ReviewsPage;

// const Loading: React.FC = () => {
//   return (
//     <div
//       id="toast-default"
//       className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
//       role="alert"
//     >
//       <div className="inline-flex h-8 w-8 flex-shrink-0 animate-spin items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
//         <svg
//           aria-hidden="true"
//           className="h-5 w-5"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
//             clipRule="evenodd"
//           />
//         </svg>
//         <span className="sr-only">Fire icon</span>
//       </div>
//       <div className="ml-3 text-sm font-normal">Loading the reviews</div>
//       <button
//         type="button"
//         className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
//         data-dismiss-target="#toast-default"
//         aria-label="Close"
//       >
//         <span className="sr-only">Close</span>
//         <svg
//           aria-hidden="true"
//           className="h-5 w-5"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

const ReviewSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex w-2/3 animate-pulse flex-col gap-4 rounded-xl border bg-slate-200 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-lg font-bold" />
        </div>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-green-700 bg-primary p-2">
            <IoMdThumbsUp className="text-lg text-green-700" />
          </div>
          <div className="w-full rounded border-r-4 border-green-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">PROS</h2>
              <p className="text-md text-gray-600" />
            </div>
          </div>
        </section>
        <section className="flex">
          <div className="flex w-16 items-center justify-center rounded border-2 border-red-700 bg-primary p-2">
            <IoMdThumbsDown className="text-lg text-red-700" />
          </div>
          <div className="w-full rounded border-r-4 border-red-700 bg-primary p-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">CONS</h2>
              <p className="text-md text-gray-600" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
