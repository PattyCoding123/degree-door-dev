const HeroBanner: React.FC = () => {
  return (
    <header className="text-center w-auto mx-auto mb-8 relative p-8 flex flex-col gap-8 items-center bg-gradient-to-r from-blue-600 to-violet-600">
      <h1 className="text-4xl">Welcome to Degree Door</h1>
      <p className="w-2/5">
        A collaborative space allowing students and faculty to share their experiences
        with upcoming students. Providing information on courses, degrees, and work loads
        in a forum like style allowing access to important information.
      </p>
      <button type="button" className="inline-block px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium 
        text-xs leading-tight uppercase rounded shadow-md hover:opacity-80 hover:shadow-lg focus:bg-violet-700 hover:scale-90
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-200
        ease-in-out"
      >
        Learn More
      </button>
    </header>
  );
}

export default HeroBanner;