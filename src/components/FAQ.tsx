import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "How long does inner child healing take?",
      answer: "The journey of inner child healing is unique to each person. While our 42-day guided meditation program provides a structured start, healing is an ongoing process that can continue to deepen over time."
    },
    {
      question: "Is inner child work suitable for everyone?",
      answer: "Yes, inner child work can benefit anyone looking to improve their emotional well-being and understand themselves better. However, if you're dealing with severe trauma, we recommend working with a licensed therapist alongside our program."
    },
    {
      question: "What can I expect from the healing process?",
      answer: "You may experience a range of emotions, increased self-awareness, improved relationships, and better emotional regulation. The process often involves uncovering and processing past experiences while developing new coping mechanisms."
    },
    {
      question: "How is AI used in the life story analysis?",
      answer: "Our AI system analyzes patterns in your life story to identify recurring themes, emotional triggers, and potential areas for healing. It provides personalized insights while maintaining complete confidentiality."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="frequently-asked-questions" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}