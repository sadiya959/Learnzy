import { Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import LessonsPage from "./pages/LessonsPage";
import LessonPage from "./pages/LessonPage";
import ManageCoursesPage from "./pages/ManageCoursesPage";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRouter";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        {/* header */}
        <Header />
        <main>
          {/* routes */}
          <Routes>
            {/* public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* unauthenticated routes (redirect to home if logged in) */}
            <Route
              path="/login"
              element={
                <UnAuthenticatedRoute>
                  <LoginPage />
                </UnAuthenticatedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />

            {/* protected route */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/teacher/create"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <ManageCoursesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["student", "teacher"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {/* footer */}
        <Footer />
      </div>

      {/* <Toaster /> */}
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
