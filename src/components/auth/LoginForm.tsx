import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/ui/logo';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function LoginForm({ onToggleForm }: { onToggleForm: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2">
      <CardHeader className="space-y-2">
        <div className="mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="pl-9 bg-white text-black placeholder:text-gray-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="pl-9 bg-white text-black placeholder:text-gray-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-white hover:bg-primary/90 text-dark" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 text-primary font-semibold hover:text-primary/90" 
            onClick={onToggleForm}
          >
            Create Account
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}