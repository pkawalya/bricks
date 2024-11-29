import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/ui/logo';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+256\d{9}$/, 'Phone number must be in format: +256XXXXXXXXX'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

interface RegistrationFormProps {
  onToggleForm: () => void;
  onSignupSuccess: (email: string) => void;
}

export function RegistrationForm({ onToggleForm, onSignupSuccess }: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof registrationSchema>) {
    try {
      setIsLoading(true);
      await signUp(data.email, data.password, {
        name: data.name,
        phone: data.phone,
      });
      toast.success('Registration successful! Please verify your email.');
      onSignupSuccess(data.email);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
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
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Join The Brick and start earning through our referral program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="John Doe"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="+256XXXXXXXXX"
                        className="pl-9 bg-white text-black placeholder:text-gray-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs">
                    Must be a valid Ugandan phone number starting with +256
                  </FormMessage>
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
                        placeholder="Create a strong password"
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
              className="w-full bg-primary hover:bg-primary/90 text-white" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 text-primary font-semibold hover:text-primary/90" 
            onClick={onToggleForm}
          >
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}