interface ProfileDisplayProps {
  displayName?: string | null;
  email?: string | null;
  status?: string | null;
  about?: string | null;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  displayName,
  email,
  status,
  about,
}) => {
  return (
    <div className="mt-8 h-full w-full p-4">
      <form className="mx-auto grid grid-cols-2 rounded-lg border border-gray-300 bg-white p-8 shadow-2xl">
        <div className="col-span-2 mb-4 grid h-full w-full grid-cols-2">
          <div className="col-span-1 px-4">
            <label className="font-bold text-gray-900" htmlFor="name">
              Display Name
            </label>
            <input
              readOnly={true}
              type="text"
              name="displayName"
              value={displayName ? `${displayName}` : "Degree Door User"}
              id="displayName"
              className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
        duration-300 hover:shadow-2xl"
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
              value={email ? `${email}` : "..."}
              id="email"
              className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
        duration-300 hover:shadow-2xl"
            />
          </div>
        </div>
        <div className="col-span-1 mb-4 px-4">
          <label htmlFor="status" className="font-bold text-gray-900">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-2 w-full rounded-lg border border-gray-400 bg-slate-50 p-2 text-gray-900 outline-none
      duration-300 hover:shadow-2xl"
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
            readOnly={true}
            name="about"
            value="about"
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
