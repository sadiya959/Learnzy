import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import dashboardheader from "../assets/dashboardheader.png";
import DashboardCards from "../components/DashoardCards";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/coursesContext";

const StudentDashboard = () => {
  const { profile } = useAuth();

  const { courses, fetchTeacherCourses, isLoading } = useCourses();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTeacherCourses();
    }
  }, [user, fetchTeacherCourses]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* dashboard header  */}
      <div className="bg-[linear-gradient(167deg,rgba(21,_4,_90,_1)_0%,rgba(123,_197,_255,_1)_100%)] p-8 h-auto relative  text-white rounded-xl flex  ">
        <div className="flex">
          <div>
            <h1 className="text-4xl">Welcome Back, Sara</h1>

            <p className="text-gray-300 max-w-xl my-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              necessitatibus. Lorem, ipsum.{" "}
            </p>

            <button className="bg-gray-200 text-gray-800 cursor-pointer rounded-lg mt-4 px-3 py-1">
              Get Started
            </button>
          </div>
          <div className="absolute -bottom-10 right-30">
            <img className="w-90" src={dashboardheader} alt="" />
          </div>
        </div>
      </div>
      <DashboardCards />

      {/* courses */}
      <div className="my-12 space-y-5">
        {courses.map((course) => (
          <div
            className=" border rounded-md border-blue-100 p-3"
            key={course.title}
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-5">
                <img
                  className="w-30 overflow-hidden rounded-lg"
                  src={course.image_url}
                  alt=""
                />
                <div>
                  <h2 className="text-lg font-medium">{course.title}</h2>
                  <p className="text-sm">{course.description}</p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <RiEdit2Line
                  className="text-primary-light cursor-pointer"
                  size={20}
                />
                <AiOutlineDelete
                  className="text-red-400 cursor-pointer"
                  size={20}
                />

                <button className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
