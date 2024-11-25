import OpenAI from 'openai';
import type { Exercise, ExerciseResponse } from '../types/exercises';

const FALLBACK_RESPONSES: ExerciseResponse[] = [
  {
    reframing_worksheet: {
      title: "Inner Child Dialogue Transformation",
      goal: "Transform negative self-talk into nurturing inner dialogue",
      steps: [
        "Write down a negative thought you often have",
        "Identify when this thought first appeared in childhood",
        "Write a compassionate response as if speaking to your younger self",
        "Create an affirmation based on this nurturing response"
      ]
    },
    affirmation_exercise: {
      title: "Mirror of Self-Love",
      goal: "Develop self-compassion through daily affirmations",
      steps: [
        "Stand in front of a mirror each morning",
        "Place your hand on your heart",
        "Speak three loving affirmations to your reflection",
        "Notice and embrace any emotions that arise"
      ]
    },
    visualization_exercise: {
      title: "Safe Haven Meditation",
      goal: "Create a mental sanctuary for your inner child",
      steps: [
        "Find a quiet space and get comfortable",
        "Visualize a safe, peaceful place from childhood",
        "Imagine meeting your younger self there",
        "Offer comfort and support to your inner child"
      ]
    }
  }
];

const ERROR_RESPONSE: ExerciseResponse = {
  error_response: {
    title: "Response Unavailable",
    goal: "Provide alternative support",
    steps: [
      "Take a deep breath",
      "Consider trying one of our guided exercises",
      "Remember that healing is a journey",
      "Feel free to ask another question"
    ]
  }
};

const SERVICE_PAUSE: ExerciseResponse = {
  service_pause: {
    title: "Service Rest Period",
    goal: "Provide alternative support during API unavailability",
    steps: [
      "Take this moment to reflect",
      "Try our guided meditation exercises",
      "Practice self-compassion",
      "Return to continue your journey later"
    ]
  }
};

const TEMPORARY_PAUSE: ExerciseResponse = {
  temporary_pause: {
    title: "Brief Pause",
    goal: "Manage high activity period",
    steps: [
      "Take a mindful break",
      "Explore our meditation library",
      "Practice a breathing exercise",
      "Return in a few moments"
    ]
  }
};

const SYSTEM_PROMPT = `You are an expert inner child healing therapist. 

Give an exercise for each of the following: 
- Suggest detailed worksheet with questionsthat help in reframing negative self-talk into nurturing inner dialogue
- Give an affirmation exercise to help in healing this inner child personality trait
- Give me a visualization exercise to help in healing this inner child personality trait
- Give me a journal exercise to help unearth the root of this inner child personality trait
- Create a ritual whenever this inner child personality trait is triggered that helps in healing this inner child personality trait
- Give me some mirror work to help in soothing this inner child personality trait
- Give a forgiveness exercise to help in healing this inner child personality trait

- Output:
For each response, provide exercises in the following JSON format:

{
  "reframing_worksheet": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "affirmation_exercise": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "visualization_exercise": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "journal_exercise": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "healing_ritual": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "mirror_work": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },
  "forgiveness_exercise": {
    "title": "Exercise title",
    "goal": "One-line goal",
    "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
  }
}

Always include all seven exercise types in your response. Ensure the response is valid JSON.`;

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey || 'your-api-key-here',
  dangerouslyAllowBrowser: true
});

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function getChatResponse(
  message: string, 
  conversationHistory: ChatMessage[]
): Promise<ExerciseResponse> {
  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey === 'your-api-key-here') {
    console.info('Using fallback responses (OpenAI API key not configured)');
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response content');
    }

    try {
      const parsedResponse = JSON.parse(content) as ExerciseResponse;
      
      // Validate the response has the required structure
      if (!parsedResponse.reframing_worksheet || 
          !parsedResponse.affirmation_exercise || 
          !parsedResponse.visualization_exercise) {
        console.error('Invalid response structure:', parsedResponse);
        return FALLBACK_RESPONSES[0];
      }

      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      return ERROR_RESPONSE;
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    if (error.error?.type === 'insufficient_quota') {
      return SERVICE_PAUSE;
    }

    if (error.status === 429) {
      return TEMPORARY_PAUSE;
    }

    return FALLBACK_RESPONSES[0];
  }
}