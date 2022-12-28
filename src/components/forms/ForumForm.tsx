import { useForm } from "react-hook-form";

interface ForumFormData {
  course: string;
  pros: string;
  cons: string;
}

const ForumForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForumFormData>();
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div className="w-1/2 p-8 bg-slate-200 mx-auto rounded-md shadow-2xl">
        <div className="mb-6">
          <label htmlFor="course-id" className="block text-xl font-medium text-gray-700">Course</label>
          <input 
            id="course-id-input" 
            className="block w-56 max-w-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            sm:text-sm hover:shadow-xl duration-200 outline-none" 
            {...register("course", { required: true, pattern: /^[A-Z]{2}\s[0-9]{4}$/i})}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="pros" className="block text-xl font-medium text-gray-700">Pros</label>
          <textarea
            id="pros-input"
            className="block w-full h-32 max-h-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            sm:text-sm hover:shadow-xl duration-200 outline-none"
            {...register("pros", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="cons" className="block text-xl font-medium text-gray-700">Cons</label>
          <textarea 
            id="cons-input"
            className="block w-full h-32 max-h-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            sm:text-sm hover:shadow-xl duration-200 outline-none"
            {...register("cons", { required: true })}
          />
        </div>
      </div>
    </form>
  );
}

export default ForumForm;