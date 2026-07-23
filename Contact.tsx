import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError("Please write a message with at least 10 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-purple-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-200 via-indigo-100 to-slate-200 bg-clip-text text-transparent mb-3">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-sm">
          Have ideas, integration requests, or feedback? Send us a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start relative z-10">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-100 mb-2">Technical Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you have any questions regarding the mock OS execution layer or our offline AI tool database search, consult our Features page or ping our discord link.
            </p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-100 mb-2">Workspace API Queries</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For integrations requiring custom workspace OAuth or dedicated GCP database support, please request assistance via help center logs.
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          {submitted ? (
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl text-center shadow-xl">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Feedback Received</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                Your message has been validated and parsed. Since this is running in our client showcase sandbox, we have logged it safely in your active session registers!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl shadow-xl space-y-5">
              {error && (
                <div className="p-3 bg-red-950/20 border border-red-900/50 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-slate-500">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Describe your inquiry or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-violet-900/20 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
