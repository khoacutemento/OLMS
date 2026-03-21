import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard, GuestGuard } from "@/components/AuthGuard";
import { AdminGuard } from "@/components/AdminGuard";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import CoursesAll from "./pages/admin/CoursesAll";
import PendingCourses from "./pages/admin/PendingCourses";
import UsersManagement from "./pages/admin/UsersManagement";
import Categories from "./pages/admin/Categories";
import Report from "./pages/admin/Report";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
            <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/change-password" element={<AuthGuard><ChangePassword /></AuthGuard>} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<CoursesAll />} />
              <Route path="pending-courses" element={<PendingCourses />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="categories" element={<Categories />} />
              <Route path="report" element={<Report />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
