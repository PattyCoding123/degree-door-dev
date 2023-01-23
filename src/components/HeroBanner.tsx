import { Button } from "./Buttons";

const HeroBanner: React.FC = () => {
  return (
    <header className="text-center w-auto mx-auto mb-8 relative p-8 flex flex-col gap-8 
      items-center bg-gradient-to-b from-rose-100 to-teal-100 text-black shadow-2xl"
    >
      <h1 className="text-4xl">Welcome to Degree Door</h1>
      <p className="w-2/5">
        A collaborative space allowing students and faculty to share their experiences
        with upcoming students. Providing information on courses, degrees, and work loads
        in a forum like style allowing access to important information.
      </p>
      <Button type="button" className="inline-block px-6 py-2.5 bg-rose-400 text-white font-medium cursor-pointer 
        text-sm leading-tight uppercase rounded shadow-md hover:opacity-80 hover:shadow-lg hover:scale-90 
        duration-200 ease-in-out"
      >
        Learn More
      </Button>
    </header>
  );
}

export default HeroBanner;