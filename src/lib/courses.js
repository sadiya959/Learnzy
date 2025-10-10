// src/lib/courses.js
import { supabase } from "./supabaseClient";

// ✅ Create a new course
export const createCourse = async (courseData) => {
  const { data, error } = await supabase.from("courses").insert([courseData]).select();
  if (error) throw error;
  return data[0];
};

// ✅ Get all courses
export const getAllCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) throw error;
  return data;
};

// ✅ Get course by ID
export const getCourseById = async (id) => {
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};



// ✅ Create a lesson (linked to a course)
export const createLesson = async (lessonData) => {
  const { data, error } = await supabase.from("lessons").insert([lessonData]).select();
  if (error) throw error;
  return data[0];
};

// ✅ Get all lessons for a course
export const getLessonsByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId);
  if (error) throw error;
  return data;
};
