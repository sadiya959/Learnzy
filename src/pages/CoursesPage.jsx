import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/coursesContext";
import {useEffect, useState} from 'react'

const CoursesPage = () => {
const { courses, fetchCourses, isLoading } = useCourses();

const [searchedWord, setSearchedWord] = useState('')

useEffect(() => {
  fetchCourses();
}, [fetchCourses]);

const filtterdCourses = courses.filter(course => {
  if(course.title.includes(searchedWord)){
    return course
  }
})

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex gap-2 items-start">
        <input
          type="search"
          value={searchedWord}
          placeholder="Search Course"
          className="border w-2/6 mb-12 outline-0 hover:outline-primary-light border-gray-300 px-6 py-2 rounded-lg "
          onChange={(e) => setSearchedWord(e.target.value)}
          />
        <button className="bg-primary text-white px-4 py-2 rounded-lg focus:outline-none ">
          Search
        </button>
      </div>

      {/* Loading  */}
      {isLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 max-w-5xl lg:grid-cols-3 gap-6">
          {filtterdCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-lg bg-white shadow-lg p-4 flex flex-col gap-3 hover:shadow-md transition"
            >
              <img
                src={course.image_url}
                alt={course.title}
                className="h-40 w-full object-cover rounded-md"
              />
              <div className="py-5 space-y-3">
                <Link to={`/courses/${course.id}`} className="transition">
                  <h3 className="text-xl hover:text-primary font-semibold">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-600">
                  <span className="font-medium">{course.teacher?.fullname}</span>
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {course.description}
                </p>
              </div>
              <div className="flex gap-5">
                <p className="text-primary font-semibold">
                  Price <span>${course.price}</span>
                </p>
                <p className="text-gray-400 line-through font-semibold">$70</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
