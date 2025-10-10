import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {createCourse, createLesson} from '../lib/courses'
import { useAuth } from "../context/AuthContext";



const ManageCoursesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { profile } = useAuth();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

    const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Create course 
      const course = await createCourse({
        title: data.title,
        description: data.description,
        price: data.price,
        image_url: data.image_url, 
        teacher_id: profile?.id, 
      });

      // Create lessons
      for (const lesson of data.lessons) {
        await createLesson({
          title: lesson.title,
          content: lesson.content,
          video_url: lesson.videoUrl,
          course_id: course.id,
        });
      }

      toast.success("✅ Course and lessons created successfully!");
      navigate("/dashboard/teacher");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="space-y-5 p-6 flex justify-center flex-col">
      {/* form info*/}

      {/* form header  */}
      <div>
        <h2 className="text-4xl  font-bold">Create a Course</h2>
      </div>
      <form className="space-y-3 mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* input group title */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="border  w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
            type="text"
            placeholder="Course Title"
            {...register("title", { required: "Title is required" })}
          />

          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* input group description */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium" htmlFor="description">
            Description
          </label>

          <textarea
            className="border w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
            type="description"
            placeholder="Course Description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* input group price */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium" htmlFor="price">
            Price
          </label>
          <input
            className="border  w-30 flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
            type="number"
            placeholder="Course Price"
            {...register("price", { required: "Price is required" })}
          />

          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* input group course image */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium" htmlFor="image">
            Course Image
          </label>
          <input
            className="border  w-full flex border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
            type="text"
            placeholder="Course Image URL"
            {...register("image_url", {
              required: "image url is required",
            })}
          />
          {errors["image_url"] && (
            <p className="text-red-500">{errors["image_url"].message}</p>
          )}
        </div>

        {/* input group lessons */}
        <div className="flex flex-col gap-1 mt-5">
          <label className="text-gray-500 font-medium" htmlFor="lessons">
            Lessons
          </label>

          {fields.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex flex-col gap-2 border border-gray-300  mt-5 p-3 rounded-md mb-3"
            >
              <input
                className="border  w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
                placeholder={`Lesson ${index + 1} Title`}
                {...register(`lessons.${index}.title`, {
                  required: "Lesson title is required",
                })}
              />
              <textarea
                className="border  w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
                placeholder="Lesson content or description"
                {...register(`lessons.${index}.content`, {
                  required: "Lesson content is required",
                })}
              />
              <input
                className="border  w-full flex  border-gray-200 p-2 outline-none placeholder:text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light  rounded-md"
                placeholder="Video URL (optional)"
                {...register(`lessons.${index}.videoUrl`)}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 cursor-pointer text-sm mt-1 self-start"
              >
                <AiOutlineDelete size={20}/>

              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ title: "", content: "", videoUrl: "" })}
            className="bg-green-500 cursor-pointer text-white py-1 px-3 rounded-md w-fit"
          >
            + Add Lesson
          </button>
        </div>

        <button
          className="bg-primary p-2 px-4 cursor-pointer mt-5 rounded-md text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default ManageCoursesPage;
