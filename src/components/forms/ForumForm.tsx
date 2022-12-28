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
    <form className="w-1/2" onSubmit={onSubmit}>
      <label>Course</label>
      <input {...register("course", { required: true, pattern: /^[A-Z]{2}\s[0-9]{4}$/i})}/>

      <label>Pros</label>
      <input {...register("pros", { required: true })}/>

      <label>Cons</label>
      <input {...register("cons", { required: true })}/>
    </form>
  );
}

export default ForumForm;