import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import CoursesPage from "./pages/CoursesPage"
import ProfilePage from "./pages/ProfilePage"
import CourseDetailsPage from "./pages/CourseDetailsPage"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import LessonsPage from "./pages/LessonsPage"
import LessonPage from "./pages/LessonPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
  <>
<Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/lesson" element={<LessonsPage />} />
      <Route path="/lesson/:id" element={<LessonPage />} />
    </Routes>
    <Toaster position="top-right" reverseOrder={false} />
  </>


  )
}

export default App
