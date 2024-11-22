import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Mock responses for when API is unavailable
const FALLBACK_RESPONSES = [
  "I hear how challenging that experience was for you. Your feelings are valid, and it's okay to acknowledge the impact it had on you. Would you like to explore what your inner child needed in that moment?",
  "That sounds like a meaningful experience. I can sense the depth of emotion in your words. How does your inner child feel when you reflect on this?",
  "You're showing great courage in exploring these feelings. What kind of support would feel most nurturing for you right now?",
  "I notice the strength in your reflection. You're developing such beautiful awareness. How can we help your inner child feel more secure in these moments?",
  "Thank you for sharing that with me. It takes trust to be vulnerable. Would you like to explore what your inner child might need in similar situations?"
];

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an expert inner child healing therapist:
Give an exercise for each of the following: 
- Suggest detailed worksheet with questionsthat help in reframing negative self-talk into nurturing inner dialogue
- Give an affirmation exercise to help in healing this inner child personality trait
- Give me a visualization exercise to help in healing this inner child personality trait
- Give me a journal exercise to help unearth the root of this inner child personality trait
- Create a ritual whenever this inner child personality trait is triggered that helps in healing this inner child personality trait
- Give me some mirror work to help in soothing this inner child personality trait
- Give a forgiveness exercise to help in healing this inner child personality trait
- Output: For each exercise, give the title of the exercise, goal of exercise in one line, how to do the exercise as a series of detailed steps that is easy to follow
`;

export async function getChatResponse(message: string, conversationHistory: Array<{ role: 'user' | 'assistant', content: string }>) {
  // If no API key is provided, use fallback responses
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.info('Using fallback responses (OpenAI API key not configured)');
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    return response.choices[0]?.message?.content || 
      "I apologize, but I'm having trouble responding right now. Could you please rephrase your message?";
  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    // Handle specific error cases
    if (error.error?.type === 'insufficient_quota') {
      return "I apologize, but I'm currently in rest mode to recharge. Please try again later, or feel free to explore our guided prompts for self-reflection.";
    }

    if (error.status === 429) {
      return "I'm taking a brief pause to process our conversation. In the meantime, would you like to explore one of our guided meditation exercises?";
    }

    // Use fallback responses for other errors
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
}