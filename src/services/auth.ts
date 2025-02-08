import { supabase } from './supabase';
import type { Provider } from '@supabase/supabase-js';

export async function signInWithProvider(provider: Provider) {
  try {
    // First check if we can connect to Supabase
    const { error: healthCheckError } = await supabase.from('profiles').select('count').limit(1);
    if (healthCheckError) {
      throw new Error('Unable to connect to authentication service. Please try again later.');
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      console.error('OAuth error:', error);
      throw error;
    }

    // Check if we have a valid URL to redirect to
    if (data?.url) {
      // Save the current path for redirect after auth
      localStorage.setItem('authReturnPath', window.location.pathname);
      // Redirect to the OAuth provider
      window.location.href = data.url;
    } else {
      throw new Error('No valid authentication URL received');
    }

    return data;
  } catch (error: any) {
    console.error('Social login error:', error);
    throw new Error(error.message || 'Failed to sign in with social provider');
  }
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message.includes('Invalid')) {
      throw new Error('Invalid email or password');
    } else {
      throw error;
    }
  }

  return data.user;
}

export async function signup(email: string, password: string, name?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name
      }
    }
  });

  if (error) {
    if (error.message.includes('weak')) {
      throw new Error('Password is too weak. Please follow the password requirements.');
    } else if (error.message.includes('already registered')) {
      throw new Error('User already registered');
    } else {
      throw error;
    }
  }

  return data.user;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });

  if (error) {
    if (error.message.includes('not found')) {
      throw new Error('No account found with this email address');
    } else {
      throw error;
    }
  }
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    if (error.message.includes('weak')) {
      throw new Error('Password is too weak. Please follow the password requirements.');
    } else if (error.message.includes('auth')) {
      throw new Error('Please use a valid password reset link');
    } else {
      throw error;
    }
  }

  return data.user;
}