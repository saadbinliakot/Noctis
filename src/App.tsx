import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NightFeed from "@/pages/NightFeed";
import SubmitDream from "@/pages/SubmitDream";
import Friends from "@/pages/Friends";
import Profile from "@/pages/Profile";
import Analytics from "@/pages/Analytics";
import DreamMap from "@/pages/DreamMap";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import TrendingTags from "./components/TrendingTags";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trending" element={<TrendingTags />} />

            {/* Protected routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <NightFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <SubmitDream />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dreammap"
              element={
                <ProtectedRoute>
                  <DreamMap />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
