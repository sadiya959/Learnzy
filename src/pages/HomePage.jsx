import { Link } from "react-router-dom";
import { useCourses } from "../context/CoursesContext";
import { useEffect } from 'react'
import { PiChalkboardTeacherThin, PiCertificateThin } from "react-icons/pi";
import { IoSchoolOutline } from "react-icons/io5";




const HomePage = () => {
  const { courses, isLoading, fetchCourses } = useCourses();



  return (
    <div className="py-20">
      {/* Hero Section */}
      <section style={{background: "https://i.pinimg.com/736x/24/a3/b2/24a3b2a8be983c30d03cb51d683a1532.jpg"}} className="bg-gradient-to-r  from-[#15045A] to-[#7BC5FF] text-white py-32 px-6 text-center relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Learn Anything, Anywhere</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Explore thousands of courses and advance your skills. Start your journey today!
        </p>
        <Link to="/courses">
          <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Browse Courses
          </button>
        </Link>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white flex flex-col items-center gap-4 rounded-2xl p-6 shadow-lg text-center">
            <PiChalkboardTeacherThin size={40}  />
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-500 text-sm">Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="bg-white flex flex-col items-center gap-4 rounded-2xl p-6 shadow-lg text-center">
            <IoSchoolOutline size={40} />
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-500 text-sm">Learn at your own pace, anytime and anywhere.</p>
          </div>
          <div className="bg-white flex flex-col items-center gap-4 rounded-2xl p-6 shadow-lg text-center">
            <PiCertificateThin size={40} />
            <h3 className="text-xl font-semibold mb-2">Certification</h3>
            <p className="text-gray-500 text-sm">Earn certificates to showcase your achievements and skills.</p>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="px-6 my-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.slice(0, 6).map(course => (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img src={course.image_url} alt={course.title} className="h-48 w-full object-cover"/>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{course.description.slice(0, 80)}...</p>
                  <Link to={`/courses/${course.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      View Course
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
};

export default HomePage;
