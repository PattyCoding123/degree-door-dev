import { signOut } from "next-auth/react";
import { trpc } from "../trpc";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const deleteUser = trpc.auth.deleteUser.useMutation({
    onSuccess: () => {
      signOut(); // Sign out the user on successful account deletion.
    },
    onError: () => {
      // Notify error
      toast.error("There was an error deleting your account!", {
        position: "bottom-center",
        className: "text-xl",
      });
    },
  });

  return deleteUser;
};

export default useDeleteUser;
