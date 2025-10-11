import { supabase } from "./supabaseClient";

//  Create a new course
export const createCourse = async (courseData) => {
  const { data, error } = await supabase.from("courses").insert([courseData]).select();
  if (error) throw error;
  return data[0];
};



// Get all courses
export const getAllCourses = async ({ teacherId } = {}) => {
  let query = supabase
    .from("courses")
    .select(`
      id,
      title,
      description,
      price,
      image_url,
      teacher:teacher_id (id, fullname)
    `);

  if (teacherId) {
    query = query.eq("teacher_id", teacherId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

// Fetch single course (with teacher info)
export async function getCourseById(courseId) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      description,
      price,
      image_url,
      teacher:teacher_id (id, fullname)
    `)
    .eq("id", courseId)
    .single();

  if (error) throw error;
  return data;
}

//  Update a course
export const updateCourseById = async (courseId, updatedData) => {
  const { data, error } = await supabase
    .from("courses")
    .update(updatedData)
    .eq("id", courseId)
    .select();

  if (error) throw error;
  return data[0];
};




// Create a lesson 
export const createLesson = async (lessonData) => {
  const { data, error } = await supabase.from("lessons").insert([lessonData]).select();
  if (error) throw error;
  return data[0];
};

// Get all lessons for a course
export const getLessonsByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("id, title, content, video_url")
    .eq("course_id", courseId);
  if (error) throw error;
  return data;
};


//  Enroll student 
export const enrollInCourse = async (studentId, courseId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ student_id: studentId, course_id: courseId }])
    .select();
  if (error) throw error;
  return data;
};


//  Delete a course

export const deleteCourseById = async (courseId) => {
  await supabase.from("lessons").delete().eq("course_id", courseId);

  const { data, error } = await supabase.from("courses").delete().eq("id", courseId);

  if (error) throw error;
  return data;
};



// Get all courses a student is enrolled in
export const getEnrolledCourses = async (studentId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select(`
      id,
      created_at,
      course:course_id (
        id,
        title,
        description,
        image_url,
        price
      )
    `)
    .eq("student_id", studentId);
  if (error) throw error;
  return data.map((item) => item.course);
};
