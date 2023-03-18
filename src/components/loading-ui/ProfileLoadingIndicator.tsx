const ProfileLoadingIndicator = () => {
  return (
    <>
      <div className="h-full w-full p-4">
        <div
          className="relative mx-auto grid animate-pulse grid-cols-2 
          rounded-lg border border-gray-300 bg-white p-8 shadow-2xl"
        >
          <div className="col-span-2 mb-4 grid h-full w-full grid-cols-2">
            <div className="col-span-1 px-4">
              <p className="font-bold text-gray-900">Display Name</p>
              <p
                id="displayName"
                className="mt-2 h-[2.625rem] w-full rounded-lg border border-gray-400
              bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
              />
            </div>
            <div className="col-span-1 px-4">
              <p className="font-bold text-gray-900">Email Address</p>
              <p
                id="email"
                className="mt-2 h-[2.625rem] w-full rounded-lg border border-gray-400 
              bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
              />
            </div>
          </div>
          <div className="col-span-1 mb-4 px-4">
            <p className="font-bold text-gray-900">Status</p>
            <p
              id="email"
              className="mt-2 h-[2.625rem] w-full rounded-lg border border-gray-400 
            bg-slate-50 p-2 text-gray-900 outline-none duration-300 hover:shadow-2xl"
            />
          </div>
          <div className="col-span-2 px-4">
            <p className="font-bold text-gray-900">About Me</p>
            <p
              id="about"
              className="mt-2 h-40 w-full rounded-lg 
              border border-gray-400 bg-slate-50 p-2 text-gray-900 
              outline-none duration-300 hover:shadow-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLoadingIndicator;
