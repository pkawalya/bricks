import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

export function UserDashboard() {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user?.user_metadata.name}</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dashboard content will be added here */}
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="font-semibold mb-2">Your Referral Link</h2>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="font-semibold mb-2">Total Earnings</h2>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="font-semibold mb-2">Downline Members</h2>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}