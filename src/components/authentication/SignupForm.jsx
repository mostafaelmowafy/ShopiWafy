import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useSignup } from "./useSignup";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit({ fullName, email, password }) {
    signup(
      {
        fullName,
        email,
        password,
      },
      { onSettled: () => reset() }
    );
  }

  if (isLoading) return <Spinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Form.regular}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isLoading}
          className={Input}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: " please provide a valid email",
            },
          })}
          disabled={isLoading}
          className={Input}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          disabled={isLoading}
          className={Input}
        />
      </FormRow>
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords must match",
          })}
          disabled={isLoading}
          className={Input}
        />
      </FormRow>
      <div className=" flex flex-col justify-center items-center mt-8 w-full lg:w-1/3">
        {/* type is an HTML attribute! */}

        <button className={Button.big + Button.primary} disabled={isLoading}>
          Sign up
        </button>
        <button
          onClick={() => navigate("/login")}
          disabled={isLoading}
          className={Button.big + Button.none}
        >
          &larr;LogIn
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
