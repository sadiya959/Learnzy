import { useEffect } from "react";
import dashboardheader from "../assets/dashboardheader.png";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/coursesContext";
import { Link } from "react-router-dom";
import DashboardCards from "../components/DashoardCards";

const StudentDashboard = () => {
  const { profile, user } = useAuth();
  const { courses, fetchStudentCourses, isLoading } = useCourses(); 


  useEffect(() => {
    if (user) fetchStudentCourses(user.id);
  }, [user, fetchStudentCourses]);

  return (
    <div className="space-y-10 p-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#15045A] to-[#7BC5FF] p-8 rounded-2xl text-white relative overflow-hidden">
        <div className="flex">
          <div>
            <h1 className="text-4xl font-semibold">
              Welcome Back, {profile?.fullname || "Student"}
            </h1>

            <p className="text-gray-300 max-w-xl my-3">
              Continue your learning journey — you’re doing great!
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

      {/* Enrolled Courses */}
      <div className="my-12 space-y-5">
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            You haven’t enrolled in any courses yet. 🎓
          </p>
        ) : (
          courses.map((course) => (
            <div
              className="border rounded-md border-blue-100 p-3 shadow-sm"
              key={course.id}
            >
              <div className="flex justify-between w-full items-center flex-wrap gap-5">
                <div className="flex gap-5 items-start">
                  <img
                    className="w-32 h-24 object-cover rounded-lg"
                    src={
                      course.image_url ||
                      "https://via.placeholder.com/150x100?text=No+Image"
                    }
                    alt={course.title}
                  />
                  <div>
                    <h2 className="text-lg font-medium">{course.title}</h2>
                    <p className="text-sm text-gray-600 max-w-md">
                      {course.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={course.progress || 0}
                    className="w-60 accent-blue-600"
                    readOnly
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Progress: {course.progress || 0}%
                  </p>
                  <Link to={`/courses/${course.id}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-3 hover:bg-blue-700 transition">
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
