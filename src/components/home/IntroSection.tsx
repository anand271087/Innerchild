import React from 'react';
import { ScenarioCard } from './ScenarioCard';
import { SectionTitle } from '../shared/SectionTitle';
import { Sparkles } from 'lucide-react';

export default function IntroSection() {
  const scenarios = [
    {
      name: "Sarah",
      description: "always attracts partners who need \"fixing,\" just like she tried to help her troubled parent",
      rootCause: "Growing up with a troubled parent led to a deep-seated need to heal others",
      impact: "Finds herself emotionally drained in relationships, unable to focus on her own needs",
      image: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Mike",
      description: "works 80-hour weeks pursuing promotions, still trying to earn the validation his parents never gave",
      rootCause: "Childhood experiences of conditional love based on achievement",
      impact: "Measures self-worth through work success, struggles to find peace in the present",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Lisa",
      description: "says \"yes\" to everyone's requests, afraid that setting boundaries will make people abandon her",
      rootCause: "Early experiences of emotional withdrawal when expressing needs",
      impact: "Constantly overwhelmed by others' demands, struggles with self-advocacy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-white to-healing-mint/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Do These Stories Feel Familiar?"
          subtitle="Discover how childhood experiences shape your present patterns"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={index}
              {...scenario}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-12 h-12 text-healing-ocean" />
          </div>
          
          <div className="bg-white rounded-xl shadow-magical p-8 text-center">
            <h3 className="text-2xl font-bold text-healing-ocean mb-4 bg-gradient-to-r from-healing-ocean/10 via-healing-ocean/20 to-healing-ocean/10 py-2">
              Your patterns tell the story of your inner child
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Understanding these patterns is the first step toward healing. 
              <span className="block mt-2 font-medium text-healing-ocean">
                Our guided journey helps you transform unconscious reactions into conscious choices.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}