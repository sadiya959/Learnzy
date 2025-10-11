import { BsBook, BsPerson } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const DashboardCard = () => {
  const { profile } = useAuth();
  const { courses, fetchCourses, fetchStudentCourses } = useCourses();
  const [studentCount, setStudentCount] = useState(0);
  const role = profile?.role;

  

  return (
    <div className="flex gap-5">
      {role === "teacher" ? (
        <>
          <div className="bg-blue-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsBook size={20} />
            <p className="text-4xl font-bold mt-2 text-blue-800">{courses.length}</p>
            <h3 className="text-gray-500 text-sm">Your Courses</h3>
          </div>

          <div className="bg-purple-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsPerson size={20} />
            <p className="text-4xl font-bold mt-2 text-purple-800">{studentCount}</p>
            <h3 className="text-gray-500 text-sm">Students</h3>
          </div>

          <div className="bg-green-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsBook size={20} />
            <p className="text-4xl font-bold mt-2 text-green-800">{courses.length}</p>
            <h3 className="text-gray-500 text-sm">Active Courses</h3>
          </div>
        </>
      ) : (
        <>
          <div className="bg-blue-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsBook size={20} />
            <p className="text-4xl font-bold mt-2 text-blue-800">{courses.length}</p>
            <h3 className="text-gray-500 text-sm">Enrolled Courses</h3>
          </div>

          <div className="bg-purple-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsPerson size={20} />
            <p className="text-4xl font-bold mt-2 text-purple-800">0</p>
            <h3 className="text-gray-500 text-sm">Completed Courses</h3>
          </div>

          <div className="bg-green-100 flex shadow-lg hover:shadow-xl gap-4 flex-col items-center rounded-2xl p-4 mt-20 flex-1 text-center">
            <BsBook size={20} />
            <p className="text-4xl font-bold mt-2 text-green-800">0</p>
            <h3 className="text-gray-500 text-sm">Exams</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
