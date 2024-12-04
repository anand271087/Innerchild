import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, ChevronRight, ChevronDown, Save, Mic, Square, Trash2 } from 'lucide-react';
import { useVoiceJournal } from '../hooks/useVoiceJournal';

interface Trigger {
  trigger: string;
  causes: string[];
  exercise: string;
}

interface AnalysisProps {
  isLoading: boolean;
  analysis: Trigger[] | null;
  error: string | null;
}

interface ExerciseStep {
  heading: string;
  content: string[];
  example: string;
}

function parseExerciseStep(text: string): ExerciseStep {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const heading = lines[0].split(':')[0];
  const example = text.match(/\*\*(.*?)\*\*/)?.[1] || '';
  const content = lines.slice(1).filter(line => !line.includes('**'));
  
  return { heading, content, example };
}

function VoiceInput({ triggerId, stepId }: { triggerId: number; stepId: number }) {
  const {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    deleteRecording
  } = useVoiceJournal({
    userId: 1,
    dayNumber: 1,
    customKey: `trigger-${triggerId}-step-${stepId}-voice`
  });

  return (
    <div className="flex justify-end space-x-2">
      {!audioURL ? (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
            isRecording
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-healing-ocean text-white hover:bg-opacity-90'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 mr-1" />
              Stop
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-1" />
              Record
            </>
          )}
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <audio controls className="h-8">
            <source src={audioURL} type="audio/webm" />
          </audio>
          <button
            onClick={deleteRecording}
            className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function InnerChildAnalysis({ isLoading, analysis, error }: AnalysisProps) {
  const [selectedTrigger, setSelectedTrigger] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (triggerId: number, stepId: number, value: string) => {
    const key = `trigger-${triggerId}-step-${stepId}`;
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveResponse = (triggerId: number, stepId: number) => {
    const key = `trigger-${triggerId}-step-${stepId}`;
    localStorage.setItem(key, responses[key] || '');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-healing-ocean animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Analysis Error</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-healing-mint/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Inner Child Triggers</h3>
        <p className="text-gray-600">
          Based on your input, we've identified the following triggers. Click on each trigger to explore its potential causes and deep dive exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {analysis.map((item, index) => {
          const isSelected = selectedTrigger === index;
          const exerciseLines = item.exercise.split('\n\n').filter(Boolean);
          const title = exerciseLines[0];
          const steps = exerciseLines.slice(1).map(parseExerciseStep);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setSelectedTrigger(isSelected ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-healing-ocean">
                  <strong>Trigger {index + 1}:</strong> {item.trigger}
                </h4>
                {isSelected ? (
                  <ChevronDown className="w-5 h-5 text-healing-ocean" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-healing-ocean" />
                )}
              </button>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                  >
                    <div className="p-6">
                      <div className="mb-6">
                        <h5 className="font-medium mb-2"><strong>Potential Causes:</strong></h5>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {item.causes.map((cause, causeIndex) => (
                            <li key={causeIndex}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h5 className="font-bold mb-4">{title}</h5>
                        <div className="space-y-8">
                          {steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="bg-white rounded-lg p-4 shadow-sm">
                              <h6 className="font-bold text-lg mb-3">{step.heading}</h6>
                              {step.content.map((line, lineIndex) => (
                                <p key={lineIndex} className="text-gray-700 mb-2">{line}</p>
                              ))}
                              <div className="bg-healing-mint/10 p-3 rounded-lg mb-4">
                                <p className="font-bold text-healing-ocean">{step.example}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="relative">
                                  <textarea
                                    value={responses[`trigger-${index}-step-${stepIndex}`] || ''}
                                    onChange={(e) => handleResponseChange(index, stepIndex, e.target.value)}
                                    placeholder="Write your response here..."
                                    className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
                                  />
                                  <div className="absolute bottom-2 right-2">
                                    <VoiceInput triggerId={index} stepId={stepIndex} />
                                  </div>
                                </div>
                                <button
                                  onClick={() => saveResponse(index, stepIndex)}
                                  className="flex items-center px-4 py-2 text-sm text-healing-ocean hover:bg-healing-ocean/10 rounded-lg transition-colors"
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Response
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}