import OpenAI from 'openai';
import type { Exercise, ExerciseResponse } from '../types/exercises';

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

const ANALYSIS_PROMPT = `As an inner healing expert therapist, analyze the user's input and identify 3 or more key inner child triggers. 
For each trigger, provide detailed potential causes and a structured deep dive exercise with exactly 4 points and examples.

Your response should follow this exact format in JSON:

{
  "triggers": [
    {
      "trigger": "Fear of Abandonment",
      "causes": [
        "Early experiences of separation from caregivers",
        "Inconsistent emotional support in childhood",
        "Witnessing abandonment in family relationships"
      ],
      "exercise": "Deep Dive Exercise: 'Understanding Your Abandonment Pattern'\\n\\n1. Identify Your Earliest Memory:\\n   - When did you first feel abandoned or left behind?\\n   **Example: Age 5, when a parent traveled for work for an extended period**\\n   - What emotions surfaced during this experience?\\n   **Example: Feeling scared, alone, and wondering if they would return**\\n\\n2. Recognize Your Current Triggers:\\n   - List situations that activate your abandonment fears\\n   **Example: When someone doesn't respond to messages quickly**\\n   - Notice your emotional and physical responses\\n   **Example: Feeling anxious, checking phone repeatedly, heart racing**\\n\\n3. Examine Your Coping Patterns:\\n   - How do you protect yourself from abandonment?\\n   **Example: Becoming overly clingy in relationships**\\n   - What behaviors do you use to keep people close?\\n   **Example: Always being available, neglecting your own needs**\\n\\n4. Reframe Negative Thoughts:\\n   - Identify the negative self-talk that arises\\n   **Example: 'I'm not worthy of stable relationships'**\\n   - Transform these thoughts into compassionate truths\\n   **Example: 'I am worthy of love and healthy connections'**\\n\\n5. Create Your Safety Plan:\\n   - Develop self-soothing strategies\\n   **Example: Deep breathing while holding a comfort object**\\n   - List your reliable support system\\n   **Example: Three trusted friends you can call anytime**"
    }
  ]
}`;

const FALLBACK_RESPONSE: ExerciseResponse = {
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
    title: "Self-Love Affirmations",
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
  },
  journal_exercise: {
    title: "Root Cause Exploration",
    goal: "Uncover the origins of current patterns",
    steps: [
      "Describe a current challenging pattern",
      "Recall earliest memories of similar feelings",
      "Write a letter to your younger self",
      "List ways to support yourself now"
    ]
  },
  healing_ritual: {
    title: "Self-Soothing Practice",
    goal: "Create a nurturing response to triggers",
    steps: [
      "Identify your emotional triggers",
      "Create a calming environment",
      "Practice gentle self-touch or hugging",
      "Repeat loving mantras"
    ]
  },
  mirror_work: {
    title: "Compassionate Reflection",
    goal: "Build a loving relationship with yourself",
    steps: [
      "Look into your eyes in the mirror",
      "Express words of understanding",
      "Send love to your reflection",
      "Practice acceptance"
    ]
  },
  forgiveness_exercise: {
    title: "Healing Through Forgiveness",
    goal: "Release past hurts with compassion",
    steps: [
      "Write about what needs forgiveness",
      "Acknowledge the pain",
      "Express understanding for all involved",
      "Release with love"
    ]
  }
};

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey || 'your-api-key-here',
  dangerouslyAllowBrowser: true
});

export async function getChatResponse(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant', content: string }>
): Promise<ExerciseResponse> {
  if (!apiKey || apiKey === 'your-api-key-here') {
    console.info('Using fallback response (OpenAI API key not configured)');
    return FALLBACK_RESPONSE;
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
      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return FALLBACK_RESPONSE;
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return FALLBACK_RESPONSE;
  }
}

export async function getInnerChildAnalysis(message: string): Promise<any> {
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: ANALYSIS_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response content');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}