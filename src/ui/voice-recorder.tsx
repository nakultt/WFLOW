import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mic, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

interface VoiceRecorderProps {
  onTranscriptChange: (text: string) => void;
  onRecordingComplete: (text: string) => void;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscriptChange,
  onRecordingComplete,
  className = "",
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasSupport] = useState(
    () => typeof window !== "undefined" && 
      (!!window.SpeechRecognition || !!window.webkitSpeechRecognition)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      return;
    }

    const rec = new SpeechRecognitionAPI();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    // @ts-expect-error - event type
    rec.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      onTranscriptChange(finalTranscript || interimTranscript);
      // Wait for it to become final
      if (finalTranscript) {
        onRecordingComplete(finalTranscript.trim());
      }
    };

    // @ts-expect-error - event type
    rec.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = rec;
  }, [onTranscriptChange, onRecordingComplete]);

  const toggleRecording = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Could not start recognition:", e);
      }
    }
  }, [isRecording]);

  if (!hasSupport) {
    return (
      <div className={`text-xs text-red-500 font-medium ${className}`}>
        Speech recognition not supported in this browser.
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleRecording}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors duration-300 z-10 ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
        }`}
        title={isRecording ? "Stop Dictation" : "Start Voice Dictation"}
      >
        {isRecording ? <Square fill="currentColor" size={18} /> : <Mic size={22} />}
      </motion.button>
      
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
            }}
            className="absolute inset-0 rounded-full border-2 border-red-500 opacity-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.6 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: 0.2,
              repeatType: "reverse",
            }}
            className="absolute inset-0 rounded-full border-2 border-red-400 opacity-30 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceRecorder;
