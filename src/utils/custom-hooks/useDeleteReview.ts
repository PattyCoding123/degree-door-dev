import toast from "react-hot-toast";

import { trpc } from "../trpc";

// Custom hook to use the deleteReview mutation procedure
const useDeleteReview = (degree?: string | string[]) => {
  // Get utils from trpc.useContext() for query invalidation
  const utils = trpc.useContext();
  const deleteReview = trpc.forum.deleteReview.useMutation({
    onSuccess: () => {
      // Invalidate queries only for the degree forum from which
      // the degree was deleted from.
      utils.forum.getAllReviews.invalidate({ degreeId: degree as string });
      toast.success("Review successfully deleted!", {
        position: "bottom-center",
        className: "text-xl",
      });
    },
    onError: () =>
      toast.error("There was an error deleting the post!", {
        position: "bottom-center",
        className: "text-xl",
      }),
  });

  return deleteReview;
};

export default useDeleteReview;
