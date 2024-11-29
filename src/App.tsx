import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { RegistrationForm } from '@/components/auth/RegistrationForm';
import { LoginForm } from '@/components/auth/LoginForm';
import { VerificationForm } from '@/components/auth/VerificationForm';
import { useAuth } from '@/hooks/useAuth';
import { UserDashboard } from '@/components/dashboard/UserDashboard';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <UserDashboard />;
  }

  if (verificationEmail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <VerificationForm 
          email={verificationEmail} 
          onVerified={() => {
            setVerificationEmail(null);
            setShowLogin(true);
          }} 
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {showLogin ? (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      ) : (
        <RegistrationForm 
          onToggleForm={() => setShowLogin(true)} 
          onSignupSuccess={(email) => setVerificationEmail(email)}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;