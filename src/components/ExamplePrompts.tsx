import React from 'react';
import { Heart, DollarSign, Brain, Briefcase, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const categories = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Relationships",
    color: "bg-pink-100 text-pink-600",
    prompts: [
      "I struggle with trust in relationships because of childhood experiences with...",
      "I find myself people-pleasing in relationships because as a child..."
    ]
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Finance",
    color: "bg-green-100 text-green-600",
    prompts: [
      "I feel anxious about money because growing up we...",
      "I struggle with saving money because in my childhood..."
    ]
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Self Growth",
    color: "bg-purple-100 text-purple-600",
    prompts: [
      "I'm working on my self-worth because as a child I felt...",
      "I want to overcome my fear of failure that started when..."
    ]
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Career",
    color: "bg-blue-100 text-blue-600",
    prompts: [
      "I feel stuck in my career because of limiting beliefs from...",
      "I struggle with imposter syndrome at work because growing up..."
    ]
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Physical Image",
    color: "bg-yellow-100 text-yellow-600",
    prompts: [
      "My relationship with my body is affected by childhood experiences of...",
      "I want to heal my self-image because when I was young..."
    ]
  }
];

export default function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <div className="space-y-3">
              {category.prompts.map((prompt, promptIndex) => (
                <button
                  key={promptIndex}
                  onClick={() => onSelect(prompt)}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}