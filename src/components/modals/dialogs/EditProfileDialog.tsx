import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
import toast from "react-hot-toast";

import { type UserProfile } from "../../../types/user-profile";
import { Button } from "../../Buttons";
import { trpc } from "../../../utils/trpc";
import Modal from "../Modal";

interface EditProfileDialogProps {
  userProfile: UserProfile;
  closeEditForm: () => void;
  show: boolean;
}

// The following component renders a modal form that will allow user to edit certain
// pieces of their profile information.
// ! email is left as disabled for now
const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  userProfile,
  show,
  closeEditForm,
}) => {
  const router = useRouter(); // Get Router

  const utils = trpc.useContext(); // Get trpc context

  // Destructure properties from useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    // Default values to pass into the submit function.
    defaultValues: useMemo(
      () => ({
        displayName: userProfile.displayName ?? "",
        status: userProfile.status ?? "Upcoming Student",
        about: userProfile.about ?? "",
      }),
      [userProfile]
    ),
  });

  // Set the default values in case userProfile changes
  const editProfile = trpc.auth.editProfile.useMutation({
    // * Reset the form, closeModal, and make a toast
    onSuccess: () => {
      utils.auth.getSession.invalidate();
      closeEditForm();
      toast.success("Changes were saved!", {
        position: "bottom-center",
        className: "text-xl",
      });
    },
    // ! Don't close the form in case user needs to try again.
    onError: () => {
      toast.error("There was a problem changing your settings!", {
        position: "bottom-center",
        className: "text-xl",
      });
    },
  });

  // ! Update form fields with update profile information
  useEffect(() => {
    reset({
      displayName: userProfile.displayName ?? "",
      status: userProfile.status ?? "Upcoming Student",
      about: userProfile.about ?? "",
    });
  }, [userProfile, reset]);

  const onSubmit2 = handleSubmit((data) => {
    // Call mutation procedure for editing profile
    editProfile.mutate({
      formData: data,
      urlUserId: router.query.userId as string,
    });
  });

  return (
    <>
      {show && (
        <Modal>
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <form
              id="edit-profile-form"
              className="relative mx-auto grid 
              grid-cols-2 rounded-lg border border-gray-300 bg-white p-6 shadow-2xl"
              onSubmit={onSubmit2}
            >
              <button
                id="cancel-profile-edit"
                type="button"
                onClick={() => {
                  // Reset form and close the modal if cancel button is clicked.
                  reset();
                  closeEditForm();
                }}
              >
                <MdOutlineCancel className="absolute top-3 right-3 text-2xl text-gray-500 active:text-gray-800" />
              </button>
              <div className="col-span-2 mb-4 grid h-full w-full grid-cols-2">
                <div className="col-span-1 px-4">
                  <label className="font-bold text-gray-900" htmlFor="name">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2
                      text-gray-900 outline-none duration-300 hover:shadow-2xl"
                    disabled={isSubmitting}
                    {...register("displayName", {
                      validate: (value) => {
                        value.trim(); // Don't allow whitespace
                        return true;
                      },
                    })}
                  />
                </div>
                <div className="col-span-1 px-4">
                  <label className="font-bold text-gray-900" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    readOnly={true}
                    type="text"
                    name="email"
                    value={userProfile.email ?? ""}
                    id="email"
                    className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-200 p-2 
                      text-gray-900 outline-none duration-300 hover:shadow-2xl"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-span-1 mb-4 px-4">
                <label htmlFor="status" className="font-bold text-gray-900">
                  Status
                </label>
                <select
                  id="status"
                  className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 
                    text-gray-900 outline-none duration-300 hover:shadow-2xl"
                  disabled={isSubmitting}
                  {...register("status", { required: true })}
                >
                  <option value="Upcoming Student">Upcoming Student</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Professor">Professor</option>
                </select>
              </div>
              <div className="col-span-2 px-4">
                <label htmlFor="about" className="font-bold text-gray-900">
                  About Me
                </label>
                <textarea
                  id="about"
                  className="mt-2 min-h-[10rem] w-full resize-none rounded-lg border border-gray-400 
                    bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
                  {...register("about", {
                    validate: (value) => {
                      value.trim(); // Don't allow whitespace
                      return true;
                    },
                  })}
                />
              </div>
              <div className="col-span-2 mt-2 flex justify-end gap-4 px-4">
                <Button
                  type="submit"
                  className="bg-green-600"
                  disabled={
                    isSubmitting || typeof router.query.userId !== "string"
                  }
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditProfileDialog;
