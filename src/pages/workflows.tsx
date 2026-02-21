import { useState } from "react";
import { motion } from "framer-motion";
import { VoiceRecorder } from "@/ui/voice-recorder";
import { Copy, Plus, Send, Wand2, Briefcase, Calendar, CheckSquare, Settings } from "lucide-react";

export default function Workflows() {
  const [promptInput, setPromptInput] = useState("");
  const [runningWorkflow, setRunningWorkflow] = useState<string | null>(null);

  const predefinedWorkflows = [
    {
      id: "wf-1",
      title: "Daily Standup Prep",
      description: "Summarize your calendar, Jira tasks, and recent GitHub commits for the standard standup format.",
      icon: <Briefcase className="w-6 h-6 text-blue-500" />
    },
    {
      id: "wf-2",
      title: "Weekly Planning",
      description: "Analyze the previous week's accomplished tasks and draft next week's agenda automatically.",
      icon: <Calendar className="w-6 h-6 text-purple-500" />
    },
    {
      id: "wf-3",
      title: "Code Review Assistant",
      description: "Pull the latest PR diffs, check for standard code vulnerabilities, and summarize the changes.",
      icon: <CheckSquare className="w-6 h-6 text-emerald-500" />
    },
    {
      id: "wf-4",
      title: "Custom System Config",
      description: "Regenerate configurations based on the latest environment variables and notify the team.",
      icon: <Settings className="w-6 h-6 text-orange-500" />
    }
  ];

  const handleRunWorkflow = (wfId: string) => {
    setRunningWorkflow(wfId);
    setTimeout(() => {
      setRunningWorkflow(null);
    }, 2000);
  };

  const handleVoiceTranscript = (text: string) => {
    setPromptInput(text);
  };

  const handleVoiceComplete = (text: string) => {
    setPromptInput(text);
    // Automatically attempt to process it if we want
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Predefined Workflows</h1>
          <p className="text-muted-foreground mt-2">
            Powerful prompt templates disguised as intuitive workflows. Automate your complex routines effortlessly.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Create Custom</span>
        </button>
      </div>

      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm shadow-black/5 flex flex-col gap-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-indigo-500" />
          Voice-to-Workflow
        </h2>
        <p className="text-sm text-muted-foreground">
          Dictate a complex workflow on the go. Try saying, "Draft my agenda for tomorrow and prioritize my Jira tickets."
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1 bg-background border border-border rounded-xl px-4 py-3 flex items-center shadow-inner focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
            <input 
              type="text" 
              className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              placeholder="Type or dictate your workflow intent..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            {promptInput && (
              <button 
                onClick={() => setPromptInput("")} 
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <VoiceRecorder 
            onTranscriptChange={handleVoiceTranscript} 
            onRecordingComplete={handleVoiceComplete}
          />
          <button 
            className="flex items-center justify-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
            disabled={!promptInput.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {predefinedWorkflows.map((wf) => (
          <motion.div 
            key={wf.id}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden group transition-all"
          >
            {runningWorkflow === wf.id && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl"
              >
                <div className="flex items-center gap-3 bg-background px-4 py-2 rounded-full shadow-lg border border-border">
                  <Wand2 className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-sm font-medium">Running workflow...</span>
                </div>
              </motion.div>
            )}
            <div className="flex items-start justify-between">
              <div className="p-3 bg-muted rounded-xl">
                {wf.icon}
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100">
                <Copy size={16} />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold">{wf.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {wf.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <button 
                onClick={() => handleRunWorkflow(wf.id)}
                className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg text-sm font-semibold transition-colors w-full sm:w-auto"
              >
                Run Workflow
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
