import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCourses } from "../context/coursesContext";
import { useAuth } from "../context/AuthContext";
import { enrollInCourse, getEnrolledCourses } from "../lib/courses";
import Lessons from "../components/Lessons";


const CourseDetailsPage = () => {
  const { id } = useParams();
  const { selectedCourse, lessons, fetchCourseDetails, isLoading } = useCourses();
  const { user } = useAuth();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Fetch course details
  useEffect(() => {
    if (id) fetchCourseDetails(id);
  }, [id, fetchCourseDetails]);

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !selectedCourse) return;
      try {
        const enrolledCourses = await getEnrolledCourses(user.id);
        const enrolled = enrolledCourses.some(course => course.id === selectedCourse.id);
        setIsEnrolled(enrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };
    checkEnrollment();
  }, [user, selectedCourse]);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) return alert("You must be logged in to enroll!");
    try {
      setIsEnrolling(true);
      await enrollInCourse(user.id, selectedCourse.id);
      setIsEnrolled(true);
    } catch (error) {
      if (error.message.includes("duplicate key")) {
        alert("You’re already enrolled in this course!");
        setIsEnrolled(true);
      } else {
        console.error("Enrollment failed:", error.message);
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading || !selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-8">
        {/* Top Section: Course Image + Info */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              {selectedCourse.title}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedCourse.description}
            </p>
            <p className="text-lg text-primary font-semibold">
              Price: ${selectedCourse.price}
            </p>

            <button
              onClick={handleEnroll}
              disabled={isEnrolling || isEnrolled}
              className={`px-6 py-2 rounded-lg text-white ${
                isEnrolled
                  ? "bg-secondary cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
              }`}
            >
              {isEnrolled ? "Enrolled " : isEnrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
          <div>
            <img
              src={selectedCourse.image_url}
              alt={selectedCourse.title}
              className="rounded-xl h-72 w-full object-cover shadow-md"
            />
          </div>
          
        </div>

        {/* Lessons Section */}
   <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lessons</h2>
  <Lessons lessons={lessons} />
</div>

      </div>
    </div>
  );
};

export default CourseDetailsPage;
