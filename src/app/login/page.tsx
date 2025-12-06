
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Key, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Container from '@/components/ui/Container';
//import { supabase } from '@/lib/supabase';
import { createClientSupabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn/*, signInWithGoogle*/ } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientSupabase();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/account');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) console.error(error);
  };

  return (
    <Container className="flex items-center justify-center py-16">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your adventure</p>
        </div>
        {/* <form onSubmit={handleSignIn} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
          </div>
          <div className="flex items-center justify-end">
            <Link href="/forgot-password">
              <span className="text-sm text-primary hover:underline">Forgot password?</span>
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
          </Button>
          
        </form> */}
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleGoogleLogin()}
          >
            <img
              src="https://stlkmeffboaouzmdgiia.supabase.co/storage/v1/object/public/media/images/google-logo-search-new-svgrepo-com.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        {/* <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup">
            <span className="font-semibold text-primary hover:underline">Sign Up</span>
          </Link>
        </div> */}
      </div>
    </Container>
  );
}
