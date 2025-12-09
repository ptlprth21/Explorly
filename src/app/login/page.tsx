
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
        <form onSubmit={handleSignIn} className="space-y-6">
  <div>
    <Label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700"
    >
      Email address
    </Label>
    <div className="mt-1">
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  </div>

  <div>
    <Label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700"
    >
      Password
    </Label>
    <div className="mt-1">
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
      />
      <Label
        htmlFor="remember-me"
        className="ml-2 block text-sm text-gray-900"
      >
        Remember me
      </Label>
    </div>

    <div className="text-sm">
      <Link
        href="/forgot-password"
        className="font-medium text-primary hover:text-primary-dark"
      >
        Forgot your password?
      </Link>
    </div>
  </div>

  {error && <p className="text-red-500 text-sm">{error}</p>}

  <div>
    <Button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign in"}
    </Button>
  </div>
</form>

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
