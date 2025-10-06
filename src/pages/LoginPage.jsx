import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import signupimage from "../assets/register.png";
import { signIn } from "../lib/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  


const onSubmit = async (data) => {
  setIsLoading(true);
  const { email, password } = data;
  const response = await signIn(email, password);

  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success("Signed in successfully!");

    if (response.role === "student") {
      navigate("/dashboard/student");
    } else if (response.role === "teacher") {
      navigate("/dashboard/teacher");
    } else {
      navigate("/");
    }
  }

  setIsLoading(false);
};








  return (
    <div className=" h-screen text-text_color ">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center h-full">
        {/* image and desc */}
        <div className="h-full md:flex hidden  flex-col items-center  bg-gradient-to-l from-primary to-gray-700">
          <h3 className="text-[#ffffffdb] p-8 my-5 text-center max-w-md text-2xl ">
            Learnzy is your place to learn your dream skill
          </h3>
          <img className="w-md mt-12" src={signupimage} alt="pc image" />
        </div>

        {/* form info*/}
        <div className="space-y-6 p-6 flex justify-center flex-col">
          {/* form header  */}
          <div>
            <h2 className="text-4xl mb-2  font-bold">Welcome Back</h2>
            <p className="text-gray-400 font-semibold text-sm">
              don't have an account?{" "}
              <Link to="/signup" className="text-primary-light">
                Sign Up 
              </Link>{" "}
            </p>
          </div>
          <form
            className="space-y-3 mt-12 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
           

            {/* input group email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="border w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
                type="email"
                placeholder="example@email.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* input group password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="border  w-full flex border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
                type="password"
                placeholder="******"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            

            <button
              className="bg-primary p-2 px-4 cursor-pointer mt-5 rounded-md text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
