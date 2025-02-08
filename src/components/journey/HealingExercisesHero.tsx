import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Eye, 
  PenTool, 
  Sparkles, 
  MessageCircle, 
  Feather 
} from 'lucide-react';

const exercises = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Reframing Worksheet",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Affirmation Exercise",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Visualization Exercise",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Journal Exercise",
    color: "from-teal-500 to-emerald-500"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Healing Ritual",
    color: "from-amber-500 to-yellow-500"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Mirror Work",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Feather className="w-6 h-6" />,
    title: "Forgiveness Exercise",
    color: "from-violet-500 to-purple-500"
  }
];

export default function HealingExercisesHero() {
  return (
    <div className="bg-white rounded-xl shadow-magical p-8 mb-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        Your Healing Exercise
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {exercises.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${exercise.color} rounded-lg opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative p-6 rounded-lg border border-gray-100 hover:border-healing-ocean transition-colors">
              <div className="w-12 h-12 rounded-lg bg-healing-ocean/10 text-healing-ocean flex items-center justify-center mb-4">
                {exercise.icon}
              </div>
              <h3 className="font-semibold text-gray-900">
                {exercise.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}