import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

// Import pages and components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth/AuthPage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPanel from "./pages/admin/AdminPanel";
import ProfileManagement from "./pages/alumni/ProfileManagement";
import AlumniDirectory from "./pages/alumni/Directory";
import EventsPage from "./pages/events/EventsPage";
import NewsPage from "./pages/news/NewsPage";
import PaymentsPage from "./pages/alumni/Payments";
import VerificationPage from "./pages/auth/VerificationPage";
import AlumniDashboard from "./pages/alumni/Dashboard";
import Gallery from "./pages/alumni/Gallery";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false, requireCompleteProfile = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('is_admin, first_name, last_name, faculty, department, profile_image_url')
            .eq('id', session.user.id)
            .single();

          if (profileData) {
            setIsAuthenticated(true);
            setIsAdmin(profileData.is_admin);

            const isComplete = Boolean(
              profileData.first_name && 
              profileData.last_name && 
              profileData.faculty && 
              profileData.department && 
              profileData.profile_image_url
            );

            setIsProfileComplete(isComplete);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
        setHasCheckedAuth(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) return null; // You can return a loading spinner here

  if (hasCheckedAuth) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
      return <Navigate to="/alumni/dashboard" replace />;
    }

    if (requireCompleteProfile && !isProfileComplete && !isAdmin) {
      return <Navigate to="/alumni/profile" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/admin/login" element={<AuthPage mode="login" isAdmin={true} />} />
            
            {/* Protected Alumni Routes */}
            <Route 
              path="/alumni/dashboard" 
              element={
                <ProtectedRoute requireCompleteProfile={true}>
                  <AlumniDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alumni/profile" 
              element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Alumni Routes */}
            <Route path="/alumni/directory" element={<AlumniDirectory />} />
            <Route path="/alumni/gallery" element={<Gallery />} />
            
            <Route 
              path="/alumni/payments" 
              element={
                <ProtectedRoute requireCompleteProfile={true}>
                  <PaymentsPage />
                </ProtectedRoute>
              } 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/panel" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />

            {/* Public Routes */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/news" element={<NewsPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
