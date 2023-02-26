import { Button } from "./Buttons";

const HeroBanner: React.FC = () => {
  return (
    <header
      className="relative mx-auto mb-8 flex w-auto flex-col items-center gap-8 bg-gradient-to-b 
      from-rose-100 to-teal-100 p-8 text-center text-black shadow-2xl"
    >
      <h1 className="text-4xl">Welcome to Degree Door</h1>
      <p className="md:w-2/5">
        A collaborative space allowing students and faculty to share their
        experiences with upcoming students. Providing information on courses,
        degrees, and work loads in a forum like style allowing access to
        important information.
      </p>
      <Button type="button">Learn More</Button>
    </header>
  );
};

export default HeroBanner;
