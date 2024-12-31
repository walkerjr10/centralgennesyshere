import { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TopNav } from "@/components/dashboard/TopNav";
import { DashboardHeader } from "@/components/dashboard/overview/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/overview/StatsOverview";
import { CompanyTypesSection } from "@/components/dashboard/overview/CompanyTypesSection";

// Lazy load the UsersSection to improve initial load time
const UsersSection = lazy(() => import("@/components/dashboard/UsersSection"));

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  // Use React Query for session management
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    retry: false
  });

  // Fetch user profile to get role
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id
  });

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/login");
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, session, sessionLoading]);

  // Reset to dashboard if user is not admin and tries to access users section
  useEffect(() => {
    if (profile && profile.role !== 'admin' && activeSection === 'users') {
      setActiveSection('dashboard');
    }
  }, [profile, activeSection]);

  if (sessionLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-[#4263EB]">Loading...</div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onSectionChange={setActiveSection} isAdmin={isAdmin} />
      
      <main className="w-full">
        <div className="px-6 lg:px-12 py-8">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-[#4263EB]">Loading section...</div>
            </div>
          }>
            {activeSection === "users" && isAdmin ? (
              <UsersSection />
            ) : (
              <>
                <DashboardHeader 
                  title="Visão Geral" 
                  subtitle="Análise consolidada - dezembro" 
                />
                <StatsOverview />
                <CompanyTypesSection />
              </>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Index;