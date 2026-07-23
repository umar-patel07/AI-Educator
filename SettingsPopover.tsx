import React, { useEffect, useState } from "react";
import { VoiceSettings } from "../types";
import { Volume2, VolumeX, Sliders, Check } from "lucide-react";

interface SettingsPopoverProps {
  settings: VoiceSettings;
  onUpdateSettings: (settings: VoiceSettings) => void;
}

export default function SettingsPopover({ settings, onUpdateSettings }: SettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleToggle = () => {
    onUpdateSettings({
      ...settings,
      enabled: !settings.enabled
    });
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({
      ...settings,
      voiceName: e.target.value
    });
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      pitch: parseFloat(e.target.value)
    });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      rate: parseFloat(e.target.value)
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Speech Assistant Settings"
        className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-95 ${
          settings.enabled
            ? "bg-violet-900/40 border-violet-700/60 text-violet-300"
            : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
        }`}
      >
        {settings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {isOpen && (
        <>
          {/* Click outside backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 bottom-12 mb-2 w-72 bg-slate-950 border border-slate-800/90 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
              <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-violet-400" />
                Speech Synthesis
              </h4>
              <button
                type="button"
                onClick={handleToggle}
                className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border transition-colors ${
                  settings.enabled
                    ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                {settings.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Voice select */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Reader Voice
                </label>
                <select
                  value={settings.voiceName}
                  onChange={handleVoiceChange}
                  disabled={!settings.enabled}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-violet-500 disabled:opacity-40"
                >
                  <option value="">Default OS Reader</option>
                  {voices.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pitch Slider */}
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Vocal Pitch
                  </label>
                  <span className="text-[10px] text-slate-300 font-mono">{settings.pitch.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={settings.pitch}
                  onChange={handlePitchChange}
                  disabled={!settings.enabled}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 disabled:opacity-40"
                />
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Speech Rate (Speed)
                  </label>
                  <span className="text-[10px] text-slate-300 font-mono">{settings.rate.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.rate}
                  onChange={handleRateChange}
                  disabled={!settings.enabled}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500 disabled:opacity-40"
                />
              </div>
            </div>

            <p className="text-[9px] text-slate-500 mt-3 text-center leading-relaxed">
              *Runs native in-browser speechSynthesis. Turn up your computer speakers to listen!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
