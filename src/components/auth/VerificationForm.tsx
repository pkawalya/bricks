import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { KeyRound } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { supabase } from '@/lib/supabase';

const verificationSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export function VerificationForm({ email, onVerified }: { email: string; onVerified: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(data: z.infer<typeof verificationSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: data.code,
        type: 'signup',
      });

      if (error) throw error;
      
      toast.success('Email verified successfully!');
      onVerified();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed. Please try again.');
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
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Verification Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter 6-digit code"
                        className="pl-9 bg-white text-black placeholder:text-gray-500 text-center tracking-widest"
                        maxLength={6}
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
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{' '}
          <Button 
            variant="link" 
            className="p-0 text-primary font-semibold hover:text-primary/90"
            onClick={async () => {
              try {
                const { error } = await supabase.auth.resend({
                  type: 'signup',
                  email,
                });
                if (error) throw error;
                toast.success('Verification code resent!');
              } catch (error) {
                toast.error('Failed to resend code. Please try again.');
              }
            }}
          >
            Resend Code
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}