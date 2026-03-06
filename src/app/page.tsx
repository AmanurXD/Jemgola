'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Server, Zap, Database, Brain, Activity, Shield, Globe,
  ArrowRight, Check, Star, ChevronRight, Menu, X, Terminal,
  Layers, Network, Box, CreditCard, Sparkles, Code, BarChart3,
  Users, Clock, Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedGpus, seedPlans } from '@/data/seed';

// ─── Navbar ───────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'GPUs', href: '#gpu-marketplace' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#developer' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold">JemGola</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">Log in</Link>
          <Link href="/register" className="text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/25">Get Started</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-400">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-white/5 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white py-2" onClick={() => setIsOpen(false)}>{l.label}</a>
              ))}
              <div className="flex gap-3 pt-3 border-t border-white/5">
                <Link href="/login" className="text-sm text-zinc-400 hover:text-white px-4 py-2">Log in</Link>
                <Link href="/register" className="text-sm bg-primary text-white px-4 py-2 rounded-lg">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now available: NVIDIA H200 with 141GB HBM3e</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="gradient-text">Cloud GPUs</span> for<br />
          AI Infrastructure
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Deploy pods, run serverless inference, fine-tune models, and scale clusters — all on enterprise-grade GPU infrastructure. Starting at $0.44/hr.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-xl hover:shadow-purple-500/25">
            Start Deploying <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#developer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5">
            <Terminal className="w-4 h-4" /> View Documentation
          </a>
        </motion.div>

        {/* GPU Cards floating */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {seedGpus.slice(0, 3).map((gpu, i) => (
            <motion.div key={gpu.id} initial={{ y: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              className="bg-card border border-white/5 rounded-xl p-4 text-left hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-zinc-400">{gpu.manufacturer}</span>
              </div>
              <p className="text-sm font-semibold mb-1">{gpu.name}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{gpu.vram}GB VRAM</span>
                <span className="text-purple-400 font-medium">${gpu.pricePerHour}/hr</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Overview ─────────────────────────────────────
const productFeatures = [
  { icon: Server, title: 'GPU Pods', desc: 'Full Linux environments with dedicated GPUs. SSH, Jupyter, and custom containers.' },
  { icon: Zap, title: 'Serverless', desc: 'Auto-scaling inference endpoints. Pay only when your code runs.' },
  { icon: Network, title: 'Clusters', desc: 'Multi-node GPU clusters with automatic scaling and load balancing.' },
  { icon: Brain, title: 'Fine-tuning', desc: 'Train and fine-tune models with managed infrastructure and dataset tools.' },
  { icon: Database, title: 'Storage', desc: 'Persistent network volumes that attach to any pod or cluster instantly.' },
  { icon: Activity, title: 'Monitoring', desc: 'Real-time GPU, CPU, memory, and network metrics across all resources.' },
];

function ProductOverview() {
  return (
    <section id="product" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">PLATFORM</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to run AI</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">From rapid prototyping to production inference — one platform for your entire ML workflow.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group bg-card border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <f.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GPU Marketplace Preview ──────────────────────────────
function GpuMarketplace() {
  const availabilityColors: Record<string, string> = {
    available: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    limited: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    sold_out: 'bg-red-500/10 text-red-400 border-red-500/30',
  };
  const availabilityLabels: Record<string, string> = { available: 'Available', limited: 'Limited', sold_out: 'Sold Out' };

  return (
    <section id="gpu-marketplace" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-medium text-blue-400 mb-3">GPU MARKETPLACE</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Enterprise GPUs, on demand</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Access the latest NVIDIA GPUs at competitive pricing. Deploy in seconds.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seedGpus.slice(0, 6).map((gpu, i) => (
            <motion.div key={gpu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-500">{gpu.architecture}</span>
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', availabilityColors[gpu.availability])}>{availabilityLabels[gpu.availability]}</span>
              </div>
              <h3 className="font-semibold mb-3">{gpu.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-4">
                <span>{gpu.vram} GB VRAM</span>
                <span>{gpu.memoryBandwidth.toLocaleString()} GB/s</span>
                <span>{gpu.cudaCores.toLocaleString()} CUDA</span>
                <span>{gpu.tensorCores} Tensor</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-lg font-bold text-blue-400">${gpu.pricePerHour}<span className="text-xs font-normal text-zinc-500">/hr</span></span>
                <button className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors">Deploy</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/register" className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
            View all GPUs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ────────────────────────────────────────
const features = [
  { icon: Server, label: 'GPU Pods' }, { icon: Zap, label: 'Serverless' },
  { icon: Network, label: 'Clusters' }, { icon: Brain, label: 'Fine-tuning' },
  { icon: Database, label: 'Storage' }, { icon: Box, label: 'Containers' },
  { icon: Shield, label: 'Security' }, { icon: Globe, label: 'Edge Deploy' },
];

function FeaturesGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for scale</h2>
          <p className="text-zinc-400">Every tool you need for production AI workloads.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-white/5 rounded-xl p-5 text-center hover:border-purple-500/30 transition-all group cursor-default"
            >
              <f.icon className="w-6 h-6 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Infrastructure ────────────────────────────────────────
function Infrastructure() {
  const steps = [
    { icon: Code, title: 'Define', desc: 'Configure your container, GPU requirements, and environment.' },
    { icon: Layers, title: 'Deploy', desc: 'One-click deployment to global GPU infrastructure.' },
    { icon: Gauge, title: 'Scale', desc: 'Auto-scale from zero to hundreds of GPUs instantly.' },
    { icon: BarChart3, title: 'Monitor', desc: 'Real-time metrics, logs, and cost tracking.' },
  ];

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-medium text-cyan-400 mb-3">INFRASTRUCTURE</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">From code to production in minutes</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Our infrastructure handles provisioning, scaling, and monitoring so you can focus on building.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="absolute top-7 left-[60%] w-[calc(100%-20px)] h-px bg-gradient-to-r from-cyan-500/30 to-transparent hidden lg:block last:hidden" />
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">PRICING</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Start free, scale as you grow. Pay only for the compute you use.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seedPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={cn(
                'relative bg-card border rounded-2xl p-8 flex flex-col',
                plan.isPopular ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-white/5'
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">Most Popular</span>
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.pricePerMonth}</span>
                <span className="text-zinc-500 text-sm">/month</span>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className={cn(
                'w-full py-3 rounded-xl text-sm font-medium text-center transition-all',
                plan.isPopular ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-purple-500/25' : 'border border-white/10 hover:border-white/20 hover:bg-white/5'
              )}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Developer Workflow ───────────────────────────────────
function DeveloperWorkflow() {
  const lines = [
    { prompt: '$ ', text: 'jemgola login', delay: 0 },
    { prompt: '', text: '✓ Authenticated as alex@jemgola.dev', delay: 0.5 },
    { prompt: '$ ', text: 'jemgola deploy --gpu h100 --image pytorch:2.1', delay: 1.2 },
    { prompt: '', text: '⠋ Creating pod...', delay: 1.8 },
    { prompt: '', text: '✓ Pod llama-inference deployed', delay: 2.5 },
    { prompt: '', text: '  → GPU: NVIDIA H100 SXM (80GB)', delay: 2.8 },
    { prompt: '', text: '  → Endpoint: https://pod-7x2k.jemgola.run', delay: 3.1 },
    { prompt: '', text: '  → SSH: ssh root@pod-7x2k.jemgola.run', delay: 3.4 },
  ];

  return (
    <section id="developer" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-medium text-emerald-400 mb-3">DEVELOPER EXPERIENCE</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Deploy in seconds, not hours</h2>
            <p className="text-zinc-400 mb-8">Our CLI and API make it trivially easy to deploy GPU workloads. No Kubernetes, no complex configs.</p>
            <div className="space-y-4">
              {['One-command deployment', 'OpenAI-compatible API', 'SSH & Jupyter access', 'GitHub Actions integration'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-400" /></div>
                  <span className="text-sm text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-zinc-950 border border-white/5 rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-zinc-600 ml-3 font-mono">Terminal</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-1">
              {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: line.delay }}>
                  <span className="text-emerald-400">{line.prompt}</span>
                  <span className={line.prompt ? 'text-zinc-200' : 'text-zinc-500'}>{line.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────
const testimonials = [
  { name: 'Sarah Chen', role: 'ML Lead at Anthropic', quote: 'JemGola cut our inference costs by 40% while maintaining sub-100ms latency. The serverless scaling is phenomenal.', avatar: 'SC' },
  { name: 'David Park', role: 'CTO at Replicate', quote: 'We moved our entire training pipeline to JemGola. The cluster management and auto-scaling saved us weeks of DevOps work.', avatar: 'DP' },
  { name: 'Emma Rodriguez', role: 'Founder at Stability Labs', quote: 'The developer experience is incredible. Deploy a model, get an API — it just works. Best GPU cloud we\'ve used.', avatar: 'ER' },
];

function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">TRUSTED BY AI TEAMS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by developers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 rounded-xl p-6 hover:border-purple-500/20 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">{t.avatar}</div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 bg-card/80" />
        <div className="relative z-10 py-16 px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to deploy?</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">Get $25 in free credits when you sign up. No credit card required to start.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:shadow-xl hover:shadow-purple-500/25">
              Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2">
              <Users className="w-4 h-4" /> Talk to Sales
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  const links = {
    Product: ['GPU Pods', 'Serverless', 'Clusters', 'Fine-tuning', 'Storage', 'Templates'],
    Resources: ['Documentation', 'API Reference', 'CLI Guide', 'Tutorials', 'Blog', 'Status'],
    Company: ['About', 'Careers', 'Contact', 'Partners', 'Press'],
    Legal: ['Privacy', 'Terms', 'SLA', 'DPA'],
  };

  return (
    <footer className="border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold">JemGola</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">Cloud GPU infrastructure for AI teams. Deploy, scale, and manage ML workloads with ease.</p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-sm font-medium mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}><a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© 2026 JemGola Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Twitter</a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">GitHub</a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductOverview />
      <GpuMarketplace />
      <FeaturesGrid />
      <Infrastructure />
      <Pricing />
      <DeveloperWorkflow />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
