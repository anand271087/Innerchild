import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export async function signup(email: string, password: string, name?: string) {
  // First, create the user account
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
    // Enhance error messages
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

// Rest of the file remains unchanged...