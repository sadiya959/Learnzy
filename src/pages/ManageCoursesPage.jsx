import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../context/coursesContext";

const ManageCoursesPage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { fetchCourseDetails, addCourse, updateCourse, addLesson } = useCourses();
  const [isLoading, setIsLoading] = useState(false);

  // mode 
  const isEditMode = !!courseId;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image_url: "",
      lessons: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  // Load course data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadCourse = async () => {
        setIsLoading(true);
        try {
          const course = await fetchCourseDetails(courseId);
          if (course) {
            reset({
              title: course.title || "",
              description: course.description || "",
              price: course.price || 0,
              image_url: course.image_url || "",
              lessons: course.lessons || [],
            });
          }
        } catch (err) {
          toast.error("Failed to load course",err);
        } finally {
          setIsLoading(false);
        }
      };
      loadCourse();
    }
  }, [isEditMode, courseId, fetchCourseDetails, reset]);

  // Form submit
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let savedCourse;

      if (isEditMode) {
        // Update existing course
        savedCourse = await updateCourse(courseId, {
          title: data.title,
          description: data.description,
          price: data.price,
          image_url: data.image_url,
        });
      } else {
        // Create new course
        savedCourse = await addCourse({
          title: data.title,
          description: data.description,
          price: data.price,
          image_url: data.image_url,
        });
      }

      // Add lessons if they are new
      for (const lesson of data.lessons) {
        if (!lesson.id) {
          await addLesson({
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.video_url,
            course_id: savedCourse.id,
          });
        }
      }

      toast.success(isEditMode ? "Course updated successfully!" : "Course created successfully!");
      navigate("/dashboard/teacher");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 p-6 flex flex-col justify-center">
      <h2 className="text-4xl font-bold mb-5">{isEditMode ? "Edit Course" : "Create a Course"}</h2>
      <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
            placeholder="Course Title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
            placeholder="Course Description"
            rows={5}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium">Price</label>
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            className="border border-gray-300 w-30 p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
            placeholder="Course Price"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-medium">Course Image URL</label>
          <input
            {...register("image_url", { required: "Image URL is required" })}
            className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
            placeholder="Course Image URL"
          />
          {errors.image_url && <p className="text-red-500">{errors.image_url.message}</p>}
        </div>

        {/* Lessons */}
        <div className="flex flex-col gap-1 mt-5">
          <label className="text-gray-500 font-medium">Lessons</label>
          {fields.map((lesson, index) => (
            <div key={lesson.id} className="flex flex-col gap-2 border border-gray-300 mt-5 p-3 rounded-md mb-3">
              <input
                {...register(`lessons.${index}.title`, { required: "Lesson title is required" })}
                className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
                placeholder={`Lesson ${index + 1} Title`}
              />
              <textarea
                {...register(`lessons.${index}.content`, { required: "Lesson content is required" })}
                className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
                placeholder="Lesson Content"
              />
              <input
                {...register(`lessons.${index}.video_url`)}
                className="border border-gray-300 w-full p-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-primary-light rounded-md"
                placeholder="Video URL (optional)"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 cursor-pointer text-sm mt-1 self-start"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ title: "", content: "", video_url: "" })}
            className="bg-green-500 cursor-pointer text-white py-1 px-3 rounded-md w-fit"
          >
            + Add Lesson
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary p-2 px-4 cursor-pointer mt-5 rounded-md text-white"
        >
          {isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default ManageCoursesPage;
