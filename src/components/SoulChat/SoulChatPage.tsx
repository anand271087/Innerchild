import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, MessageCircle, Send, Sparkles, Loader2 } from 'lucide-react';
import { getChatResponse } from '../../services/openai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const guidedPrompts = [
  {
    title: "Childhood Memories",
    prompts: [
      "I remember feeling hurt when...",
      "A happy childhood memory I have is...",
      "I wish my parents had understood that...",
      "The thing I needed most as a child was..."
    ]
  },
  {
    title: "Current Triggers",
    prompts: [
      "I feel most vulnerable when...",
      "When people criticize me, I...",
      "In relationships, I often feel...",
      "My biggest fear is..."
    ]
  },
  {
    title: "Inner Child Dialogue",
    prompts: [
      "Dear younger self, I want you to know...",
      "The part of me that feels scared needs...",
      "If my inner child could speak, they would say...",
      "Today, I choose to nurture myself by..."
    ]
  }
];

export default function SoulChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you explore and heal your inner child. You can choose from the guided prompts or share what's on your mind.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
        content: msg.text
      }));

      const response = await getChatResponse(inputText, conversationHistory);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Would you like to try one of our guided prompts instead?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInputText(prompt);
    setSelectedPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Soul Chat</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Guided Prompts Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-healing-ocean" />
                Guided Prompts
              </h2>
              <div className="space-y-4">
                {guidedPrompts.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{category.title}</h3>
                    <div className="space-y-2">
                      {category.prompts.map((prompt, promptIndex) => (
                        <button
                          key={promptIndex}
                          onClick={() => handlePromptSelect(prompt)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                            selectedPrompt === prompt
                              ? 'bg-healing-ocean text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-healing-ocean text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="flex items-center mb-2">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span className="font-medium">Inner Child Guide</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <Loader2 className="w-5 h-5 animate-spin text-healing-ocean" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Share your thoughts or choose a prompt..."
                    className="flex-1 rounded-lg border-gray-300 focus:ring-healing-ocean focus:border-healing-ocean"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}