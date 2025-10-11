import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; // ✅ fixed import (lowercase “u”)
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ManageCoursesPage from "./pages/ManageCoursesPage";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRouter";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import { CoursesProvider } from "./context/coursesContext";

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isSignup = location.pathname.startsWith("/signup");
  const isLogin = location.pathname.startsWith("/login");

  return (
    <AuthProvider>
      <CoursesProvider>
        <div>
          {/* Header (hidden on login/signup pages) */}
          {!isSignup && !isLogin && <Header />}

          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />

              {/* Unauthenticated Routes */}
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
                    <SignupPage />
                  </UnAuthenticatedRoute>
                }
              />

              {/* Student Dashboard Routes */}
              <Route
                path="/dashboard/student"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Teacher Dashboard Routes */}
              <Route
                path="/dashboard/teacher"
                element={
                  <ProtectedRoute allowedRoles={["teacher"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<TeacherDashboard />} />
                <Route path="create" element={<ManageCoursesPage />} />
                <Route path="create/:id" element={<ManageCoursesPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>

          {/* Footer (hidden on dashboard/login/signup) */}
          {!isDashboard && !isSignup && !isLogin && <Footer />}
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-right" reverseOrder={false} />
      </CoursesProvider>
    </AuthProvider>
  );
}

export default App;
