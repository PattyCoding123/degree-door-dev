import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

import useClickOutside from "../../../utils/useOutsideClick";
import { Button } from "../../Buttons";
import { type ProfileDisplayProps } from "../../forms/ProfileDisplay";
import Modal from "../Modal";

interface EditProfileDialogProps extends ProfileDisplayProps {
  closeModal: () => void;
  show: boolean;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  show,
  closeModal,
  displayName,
  email,
  status,
  about,
}) => {
  const ref = useClickOutside(() => closeModal());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileDisplayProps>();

  const onSubmit2 = handleSubmit(async (data) => {
    //
  });

  return (
    <>
      {show && (
        <Modal>
          <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75">
            <div
              ref={ref}
              className="flex h-full w-full flex-col items-center justify-center"
            >
              <form
                className="mx-auto grid grid-cols-2 rounded-lg border border-gray-300 bg-white p-6 shadow-2xl"
                onSubmit={onSubmit2}
              >
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
                      {...register("displayName")}
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
                      id="email"
                      className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 
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
                    {...register("status")}
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
                    {...register("about")}
                  />
                </div>
                <div className="col-span-2 mt-2 flex justify-end gap-4 px-4">
                  <Button type="button" disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

// const ErrorMessage = (props: { message: string | undefined }) => {
//   const { message } = props;
//   return (
//     <div
//       className="absolute mt-2 flex items-center gap-2 text-sm text-red-700"
//       role="alert"
//     >
//       <div className="text-lg">
//         <BiError />
//       </div>
//       <p className="font-medium">{message}</p>
//     </div>
//   );
// };

export default EditProfileDialog;
