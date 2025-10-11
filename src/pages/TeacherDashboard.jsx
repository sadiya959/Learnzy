import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import dashboardheader from "../assets/dashboardheader.png";
import DashboardCards from "../components/DashoardCards";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import { Link, useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const { user, profile } = useAuth();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  
  const { courses, isLoading, fetchCourses, deleteCourse } = useCourses();

  const handleDelete = async (courseId) => {
    setDeletingId(courseId);
    try {
      await deleteCourse(courseId); 
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#15045A] to-[#7BC5FF] p-8 rounded-2xl text-white relative overflow-hidden">
        <div className="flex">
          <div>
            <h1 className="text-4xl font-semibold">
              Welcome Back, {profile?.fullname || "Teacher"}
            </h1>

            <p className="text-gray-300 max-w-xl my-3">
              Ready to manage your courses? Keep pushing forward!
            </p>

            <button className="bg-gray-200 text-gray-800 rounded-lg mt-4 px-3 py-1">
              Get Started
            </button>
          </div>

          <div className="absolute -bottom-10 right-10 hidden lg:block">
            <img className="w-80" src={dashboardheader} alt="" />
          </div>
        </div>
      </div>

      <DashboardCards />

      {/* Courses */}
      {courses.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You haven’t created any courses yet. 🎓
        </p>
      ) : (
        <div className="my-12 space-y-5">
          {courses.map((course) => (
            <div
              className="border rounded-md border-blue-100 p-3 flex justify-between items-center"
              key={course.id}
            >
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
                  onClick={() => navigate(`/create/${course.id}`)}
                  className="text-primary-light cursor-pointer"
                  size={20}
                />
                <AiOutlineDelete
                  className={`text-red-400 cursor-pointer ${
                    deletingId === course.id ? "opacity-50 pointer-events-none" : ""
                  }`}
                  size={20}
                  onClick={() => handleDelete(course.id)}
                />
                <Link to={`/courses/${course.id}`}>
                  <button className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
