/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Cpu
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function App() {
  const [stage, setStage] = useState<'danger' | 'founder' | 'technology' | 'outro'>('danger');
  const [activeAgent, setActiveAgent] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  
  const agents = ['OpenClaw', 'Claude CoWork', 'Hermes', 'AutoGPT'];
  const tech = ['Virtual Machine (KVM)', 'Docker Container', 'Memory Isolation', 'I/O Virtualization'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
      setActiveTech((prev) => (prev + 1) % tech.length);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('founder'), 4000),
      setTimeout(() => setStage('technology'), 9000),
      setTimeout(() => setStage('outro'), 14000),
      setTimeout(() => setStage('danger'), 18000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-500 font-sans tracking-tight overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-zinc-900/50 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-screen flex flex-col pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Navigation / Header */}
        <nav className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">SophosAI</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Technology</a>
            <a href="#" className="hover:text-white transition-colors">Mission</a>
            <a href="#" className="px-6 py-2 bg-white text-black rounded-full hover:bg-emerald-500 transition-colors">Get Started</a>
          </div>
        </nav>

        {/* Global Progress */}
        <div className="absolute top-0 left-0 right-0 h-1 z-[100] bg-white/5 overflow-hidden">
          <motion.div 
            key={stage}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: stage === 'danger' ? 4 : stage === 'founder' ? 5 : stage === 'technology' ? 5 : 4, ease: "linear" }}
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        </div>

        {/* Interactive Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {stage === 'danger' && (
              <motion.div
                key="danger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                className="w-full flex flex-col lg:flex-row items-center justify-between gap-12"
              >
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <motion.div
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                    className="inline-flex items-center gap-3 px-4 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-500 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Security Baseline Warning
                  </motion.div>
                  <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
                    Your Host Is<br/>
                    <span className="text-red-500">Unprotected.</span>
                  </h1>
                  <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                    Most AI agents run with full access to your local filesystem. 
                    SophosAI creates a cryptographic barrier between your compute and your data.
                  </p>
                </div>

                <div className="w-full max-w-md bg-zinc-900/50 border border-red-500/20 p-8 backdrop-blur-3xl rounded-3xl relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 flex items-center justify-center rounded-2xl animate-pulse">
                    <Lock className="w-6 h-6 text-black" />
                  </div>
                  <div className="font-mono text-xs text-red-400 space-y-4 uppercase">
                    <div className="flex justify-between border-b border-red-500/20 pb-2 mb-4">
                      <span className="font-bold">SYSTEM_VULNERABILITY_ASSESSMENT</span>
                      <span className="text-[10px] opacity-50">v1.2</span>
                    </div>
                    {['Agent_Process_882', 'FS_Write_Access'].map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="opacity-40 italic">{['ID:', 'CAPABILITY:'][i]}</span>
                        <span className="font-bold">{item}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-red-500 font-bold p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                      <span>STATUS:</span>
                      <span className="animate-pulse">CRITICAL_RISK</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'founder' && (
              <motion.div
                key="founder"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col lg:flex-row items-center gap-16"
              >
                <div className="relative w-full lg:w-1/2 aspect-square max-w-md rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group">
                  <img 
                    src="/founder.png" 
                    alt="Founder"
                    className="w-full h-full object-cover grayscale brightness-110 contrast-125 transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('founder.png')) {
                        target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-1 underline decoration-2 underline-offset-4">Founder Message</div>
                    <div className="text-3xl font-black italic tracking-tighter uppercase italic leading-none">Security is not<br/>an afterthought.</div>
                  </div>
                </div>

                <div className="flex-1 space-y-10">
                   <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                      Your Privacy,<br/>
                      <span className="text-emerald-500">Encoded.</span>
                    </h2>
                    <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
                      "We built SophosAI to end the trade-off between intelligence and privacy. 
                      Run state-of-the-art models with zero host exposure."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                      <div className="text-emerald-500 font-black text-3xl mb-2">100%</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Local Isolation</div>
                    </div>
                    <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                      <div className="text-emerald-500 font-black text-3xl mb-2">ZERO</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Host Injection</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'technology' && (
              <motion.div
                key="technology"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col lg:flex-row items-center gap-20"
              >
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-3 px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                    <Cpu className="w-3 h-3" />
                    Hardware Orchestration
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">
                    Isolated<br/>
                    <span className="text-cyan-400">Compute Core</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tech.map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group p-4 rounded-2xl border transition-all duration-300 ${
                          i === activeTech 
                            ? 'bg-cyan-500/10 border-cyan-500/40' 
                            : 'bg-zinc-900/50 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full transition-shadow duration-500 ${i === activeTech ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]' : 'bg-zinc-700'}`} />
                          <span className={`text-sm font-bold uppercase transition-colors ${i === activeTech ? 'text-white' : 'text-zinc-500'}`}>
                            {name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-lg">
                    {/* Visual representation of a locked VM node */}
                    <div className="aspect-video bg-zinc-900 rounded-[32px] border border-cyan-500/30 relative flex items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]">
                      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:20px_20px]" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 border-2 border-dashed border-cyan-500/20 rounded-full flex items-center justify-center"
                      >
                        <div className="w-48 h-48 border-2 border-cyan-500/10 rounded-full" />
                      </motion.div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-20 h-20 bg-cyan-500/20 rounded-[24px] flex items-center justify-center mb-6"
                        >
                          <ShieldCheck className="w-10 h-10 text-cyan-400" />
                        </motion.div>
                        <div className="text-center space-y-2">
                          <div className="text-xs font-black italic uppercase text-cyan-400">VM_CORE_LOCKED</div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Memory encryption active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'outro' && (
              <motion.div
                key="outro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="space-y-12"
                >
                  <h2 className="text-[120px] md:text-[220px] font-black italic tracking-tighter uppercase leading-[0.7] text-white">
                    Sophos<br/>AI
                  </h2>
                  <div className="flex flex-col items-center gap-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-5 bg-emerald-500 text-black text-xl font-black uppercase tracking-[0.2em] italic rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] skew-x-[-10deg]"
                    >
                      Secure The Edge
                    </motion.button>
                    <div className="text-zinc-500 text-sm font-bold uppercase tracking-[0.5em]">Available Now // Windows & macOS</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-end border-t border-white/5 pt-8">
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">System Status</div>
            <div className="flex gap-4">
              {['KVM', 'Docker', 'E2EE', 'Sandbox'].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">ISO_27001_COMPLIANT // LOCAL_DATA_V4</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">© 2026 SophosAI Security</div>
          </div>
        </div>
      </div>
    </div>
  );
}
