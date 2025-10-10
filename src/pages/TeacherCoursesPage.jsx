import React, { useEffect } from "react";
import { useCourses } from "../context/coursesContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const TeacherCoursesPage = () => {
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
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">My Courses</h2>

      
        { courses.length === 0 ? (
        <p className="text-gray-500">You haven’t created any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition">
              <img src={course.image_url} alt={course.title} className="h-40 w-full object-cover rounded-md" />
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
              <p className="text-primary font-semibold">${course.price}</p>
              <Link to={`/dashboard/teacher/courses/${course.id}`} className="bg-primary text-white px-4 py-2 rounded-md text-center hover:bg-primary-dark transition">
                Manage Lessons
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCoursesPage;
