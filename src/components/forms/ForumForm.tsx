import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";

export interface ForumFormData {
  course: string;
  pros: string;
  cons: string;
}

interface ForumFormProps {
  onSubmit: (data: ForumFormData) => Promise<boolean>;
}

const ForumForm: React.FC<ForumFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForumFormData>();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const onSubmit2 = handleSubmit(async (data) => {
    const isSuccessful = await onSubmit(data);
    if (isSuccessful) reset();
  });

  const activeButton = "inline-block px-6 py-2.5 bg-rose-400 text-white font-medium cursor-pointer " +
  "text-sm leading-tight uppercase rounded shadow-md hover:opacity-80 hover:shadow-lg focus:bg-violet-700 hover:scale-90 "+
  "focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-200 " +
  "ease-in-out";

  const disabledButton = "inline-block px-6 py-2.5 bg-rose-400 text-white font-medium " +
  "text-sm leading-tight uppercase rounded shadow-md opacity-50";

  return (
    <form onSubmit={onSubmit2}>
      <div className="w-1/2 p-8 bg-slate-200 mx-auto rounded-md shadow-2xl">
        <div className="mb-6">
          <label htmlFor="course-id" className="block text-xl font-medium text-gray-900">Course</label>
          <input 
            id="course-id-input" 
            type="text"
            className="block w-56 max-w-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            text-md hover:shadow-xl duration-200 outline-none" 
            placeholder="Ex. CSC 0000"
            {...register("course", { required: "Course is required", pattern: {value: /^[A-Z]{2,3}\s[0-9]{4}$/i, message: "Please enter a valid course"}})}
          />
          {errors.course && <ErrorMessage message={errors.course?.message} /> }
        </div>
        <div className="mb-6">
          <label htmlFor="pros" className="block text-xl font-medium text-gray-900">Pros</label>
          <textarea
            id="pros-input"
            className="block w-full h-32 max-h-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            text-md hover:shadow-xl duration-200 outline-none"
            placeholder="What did you enjoy about this particular course? (If nothing, you can put N/A)"
            {...register("pros", { required: "This field is required" })}
          />
          {errors.pros && <ErrorMessage message={errors.pros?.message} /> }
        </div>
        <div className="mb-6">
          <label htmlFor="cons" className="block text-xl font-medium text-gray-900">Cons</label>
          <textarea 
            id="cons-input"
            className="block w-full h-32 max-h-fit flex-1 rounded-md border-gray-700 p-4 mt-2
            text-md hover:shadow-xl duration-200 outline-none"
            placeholder="What did you dislike about this particular course? (If nothing, you can put N/A)"
            {...register("cons", { required: "This field is required" })}
          />
          {errors.cons && <ErrorMessage message={errors.cons?.message} /> }
        </div>
        <div className="flex justify-end">
          {sessionData?.user ? 
          <button 
            type="submit" 
            className={router.isReady ? activeButton : disabledButton}
            disabled={!router.isReady}
          >
            Submit
          </button> :
            <button 
              type="button" 
              className={activeButton}
              onClick={() => signIn()}
            >
              Sign In to Create a Review
            </button>
          }
        </div>
      </div>
    </form>
  );
}

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className=" text-red-700 mt-2 flex items-center gap-2" role="alert">
      <div className="text-xl">
        <BiError />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
}

export default ForumForm;