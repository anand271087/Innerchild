import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'innerheal-web'
    }
  }
});

export async function testSupabaseConnection() {
  try {
    // First try a simple query to check connection
    const { error: healthCheckError } = await supabase
      .from('soul_chat_feedback')
      .select('count')
      .limit(1)
      .maybeSingle();

    if (healthCheckError) {
      console.error('Health check failed:', healthCheckError);
      return false;
    }

    // Also verify auth is working
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Auth check failed:', authError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
}

export async function createJourney(userId: string, prompt: string) {
  const { data, error } = await supabase
    .from('journeys')
    .insert([{ user_id: userId, prompt }])
    .select()
    .single();

  if (error) {
    console.error('Error creating journey:', error);
    throw error;
  }

  return data;
}

export async function saveAnalysis(journeyId: string, analysis: any) {
  const { error } = await supabase
    .from('analyses')
    .insert([{
      journey_id: journeyId,
      triggers: analysis.triggers || []
    }]);

  if (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
}

export async function saveExercises(journeyId: string, exercises: any) {
  const exerciseEntries = Object.entries(exercises)
    .filter(([type, exercise]) => exercise && !['error_response', 'service_pause', 'temporary_pause'].includes(type))
    .map(([type, exercise]) => ({
      journey_id: journeyId,
      exercise_type: type,
      title: exercise.title,
      goal: exercise.goal,
      steps: exercise.steps
    }));

  if (exerciseEntries.length === 0) return;

  const { error } = await supabase
    .from('exercises')
    .insert(exerciseEntries);

  if (error) {
    console.error('Error saving exercises:', error);
    throw error;
  }
}

export async function getJourneyHistory(userId: string) {
  const { data, error } = await supabase
    .from('journeys')
    .select(`
      *,
      analyses (*),
      exercises (*),
      journey_responses (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting journey history:', error);
    throw error;
  }

  return data || [];
}

export async function saveJourneyResponse(
  journeyId: string,
  heading: string,
  response: string,
  audioUrl?: string
) {
  const { error } = await supabase
    .from('journey_responses')
    .upsert([{
      journey_id: journeyId,
      heading,
      response,
      audio_url: audioUrl
    }], {
      onConflict: 'journey_id,heading'
    });

  if (error) {
    console.error('Error saving journey response:', error);
    throw error;
  }
}

export async function getJourneyResponses(journeyId: string) {
  const { data, error } = await supabase
    .from('journey_responses')
    .select('*')
    .eq('journey_id', journeyId);

  if (error) {
    console.error('Error getting journey responses:', error);
    throw error;
  }

  return data || [];
}