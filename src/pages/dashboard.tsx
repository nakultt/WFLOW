import { motion } from "framer-motion";
import { TrendingUp, Calendar, AlertCircle, CheckCircle2, Clock, PlayCircle } from "lucide-react";

export default function Dashboard() {
  const insights = [
    {
      id: "i1",
      title: "Tomorrow's Overview",
      description: "You have 3 meetings tomorrow. I've drafted your agenda and prioritized your Jira tickets automatically.",
      type: "predictive",
      icon: <Calendar className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: "i2",
      title: "Optimization Suggestion",
      description: "You've run 'Daily Standup Prep' 4 times this week. Would you like to schedule it to run automatically at 8:45 AM?",
      type: "suggestion",
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      id: "i3",
      title: "Workflow Anomaly",
      description: "The API integration for 'Code Review Assistant' took 40% longer than usual today.",
      type: "alert",
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-500/10 border-orange-500/20"
    }
  ];

  const recentExecutions = [
    { id: 1, name: "Daily Standup Prep", time: "2 hours ago", status: "success", duration: "1.2s" },
    { id: 2, name: "Weekly Planning", time: "Yesterday", status: "success", duration: "3.4s" },
    { id: 3, name: "Code Review Assistant", time: "Yesterday", status: "warning", duration: "8.1s" },
    { id: 4, name: "Jira Ticket Sync", time: "2 days ago", status: "success", duration: "2.1s" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Predictive Analytics</h1>
        <p className="text-muted-foreground mt-2">
          From execution to actionable insights. Your intelligent agent monitors and predicts your workflow needs before they arise.
        </p>
      </div>

      {/* Hero Insights Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`p-5 rounded-2xl border ${insight.color} relative overflow-hidden flex flex-col justify-between`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-background/50 rounded-lg backdrop-blur-sm">
                {insight.icon}
              </div>
              <h3 className="font-semibold">{insight.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {insight.description}
            </p>
            <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex justify-end">
              <button className="text-xs font-semibold uppercase tracking-wider text-foreground hover:opacity-70 transition-opacity">
                Configure
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Execution Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm shadow-black/5">
            <h2 className="text-lg font-bold mb-6">Recent Workflows</h2>
            <div className="space-y-4">
              {recentExecutions.map((exec) => (
                <div key={exec.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${exec.status === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-orange-500/20 text-orange-500'}`}>
                      {exec.status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{exec.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock size={12} /> {exec.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                      {exec.duration}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Rerun">
                      <PlayCircle size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm shadow-black/5 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 flex items-center justify-center mb-4">
              <div className="text-2xl font-black text-indigo-500">84%</div>
            </div>
            <h3 className="font-bold">Automation Score</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Based on your workflow usage vs manual integrations this week.
            </p>
          </div>

          <div className="bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-2xl border border-indigo-500/20 p-6 shadow-inner">
            <h3 className="font-bold">AI Assistant Savings</h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-black text-foreground">12.5</span>
              <span className="text-muted-foreground mb-1 font-medium">hours</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Saved this month by utilizing predictive workflows and task generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
