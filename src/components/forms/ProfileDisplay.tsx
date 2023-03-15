import { BsFillPencilFill } from "react-icons/bs";
import { type UserProfile } from "../../types/user-profile";

export interface ProfileDisplayProps {
  userProfile: UserProfile;
  openEditForm: () => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  userProfile,
  openEditForm,
}) => {
  const { displayName, email, status, about } = userProfile;
  return (
    <div className="h-full w-full p-4">
      <form className="relative mx-auto grid grid-cols-2 rounded-lg border border-gray-300 bg-white p-8 shadow-2xl">
        <button id="cancel-profile-edit" type="button" onClick={openEditForm}>
          <BsFillPencilFill className="absolute top-3 right-3 text-2xl text-gray-500 active:text-gray-800" />
        </button>
        <div className="col-span-2 mb-4 grid h-full w-full grid-cols-2">
          <div className="col-span-1 px-4">
            <label className="font-bold text-gray-900" htmlFor="name">
              Display Name
            </label>
            <input
              readOnly={true}
              disabled={true}
              type="text"
              name="displayName"
              value={displayName ?? "Degree Door User"}
              id="displayName"
              className="mt-2 w-full rounded-lg border border-gray-400 
              bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
            />
          </div>
          <div className="col-span-1 px-4">
            <label className="font-bold text-gray-900" htmlFor="email">
              Email Address
            </label>
            <input
              readOnly={true}
              disabled={true}
              type="text"
              name="email"
              value={email ?? ""}
              id="email"
              className="mt-2 w-full rounded-lg border border-gray-400 
              bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
            />
          </div>
        </div>
        <div className="col-span-1 mb-4 px-4">
          <label htmlFor="status" className="font-bold text-gray-900">
            Status
          </label>
          <input
            disabled={true}
            readOnly={true}
            type="text"
            name="email"
            value={status ?? "Upcoming Student"}
            id="email"
            className="mt-2 w-full rounded-lg border border-gray-400 
            bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
          />
        </div>
        <div className="col-span-2 px-4">
          <label htmlFor="about" className="font-bold text-gray-900">
            About Me
          </label>
          <textarea
            disabled={true}
            readOnly={true}
            value={about ?? ""}
            name="about"
            id="about"
            className="mt-2 h-40 w-full resize-none rounded-lg 
            border border-gray-400 bg-slate-50 p-2 text-gray-900 
            outline-none duration-300 hover:shadow-2xl"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileDisplay;
