import { Route, Routes, useLocation } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
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
import DashboardLayout from "./components/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import EnrolledCourses from "./pages/EnrolledCourses"
import { CoursesProvider } from "./context/coursesContext";
import TeacherCoursesPage from "./pages/TeacherCoursesPage";


function App() {


  const location = useLocation();

  // hide header/footer in dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <AuthProvider>
      <CoursesProvider>
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
              <Route path="my-courses" element={<EnrolledCourses />} />
            </Route>



             {/* 👨‍🏫 Teacher Dashboard Routes */}
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
              <Route path="profile" element={<ProfilePage />} />
              <Route path="my-courses" element={<TeacherCoursesPage />} />
              
            </Route>


  
          </Routes>
        </main>
        {/* footer */}
        {!isDashboard && <Footer />}
      </div>

      {/* <Toaster /> */}
      <Toaster position="top-right" reverseOrder={false} />
       </CoursesProvider>
    </AuthProvider>
  );
}

export default App;
