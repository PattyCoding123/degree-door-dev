import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { toast } from "react-hot-toast";

import { trpc } from "../../utils/trpc";
import { Button } from "../Buttons";

interface ForumFormData {
  course: string;
  pros: string;
  cons: string;
}

const ForumForm: React.FC<{ degreeId: string }> = ({ degreeId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForumFormData>();
  const { data: sessionData } = useSession();

  const createReview = trpc.forum.createReview.useMutation({
    onSuccess: () => {
      toast.success("Review successfully created!", {
        position: "bottom-center",
        className: "text-xl",
      });
      reset();
    },
    onError: () =>
      toast.error("There was an error creating the review!", {
        position: "bottom-center",
        className: "text-xl",
      }),
  });

  const onSubmit2 = handleSubmit(async (data) => {
    await createReview.mutateAsync({
      degreeId: degreeId,
      formData: data,
    });
  });

  return (
    <form onSubmit={onSubmit2}>
      <div className="mx-auto w-1/2 rounded-md bg-slate-200 p-8 shadow-2xl">
        <div className="relative mb-12">
          <label
            htmlFor="course-id"
            className="block text-xl font-medium text-gray-900"
          >
            Course
          </label>
          <input
            id="course-id-input"
            type="text"
            className="text-md mt-2 block w-56 max-w-fit flex-1 rounded-md border-gray-700
            p-4 outline-none duration-200 hover:shadow-xl"
            placeholder="Ex. CSC 0000"
            disabled={isSubmitting}
            {...register("course", {
              required: "Course is required",
              pattern: {
                value: /^[A-Z]{2,3}\s[0-9]{4}$/i,
                message: "Please enter a valid course",
              },
            })}
          />
          {errors.course && <ErrorMessage message={errors.course?.message} />}
        </div>
        <div className="relative mb-12">
          <label
            htmlFor="pros"
            className="block text-xl font-medium text-gray-900"
          >
            Pros
          </label>
          <textarea
            id="pros-input"
            className="text-md mt-2 block h-32 max-h-fit w-full flex-1 rounded-md border-gray-700
            p-4 outline-none duration-200 hover:shadow-xl"
            placeholder="What did you enjoy about this particular course? (If nothing, you can put N/A)"
            disabled={isSubmitting}
            {...register("pros", { required: "This field is required" })}
          />
          {errors.pros && <ErrorMessage message={errors.pros?.message} />}
        </div>
        <div className="relative mb-12">
          <label
            htmlFor="cons"
            className="block text-xl font-medium text-gray-900"
          >
            Cons
          </label>
          <textarea
            id="cons-input"
            className="text-md mt-2 block h-32 max-h-fit w-full flex-1 rounded-md border-gray-700
            p-4 outline-none duration-200 hover:shadow-xl"
            placeholder="What did you dislike about this particular course? (If nothing, you can put N/A)"
            {...register("cons", { required: "This field is required" })}
            disabled={isSubmitting}
          />
          {errors.cons && <ErrorMessage message={errors.cons?.message} />}
        </div>
        <div className="flex justify-end">
          {sessionData?.user ? (
            // * react-hook-form will handle errors if the user presses submit button
            // * when the form is incomplete or if the user enters invalid input
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          ) : (
            <Button type="button" onClick={() => signIn()}>
              Sign In to Create a Review
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

const ErrorMessage = (props: { message: string | undefined }) => {
  const { message } = props;
  return (
    <div
      className="absolute mt-2 flex items-center gap-2 text-sm text-red-700"
      role="alert"
    >
      <div className="text-lg">
        <BiError />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default ForumForm;
