import { type NextPage } from "next";
import HomeNavbar from "../components/HomeNavbar";

const Profile : NextPage = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <HomeNavbar />
      <div className="p-8 mt-10">
        <main>
          <section 
            className="bg-gradient-to-b from-rose-100 to-teal-100 rounded-md p-8
            flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" 
                alt="profile avatar"
              />
              <h1 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">First Name Last Name</h1>
            </div>
            <div className="w-full h-full mt-8">
              <form className="p-8 w-2/3 mx-auto bg-white shadow-xl rounded-lg border border-red-500 grid grid-cols-2">
                <div className="w-full h-full col-span-2 grid grid-cols-2 mb-4">
                  <div className="col-span-1 px-4">
                    <label className="text-gray-900 font-bold" htmlFor="name">Display Name</label>
                    <input 
                      type="text" 
                      name="displayName" 
                      value="displayName" 
                      id="displayName"
                      className="mt-2 bg-slate-50 border border-gray-400 text-gray-900 rounded-lg w-full p-2 outline-none
                      hover:shadow-2xl duration-300"
                      />
                  </div>
                  <div className="col-span-1 px-4">
                    <label className="text-gray-900 font-bold" htmlFor="email">Email Address</label>
                    <input 
                      type="text" 
                      name="email" 
                      value="email" 
                      id="email"
                      className="mt-2 bg-slate-50 border border-gray-400 text-gray-900 rounded-lg w-full p-2 outline-none
                      hover:shadow-2xl duration-300"
                      />
                  </div>
                </div>
                <div className="col-span-1 px-4 mb-4">
                  <label htmlFor="status" className="text-gray-900 font-bold">Status</label>
                    <select 
                      id="status"
                      name="status"
                      className="mt-2 bg-slate-50 border border-gray-400 text-gray-900 rounded-lg w-full p-2 outline-none
                      hover:shadow-2xl duration-300"
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
                  <label htmlFor="about" className="text-gray-900 font-bold">About Me</label>
                  <textarea  
                    name="about" 
                    value="about" 
                    id="about"
                    className="mt-2 bg-slate-50 border border-gray-400 text-gray-900 rounded-lg w-full p-2 outline-none
                    hover:shadow-2xl duration-300"
                  />
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Profile;