'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Server, Zap, Database, Brain, Activity, Shield, Globe,
  ArrowRight, Check, Star, ChevronRight, Menu, X, Terminal,
  Layers, Network, Box, Sparkles, Code, BarChart3,
  Users, Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { seedGpus, seedPlans } from '@/data/seed';
import { SectionHeader, StatusBadge, Button } from '@/components/ui';

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
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-heading tracking-tight">JemGola</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/login" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-surface-1">Log in</Link>
          <Link href="/register" className="text-[13px] bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg font-medium transition-all">Get Started</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-muted-foreground">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-border overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="text-[13px] text-muted-foreground hover:text-foreground py-2" onClick={() => setIsOpen(false)}>{l.label}</a>
              ))}
              <div className="flex gap-3 pt-3 border-t border-border">
                <Link href="/login" className="text-[13px] text-muted-foreground hover:text-foreground px-4 py-2">Log in</Link>
                <Link href="/register" className="text-[13px] bg-primary text-white px-4 py-2 rounded-lg">Get Started</Link>
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
    <section className="relative pt-28 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-info/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now available: NVIDIA H200 with 141GB HBM3e</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.025em] text-heading mb-5">
          <span className="gradient-text">Cloud GPUs</span> for{'\n'}AI Infrastructure
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-9 leading-relaxed">
          Deploy pods, run serverless inference, fine-tune models, and scale clusters — all on enterprise-grade GPU infrastructure. Starting at $0.44/hr.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-xl text-sm font-medium transition-all shadow-md">
            Start Deploying <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#developer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border-strong bg-surface-0 hover:bg-surface-1 text-foreground px-7 py-3 rounded-xl text-sm font-medium transition-all">
            <Terminal className="w-4 h-4 text-muted-foreground" /> View Documentation
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {seedGpus.slice(0, 3).map((gpu, i) => (
            <motion.div key={gpu.id} initial={{ y: 16 }} animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
              className="bg-surface-1 border border-border rounded-xl p-3.5 text-left hover:border-border-strong transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-3.5 h-3.5 text-primary/60" />
                <span className="text-[11px] font-medium text-muted-foreground">{gpu.manufacturer}</span>
              </div>
              <p className="text-[13px] font-semibold text-heading mb-1">{gpu.name}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{gpu.vram}GB VRAM</span>
                <span className="text-primary font-medium">${gpu.pricePerHour}/hr</span>
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
    <section id="product" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader overline="PLATFORM" title="Everything you need to run AI" description="From rapid prototyping to production inference — one platform for your entire ML workflow." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.3 }}
              className="group bg-surface-1 border border-border rounded-xl p-5 hover:border-border-strong transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center mb-3.5 group-hover:bg-surface-3 transition-colors">
                <f.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary/70 transition-colors" />
              </div>
              <h3 className="text-[14px] font-semibold text-heading mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GPU Marketplace Preview ──────────────────────────────
function GpuMarketplace() {
  return (
    <section id="gpu-marketplace" className="py-20 px-6 bg-surface-0/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeader overline="GPU MARKETPLACE" overlineColor="text-info" title="Enterprise GPUs, on demand" description="Access the latest NVIDIA GPUs at competitive pricing. Deploy in seconds." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seedGpus.slice(0, 6).map((gpu, i) => (
            <motion.div key={gpu.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3 }}
              className="bg-surface-1 border border-border rounded-xl overflow-hidden hover:border-border-strong transition-all duration-200 group"
            >
              <div className="p-4 pb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wide">{gpu.architecture}</span>
                  <StatusBadge status={gpu.availability} />
                </div>
                <h3 className="text-[14px] font-semibold text-heading mb-2">{gpu.name}</h3>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[11px] text-muted-foreground mb-1">
                  <span>{gpu.vram} GB VRAM</span>
                  <span>{gpu.memoryBandwidth.toLocaleString()} GB/s</span>
                  <span>{gpu.cudaCores.toLocaleString()} CUDA</span>
                  <span>{gpu.tensorCores} Tensor</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-surface-0/40">
                <span className="text-base font-semibold text-heading tabular-nums">${gpu.pricePerHour}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
                <button className="text-[12px] font-medium text-primary hover:text-primary/80 transition-colors">Deploy</button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/register" className="text-[13px] text-primary hover:text-primary/80 inline-flex items-center gap-1.5">
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
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Built for scale" description="Every tool you need for production AI workloads." />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.25 }}
              className="bg-surface-1 border border-border rounded-xl p-4 text-center hover:border-border-strong transition-all duration-200 group"
            >
              <f.icon className="w-5 h-5 text-muted-foreground mx-auto mb-2.5 group-hover:text-primary/70 transition-colors" />
              <span className="text-[13px] font-medium text-heading">{f.label}</span>
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
    <section className="py-20 px-6 bg-surface-0/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader overline="INFRASTRUCTURE" overlineColor="text-[#36b5a0]" title="From code to production in minutes" description="Our infrastructure handles provisioning, scaling, and monitoring so you can focus on building." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-[14px] font-semibold text-heading mb-1">{s.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
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
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader overline="PRICING" title="Simple, transparent pricing" description="Start free, scale as you grow. Pay only for the compute you use." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seedPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3 }}
              className={cn(
                'relative bg-surface-1 border rounded-2xl p-7 flex flex-col',
                plan.isPopular ? 'border-primary/30 shadow-glow' : 'border-border'
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-[11px] px-3 py-1 rounded-full font-medium">Most Popular</span>
                </div>
              )}
              <h3 className="text-[15px] font-semibold text-heading mb-2">{plan.name}</h3>
              <div className="mb-5">
                <span className="text-3xl font-bold text-heading">${plan.pricePerMonth}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <ul className="flex-1 space-y-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className={cn(
                'w-full py-2.5 rounded-lg text-[13px] font-medium text-center transition-all',
                plan.isPopular ? 'bg-primary hover:bg-primary/90 text-white shadow-md' : 'bg-surface-2 border border-border hover:border-border-strong text-foreground'
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
    <section id="developer" className="py-20 px-6 bg-surface-0/50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-success mb-3">DEVELOPER EXPERIENCE</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-heading tracking-tight mb-4">Deploy in seconds, not hours</h2>
            <p className="text-[15px] text-muted-foreground mb-7 leading-relaxed">Our CLI and API make it trivially easy to deploy GPU workloads. No Kubernetes, no complex configs.</p>
            <div className="space-y-3">
              {['One-command deployment', 'OpenAI-compatible API', 'SSH & Jupyter access', 'GitHub Actions integration'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center"><Check className="w-3 h-3 text-success" /></div>
                  <span className="text-[13px] text-secondary-foreground">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-surface-0 border border-border rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-1/50">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
              <span className="text-[11px] text-muted-foreground/50 ml-2 font-mono">Terminal</span>
            </div>
            <div className="p-4 font-mono text-[13px] space-y-0.5">
              {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: line.delay }}>
                  <span className="text-success">{line.prompt}</span>
                  <span className={line.prompt ? 'text-foreground' : 'text-muted-foreground'}>{line.text}</span>
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
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader overline="TRUSTED BY AI TEAMS" title="Loved by developers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3 }}
              className="bg-surface-1 border border-border rounded-xl p-5 hover:border-border-strong transition-all duration-200"
            >
              <div className="flex items-center gap-0.5 mb-3.5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-warning text-warning" />)}
              </div>
              <p className="text-[13px] text-secondary-foreground leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-[11px] font-semibold text-white">{t.avatar}</div>
                <div>
                  <p className="text-[13px] font-medium text-heading">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
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
    <section className="py-20 px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-info/6 to-[#36b5a0]/6" />
        <div className="absolute inset-0 bg-surface-1/90" />
        <div className="relative z-10 py-14 px-8 text-center border border-border rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-heading tracking-tight mb-3">Ready to deploy?</h2>
          <p className="text-[15px] text-muted-foreground max-w-md mx-auto mb-7">Get $25 in free credits when you sign up. No credit card required to start.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-xl text-sm font-medium transition-all shadow-md">
              Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
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
    <footer className="border-t border-border pt-14 pb-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <Cpu className="w-3 h-3 text-white" />
              </div>
              <span className="text-[14px] font-semibold text-heading">JemGola</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Cloud GPU infrastructure for AI teams. Deploy, scale, and manage ML workloads.</p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-[12px] font-semibold text-heading mb-3">{group}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground/50">© 2026 JemGola Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Twitter', 'GitHub', 'Discord'].map(s => (
              <a key={s} href="#" className="text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors">{s}</a>
            ))}
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
