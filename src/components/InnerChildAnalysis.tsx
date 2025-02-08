import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, ChevronRight, ChevronLeft, Play, Pause, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResponseInput from './journey/ResponseInput';
import { getJourneyResponses } from '../services/supabase';
import { supabase } from '../services/supabase';

interface AnalysisProps {
  isLoading: boolean;
  analysis: any[] | null;
  error: string | null;
  journeyId?: string;
  onTabChange?: (tab: 'analysis' | 'exercises') => void;
}

export default function InnerChildAnalysis({ 
  isLoading, 
  analysis, 
  error, 
  journeyId, 
  onTabChange 
}: AnalysisProps) {
  const navigate = useNavigate();
  const [selectedTrigger, setSelectedTrigger] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [savedResponses, setSavedResponses] = useState<any[]>([]);
  const [isLoadingResponses, setIsLoadingResponses] = useState(false);
  
  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSealingPlaying, setIsSealingPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isSealingAudioLoading, setIsSealingAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [sealingAudioError, setSealingAudioError] = useState<string | null>(null);
  const [mainCurrentTime, setMainCurrentTime] = useState(0);
  const [mainDuration, setMainDuration] = useState(0);
  const [sealingCurrentTime, setSealingCurrentTime] = useState(0);
  const [sealingDuration, setSealingDuration] = useState(0);
  
  // Create audio elements
  const [mainAudio] = useState(() => new Audio());
  const [sealingAudio] = useState(() => new Audio());
  
  // Add new state for step navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const loadSavedResponses = useCallback(async () => {
    if (!journeyId) return;

    setIsLoadingResponses(true);
    try {
      const responses = await getJourneyResponses(journeyId);
      setSavedResponses(responses);
      
      const responseMap: Record<string, string> = {};
      responses.forEach(response => {
        responseMap[response.heading] = response.response;
      });
      setResponses(responseMap);
    } catch (err) {
      console.error('Failed to load responses:', err);
    } finally {
      setIsLoadingResponses(false);
    }
  }, [journeyId]);

  useEffect(() => {
    loadSavedResponses();
  }, [loadSavedResponses]);

  // Load meditation audio from Supabase
  useEffect(() => {
    const loadMeditationAudio = async () => {
      setIsAudioLoading(true);
      setAudioError(null);
      
      try {
        // First try to get a signed URL
        const { data: signedUrlData } = await supabase.storage
          .from('meditation')
          .createSignedUrl('Dear Inner Me.mp3', 3600); // 1 hour expiry

        if (signedUrlData?.signedUrl) {
          mainAudio.src = signedUrlData.signedUrl;
          await mainAudio.load();
        } else {
          // Fallback to direct download if signed URL fails
          const { data, error } = await supabase.storage
            .from('meditation')
            .download('Dear Inner Me.mp3');
            
          if (error) throw error;
          
          if (data) {
            const url = URL.createObjectURL(data);
            mainAudio.src = url;
            await mainAudio.load();
          }
        }
      } catch (err) {
        console.error('Error loading meditation audio:', err);
        setAudioError('Failed to load meditation audio');
      } finally {
        setIsAudioLoading(false);
      }
    };

    loadMeditationAudio();

    return () => {
      if (mainAudio.src && mainAudio.src.startsWith('blob:')) {
        URL.revokeObjectURL(mainAudio.src);
      }
    };
  }, [mainAudio]);

  // Add new useEffect for loading sealing meditation
  useEffect(() => {
    const loadSealingMeditationAudio = async () => {
      setIsSealingAudioLoading(true);
      setSealingAudioError(null);
      
      try {
        // First try to get a signed URL
        const { data: signedUrlData } = await supabase.storage
          .from('meditation')
          .createSignedUrl('Sealing With Love.mp3', 3600); // 1 hour expiry

        if (signedUrlData?.signedUrl) {
          sealingAudio.src = signedUrlData.signedUrl;
          await sealingAudio.load();
        } else {
          // Fallback to direct download if signed URL fails
          const { data, error } = await supabase.storage
            .from('meditation')
            .download('Sealing With Love.mp3');
            
          if (error) throw error;
          
          if (data) {
            const url = URL.createObjectURL(data);
            sealingAudio.src = url;
            await sealingAudio.load();
          }
        }
      } catch (err) {
        console.error('Error loading sealing meditation audio:', err);
        setSealingAudioError('Failed to load sealing meditation audio');
      } finally {
        setIsSealingAudioLoading(false);
      }
    };

    loadSealingMeditationAudio();

    return () => {
      if (sealingAudio.src && sealingAudio.src.startsWith('blob:')) {
        URL.revokeObjectURL(sealingAudio.src);
      }
    };
  }, [sealingAudio]);

  // Handle main meditation audio
  useEffect(() => {
    const handleMainAudioLoad = () => {
      setIsAudioLoading(false);
      setAudioError(null);
      setMainDuration(mainAudio.duration);
    };

    const handleMainAudioError = (e: ErrorEvent) => {
      console.error('Main audio error:', e);
      setIsAudioLoading(false);
      setAudioError('Failed to load meditation audio. Please try refreshing the page.');
      setIsPlaying(false);
    };

    const handleMainAudioEnded = () => {
      setIsPlaying(false);
    };

    const handleMainAudioTimeUpdate = () => {
      setMainCurrentTime(mainAudio.currentTime);
    };

    mainAudio.addEventListener('loadeddata', handleMainAudioLoad);
    mainAudio.addEventListener('error', handleMainAudioError);
    mainAudio.addEventListener('ended', handleMainAudioEnded);
    mainAudio.addEventListener('timeupdate', handleMainAudioTimeUpdate);
    
    return () => {
      mainAudio.removeEventListener('loadeddata', handleMainAudioLoad);
      mainAudio.removeEventListener('error', handleMainAudioError);
      mainAudio.removeEventListener('ended', handleMainAudioEnded);
      mainAudio.removeEventListener('timeupdate', handleMainAudioTimeUpdate);
      mainAudio.pause();
      setIsPlaying(false);
    };
  }, [mainAudio]);

  // Handle sealing meditation audio
  useEffect(() => {
    const handleSealingAudioLoad = () => {
      setIsSealingAudioLoading(false);
      setSealingAudioError(null);
      setSealingDuration(sealingAudio.duration);
    };

    const handleSealingAudioError = (e: ErrorEvent) => {
      console.error('Sealing audio error:', e);
      setIsSealingAudioLoading(false);
      setSealingAudioError('Failed to load sealing meditation audio. Please try refreshing the page.');
      setIsSealingPlaying(false);
    };

    const handleSealingAudioEnded = () => {
      setIsSealingPlaying(false);
    };

    const handleSealingAudioTimeUpdate = () => {
      setSealingCurrentTime(sealingAudio.currentTime);
    };

    sealingAudio.addEventListener('loadeddata', handleSealingAudioLoad);
    sealingAudio.addEventListener('error', handleSealingAudioError);
    sealingAudio.addEventListener('ended', handleSealingAudioEnded);
    sealingAudio.addEventListener('timeupdate', handleSealingAudioTimeUpdate);
    
    return () => {
      sealingAudio.removeEventListener('loadeddata', handleSealingAudioLoad);
      sealingAudio.removeEventListener('error', handleSealingAudioError);
      sealingAudio.removeEventListener('ended', handleSealingAudioEnded);
      sealingAudio.removeEventListener('timeupdate', handleSealingAudioTimeUpdate);
      sealingAudio.pause();
      setIsSealingPlaying(false);
    };
  }, [sealingAudio]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMainTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * mainDuration;
    mainAudio.currentTime = newTime;
    setMainCurrentTime(newTime);
  };

  const handleSealingTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * sealingDuration;
    sealingAudio.currentTime = newTime;
    setSealingCurrentTime(newTime);
  };

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        await mainAudio.pause();
      } else {
        if (isSealingPlaying) {
          await sealingAudio.pause();
          setIsSealingPlaying(false);
        }
        await mainAudio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Error playing audio:', err);
      setAudioError('Failed to play meditation audio');
    }
  };

  const toggleSealingPlay = async () => {
    try {
      if (isSealingPlaying) {
        await sealingAudio.pause();
      } else {
        if (isPlaying) {
          await mainAudio.pause();
          setIsPlaying(false);
        }
        await sealingAudio.play();
      }
      setIsSealingPlaying(!isSealingPlaying);
    } catch (err) {
      console.error('Error playing sealing audio:', err);
      setSealingAudioError('Failed to play sealing meditation audio');
    }
  };

  const handleResponseChange = (triggerId: number, stepId: number, value: string) => {
    // Adjust the step ID to match the correct step number (add 1)
    const adjustedStepId = stepId + 1;
    const key = `trigger-${triggerId}-step-${adjustedStepId}`;
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      // Stop any playing audio before changing steps
      if (isPlaying) {
        mainAudio.pause();
        setIsPlaying(false);
      }
      if (isSealingPlaying) {
        sealingAudio.pause();
        setIsSealingPlaying(false);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      // Stop any playing audio before changing steps
      if (isPlaying) {
        mainAudio.pause();
        setIsPlaying(false);
      }
      if (isSealingPlaying) {
        sealingAudio.pause();
        setIsSealingPlaying(false);
      }
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading || isLoadingResponses) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-healing-ocean animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-3">
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

  if (!analysis || analysis.length === 0) {
    return (
      <div className="bg-yellow-50 rounded-lg p-3">
        <p className="text-yellow-700">No analysis results available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Indicator */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Healing Journey</h2>
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-healing-ocean transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Opening Meditation</span>
          <span>Analysis</span>
          <span>Closing Meditation</span>
          <span>Exercises</span>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Step 1: Opening Meditation</h3>
              <div className="bg-healing-mint/10 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={togglePlay}
                    disabled={isAudioLoading}
                    className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-3 sm:space-x-0 px-4 py-3 sm:p-0 bg-healing-ocean sm:bg-transparent text-white sm:text-healing-ocean rounded-lg sm:rounded-none hover:bg-opacity-90 sm:hover:bg-transparent transition-colors disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-healing-ocean sm:bg-white flex items-center justify-center">
                      {isAudioLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </div>
                    <span className="font-medium sm:hidden">
                      {isAudioLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'} Meditation
                    </span>
                  </button>
                  <div className="flex-1">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-2">Dear Inner Me - Guided Meditation</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Begin with this meditation before journaling. This gentle practice will guide you into a calm, open state, allowing you to reconnect with your inner child and create a safe space for self-expression.
                      </p>
                      {audioError && (
                        <p className="text-red-600 text-sm mt-2">{audioError}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <div 
                        className="h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
                        onClick={handleMainTimelineClick}
                      >
                        <div 
                          className="absolute h-full bg-healing-ocean rounded-full transition-all duration-100"
                          style={{ width: `${(mainCurrentTime / mainDuration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{formatTime(mainCurrentTime)}</span>
                        <span>{formatTime(mainDuration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Step 2: Trigger Analysis and Journaling</h3>
              <div className="bg-healing-mint/10 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold mb-3">5-Step Analysis Framework</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-healing-ocean">1. Identify Your Earliest Memory</p>
                    <p className="text-sm text-gray-600 ml-4">When did you first experience this trigger? What emotions surfaced?</p>
                  </div>
                  <div>
                    <p className="font-medium text-healing-ocean">2. Recognize Your Current Triggers</p>
                    <p className="text-sm text-gray-600 ml-4">What situations activate these feelings now? Notice your emotional and physical responses.</p>
                  </div>
                  <div>
                    <p className="font-medium text-healing-ocean">3. Examine Your Coping Patterns</p>
                    <p className="text-sm text-gray-600 ml-4">How do you protect yourself? What behaviors do you use to feel safe?</p>
                  </div>
                  <div>
                    <p className="font-medium text-healing-ocean">4. Reframe Negative Thoughts</p>
                    <p className="text-sm text-gray-600 ml-4">What negative self-talk arises? Transform these into compassionate truths.</p>
                  </div>
                  <div>
                    <p className="font-medium text-healing-ocean">5. Create Your Safety Plan</p>
                    <p className="text-sm text-gray-600 ml-4">Develop self-soothing strategies and identify your support system.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {analysis.map((item, index) => {
                  const isSelected = selectedTrigger === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => setSelectedTrigger(isSelected ? null : index)}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-healing-ocean text-left">
                            <strong>Trigger {index + 1}:</strong> {item.trigger}
                          </h4>
                          {!isSelected && (
                            <p className="text-sm text-gray-500 mt-1">Click to begin journaling</p>
                          )}
                        </div>
                        <div className={`ml-3 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>
                          <ChevronLeft className="w-5 h-5 text-healing-ocean" />
                        </div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {isSelected && (
                          <div className="p-4 space-y-6">
                            <div>
                              <h5 className="font-medium mb-2">Potential Causes:</h5>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {item.causes.map((cause: string, causeIndex: number) => (
                                  <li key={causeIndex} className="text-sm">{cause}</li>
                                ))}
                              </ul>
                            </div>

                            {item.exercise.split('\n\n').map((step: string, stepIndex: number) => {
                              if (stepIndex === 0) return null;
                              
                              const lines = step.split('\n');
                              const heading = lines[0].split(':')[0];
                              const content = lines.slice(1);
                              const example = step.match(/\*\*(.*?)\*\*/)?.[1];
                              
                              // Adjust the step number to match the correct step (subtract 1)
                              const adjustedStepIndex = stepIndex - 1;
                              const responseKey = `trigger-${index}-step-${stepIndex}`;
                              const savedResponse = savedResponses.find(r => r.heading === responseKey);
                              const isResponseSaved = !!savedResponse;

                              return (
                                <div key={stepIndex}>
                                  <h5 className="font-medium mb-2">{heading}</h5>
                                  {content.map((line, lineIndex) => (
                                    <p key={lineIndex} className="text-sm text-gray-700 mb-2">
                                      {line.replace(/\*\*.*?\*\*/g, '')}
                                    </p>
                                  ))}
                                  {example && (
                                    <div className="bg-healing-mint/10 p-2 rounded-lg mb-3">
                                      <p className="text-sm font-bold text-healing-ocean">{example}</p>
                                    </div>
                                  )}
                                  <ResponseInput
                                    triggerId={index}
                                    stepId={adjustedStepIndex}
                                    journeyId={journeyId}
                                    value={responses[responseKey] || ''}
                                    onChange={(value) => handleResponseChange(index, adjustedStepIndex, value)}
                                    onSave={() => {
                                      console.log('Response saved successfully');
                                    }}
                                    isInitiallySaved={isResponseSaved}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Step 3: Closing Meditation</h3>
              <div className="bg-healing-mint/10 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={toggleSealingPlay}
                    disabled={isSealingAudioLoading}
                    className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-3 sm:space-x-0 px-4 py-3 sm:p-0 bg-healing-ocean sm:bg-transparent text-white sm:text-healing-ocean rounded-lg sm:rounded-none hover:bg-opacity-90 sm:hover:bg-transparent transition-colors disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-healing-ocean sm:bg-white flex items-center justify-center">
                      {isSealingAudioLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : isSealingPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </div>
                    <span className="font-medium sm:hidden">
                      {isSealingAudioLoading ? 'Loading...' : isSealingPlaying ? 'Pause' : 'Play'} Sealing Meditation
                    </span>
                  </button>
                  <div className="flex-1">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-2">Seal with Love - Closing Meditation</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        A gentle closing meditation to embrace your inner child with love, integrating the emotions and insights uncovered during journaling.
                      </p>
                      {sealingAudioError && (
                        <p className="text-red-600 text-sm mt-2">{sealingAudioError}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <div 
                        className="h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
                        onClick={handleSealingTimelineClick}
                      >
                        <div 
                          className="absolute h-full bg-healing-ocean rounded-full transition-all duration-100"
                          style={{ width: `${(sealingCurrentTime / sealingDuration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{formatTime(sealingCurrentTime)}</span>
                        <span>{formatTime(sealingDuration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Step 4: Healing Exercises</h3>
              <div className="bg-healing-mint/10 rounded-lg p-4 sm:p-6">
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">Continue Your Healing Journey</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Now that you've completed your meditation and journaling, deepen your healing with our curated set of exercises designed specifically for your inner child patterns. These exercises will help you integrate the insights you've gained and create lasting transformation.
                  </p>
                  <div className="flex justify-start">
                    <button
                      onClick={() => onTabChange?.('exercises')}
                      className="inline-flex items-center px-6 py-3 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      <span className="font-medium">Begin Healing Exercises</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousStep}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'bg-white text-healing-ocean hover:bg-healing-ocean hover:text-white'
          }`}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous Step
        </button>

        <button
          onClick={currentStep === totalSteps ? () => onTabChange?.('exercises') : goToNextStep}
          className="flex items-center px-6 py-3 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {currentStep === totalSteps ? (
            <>
              <Heart className="w-5  h-5 mr-2" />
              Begin Exercises
            </>
          ) : (
            <>
              Next Step
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}