import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsPerson } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";
import { BsCardText } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import { BsCollection } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

export default function Sidebar() {
  const { profile } = useAuth();

  const role = profile?.role;

  return (
    <div className="w-64 border-r border-gray-300 text-text-color h-full p-4 flex flex-col">
      {/* logo */}
      <h1 className="text-xl font-bold mb-8">Dashboard</h1>
      <nav className="space-y-2">
        <NavLink
          to={`/dashboard/${role}`}
          className={({ isActive }) =>
            isActive
              ? `block flex items-center bg-gray-100  gap-2 hover:bg-gray-100 p-2 rounded`
              : `block flex items-center  gap-2 hover:bg-gray-100 p-2 rounded`
          }
        >
          <BsCollection />

          <span>Dashboard</span>
        </NavLink>
        {role === "teacher" && (
          <>
            <NavLink
              to="/dashboard/teacher/create"
              className={({ isActive }) =>
                isActive
                  ? `block flex items-center bg-gray-100  gap-2 hover:bg-gray-100 p-2 rounded`
                  : `block flex items-center  gap-2 hover:bg-gray-100 p-2 rounded`
              }
            >
              <BsPlusSquare />

              <span>Create Course</span>
            </NavLink>
          </>
        
        )}

        <>
          <NavLink
            to={`/dashboard/${role}/profile`}
            className={({ isActive }) =>
              isActive
                ? `block flex items-center bg-gray-100  gap-2 hover:bg-gray-100 p-2 rounded`
                : `block flex items-center  gap-2 hover:bg-gray-100 p-2 rounded`
            }
          >
            <BsPerson />
            Profile
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? `block flex items-center bg-gray-100  gap-2 hover:bg-gray-100 p-2 rounded`
                : `block flex items-center  gap-2 hover:bg-gray-100 p-2 rounded`
            }
          >
            <BsCardText />
            Courses
          </NavLink>
          <NavLink
            to="#"
            className="block flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
          >
            <CiSettings />
            <span>Setting</span>
          </NavLink>
        </>
      </nav>
      <div className="mt-auto border-t border-primary-light pt-4 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Sadia LMS
      </div>
    </div>
  );
}
