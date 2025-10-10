import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  createLesson,
  getLessonsByCourse,
} from "../lib/courses";
import { useAuth } from "./AuthContext";
import supabase from "../lib/supabaseClient";

const CoursesContext = createContext(null);

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, profile } = useAuth();

  // ✅ Fetch all courses
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Fetch teacher's courses
  const fetchTeacherCourses = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("teacher_id", user.id);

      if (error) throw error;
      setCourses(data);
    } catch (error) {
      console.error("Error fetching teacher courses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // ✅ Fetch course and its lessons
  const fetchCourseDetails = useCallback(async (courseId) => {
    setIsLoading(true);
    try {
      const course = await getCourseById(courseId);
      const lessonsData = await getLessonsByCourse(courseId);
      setSelectedCourse(course);
      setLessons(lessonsData);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Create new course
  const addCourse = async (courseData) => {
    if (!user) return alert("You must be logged in as a teacher!");
    setIsLoading(true);
    try {
      const newCourse = await createCourse({
        ...courseData,
        teacher_id: user.id,
      });
      setCourses((prev) => [...prev, newCourse]);
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Create new lesson
  const addLesson = async (lessonData) => {
    if (!user) return alert("You must be logged in!");
    setIsLoading(true);
    try {
      const newLesson = await createLesson(lessonData);
      setLessons((prev) => [...prev, newLesson]);
      return newLesson;
    } catch (error) {
      console.error("Error creating lesson:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Auto-fetch based on role
  useEffect(() => {
    if (profile?.role === "teacher") {
      fetchTeacherCourses();
    } else {
      fetchCourses();
    }
  }, [profile, fetchCourses, fetchTeacherCourses]);

  const value = {
    courses,
    selectedCourse,
    lessons,
    isLoading,
    fetchCourses,
    fetchTeacherCourses,
    fetchCourseDetails,
    addCourse,
    addLesson,
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
}
