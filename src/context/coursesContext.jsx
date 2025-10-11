import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  createLesson,
  getLessonsByCourse,
  getEnrolledCourses,
  updateCourseById,
  deleteCourseById, 
} from "../lib/courses";
import { useAuth } from "./AuthContext";

const CoursesContext = createContext(null);

const initialState = {
  courses: [],
  selectedCourse: null,
  lessons: [],
  isLoading: false,
};

function coursesReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_COURSES":
      return { ...state, courses: action.payload, isLoading: false };
    case "SET_SELECTED_COURSE":
      return { ...state, selectedCourse: action.payload, isLoading: false };
    case "SET_LESSONS":
      return { ...state, lessons: action.payload, isLoading: false };
    case "ADD_COURSE":
      return { ...state, courses: [...state.courses, action.payload] };
    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state.courses.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
}

export function CoursesProvider({ children }) {
  const { user, profile } = useAuth();
  const [state, dispatch] = useReducer(coursesReducer, initialState);

  // Fetch courses
  const fetchCourses = useCallback(async () => {
    if (!user) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const data =
        profile?.role === "teacher"
          ? await getAllCourses({ teacherId: user.id })
          : await getAllCourses();
      dispatch({ type: "SET_COURSES", payload: data || [] });
    } catch (error) {
      console.error("Error fetching courses:", error);
      dispatch({ type: "SET_COURSES", payload: [] });
    }
  }, [user, profile]);

  // Fetch course details
  const fetchCourseDetails = useCallback(async (courseId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const course = await getCourseById(courseId);
      const lessonsData = await getLessonsByCourse(courseId);
      dispatch({ type: "SET_SELECTED_COURSE", payload: course });
      dispatch({ type: "SET_LESSONS", payload: lessonsData });
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }, []);

  // Fetch student courses
  const fetchStudentCourses = useCallback(async (studentId) => {
    if (!studentId) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await getEnrolledCourses(studentId);
      dispatch({ type: "SET_COURSES", payload: data || [] });
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  }, []);

  // Add course
  const addCourse = async (courseData) => {
    if (!user) return alert("You must be logged in as a teacher!");
    dispatch({ type: "SET_LOADING" });
    try {
      const newCourse = await createCourse({ ...courseData, teacher_id: user.id });
      dispatch({ type: "ADD_COURSE", payload: newCourse });
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  };

  // Update course
  const updateCourse = async (courseId, updatedData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const updated = await updateCourseById(courseId, updatedData);
      dispatch({ type: "UPDATE_COURSE", payload: updated });
      return updated;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  };

  // Delete course
  const deleteCourse = async (courseId) => {
  dispatch({ type: "SET_LOADING" });
  try {
    await deleteCourseById(courseId); // delete from Supabase
    dispatch({ type: "DELETE_COURSE", payload: courseId }); // remove from state
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

  // Add lesson
  const addLesson = async (lessonData) => {
    if (!user) return alert("You must be logged in!");
    dispatch({ type: "SET_LOADING" });
    try {
      const newLesson = await createLesson(lessonData);
      dispatch({ type: "SET_LESSONS", payload: [...state.lessons, newLesson] });
      return newLesson;
    } catch (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (profile) fetchCourses();
  }, [profile, fetchCourses]);

  return (
    <CoursesContext.Provider
      value={{
        courses: state.courses,
        selectedCourse: state.selectedCourse,
        lessons: state.lessons,
        isLoading: state.isLoading,
        fetchCourses,
        fetchCourseDetails,
        fetchStudentCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        addLesson,
        dispatch,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) throw new Error("useCourses must be used within a CoursesProvider");
  return context;
}
