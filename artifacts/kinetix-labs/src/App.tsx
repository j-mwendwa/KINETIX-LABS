import { type CSSProperties, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as SonnerToaster, toast } from 'sonner';
import {
  ArrowUpRight,
  BarChart3,
  Braces,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Menu,
  Plus,
  ShieldCheck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  ['Solutions', '#solutions'],
  ['Method', '#method'],
  ['Economics', '#economics'],
  ['FAQ', '#faq'],
];

const solutions = [
  {
    number: '01',
    icon: Globe2,
    title: 'Outbound intelligence',
    description: 'Research, qualify, enrich, and route high-intent accounts while your team focuses on the conversations that matter.',
  },
  {
    number: '02',
    icon: Wrench,
    title: '24/7 maintenance triage',
    description: 'Classify incoming issues, coordinate the right vendor, and keep residents informed without a midnight scramble.',
  },
  {
    number: '03',
    icon: Braces,
    title: 'MCP & API connectors',
    description: 'Give your agents safe, typed access to the systems your operation already runs on — no rip-and-replace required.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Deterministic guardrails',
    description: 'Human approvals, audit trails, and policy boundaries are designed in from the first workflow diagram.',
  },
];

const faqs = [
  ['Will this work with our existing software?', 'Yes. We build around your current stack using APIs, MCP servers, webhooks, and careful browser automation where needed. The goal is a dependable layer over your existing operation, not another system to babysit.'],
  ['How quickly can we go live?', 'Most focused workflows move from discovery to a monitored production pilot in 7–10 days. We start with the highest-frequency, highest-friction loop and expand from there.'],
  ['Is this just a chatbot?', 'No. Chat is only one interface. Our agents maintain state, make decisions against explicit policies, call tools, and hand work to people when confidence or risk requires it.'],
  ['What happens after deployment?', 'Kinetix stays close. The monthly partnership includes monitoring, prompt and policy tuning, integration maintenance, and a regular review of new automation opportunities.'],
  ['How do you handle sensitive data?', 'Every workflow is scoped around least-privilege access, structured data boundaries, deterministic approvals, and an audit trail. We can also deploy into your preferred cloud environment.'],
];

function scrollToTarget(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <a className="brand" href="#top" data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true" />
      <span>Kinetix Labs</span>
    </a>
  );
}

function Nav({ onBook }: { onBook: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleNav = (target: string) => {
    setMobileOpen(false);
    scrollToTarget(target);
  };
  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <Logo />
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map(([label, target]) => (
              <a key={target} href={target} onClick={(event) => { event.preventDefault(); handleNav(target); }} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="button button-primary" onClick={onBook} data-testid="button-nav-book">
              Book a discovery <ArrowUpRight size={15} />
            </button>
            <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" data-testid="button-mobile-menu">
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div className="mobile-panel">
          {navItems.map(([label, target]) => (
            <a key={target} href={target} onClick={(event) => { event.preventDefault(); handleNav(target); }} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>
          ))}
          <button className="button button-primary" onClick={() => { setMobileOpen(false); onBook(); }} data-testid="button-mobile-book">Book a discovery <ArrowUpRight size={15} /></button>
        </div>
      )}
    </>
  );
}

function WorkflowVisual() {
  return (
    <div className="control-room reveal delay-2" data-testid="visual-agent-workflow">
      <div className="room-top">
        <strong className="mono">KINETIX / ORCHESTRATOR</strong>
        <span className="signal"><span className="status-dot" /> live system</span>
      </div>
      <div className="orbit" aria-label="Live agent workflow visualization">
        <div className="path path-a" /><div className="path path-b" /><div className="path path-c" /><div className="path path-d" />
        <span className="pulse pulse-a" /><span className="pulse pulse-b" /><span className="pulse pulse-c" /><span className="pulse pulse-d" />
        <div className="node node-a"><span className="node-icon"><Database size={15} /></span>Signals</div>
        <div className="node node-b"><span className="node-icon"><Building2 size={15} /></span>Property OS</div>
        <div className="node node-c"><span className="node-icon"><GitBranch size={15} /></span>Decision layer</div>
        <div className="node node-d"><span className="node-icon"><Code2 size={15} /></span>Action API</div>
        <div className="core"><div><b>Agent<br />runtime</b><small>STATEFUL / V1.8</small></div></div>
      </div>
      <div className="room-bottom">
        <div className="metric"><small>events / hour</small><strong>1,284</strong></div>
        <div className="metric"><small>decisions made</small><strong>98.7%</strong></div>
        <div className="metric"><small>human handoffs</small><strong>14</strong></div>
      </div>
    </div>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow reveal">Agentic systems / 2025</div>
            <h1 className="reveal delay-1">We build autonomous AI agents that <span className="accent">eliminate manual operations.</span></h1>
            <p className="hero-copy reveal delay-2">Production-grade AI agents and autonomous workflows for high-growth B2B agencies and property operators. We design, deploy, and maintain the systems that make your operation move faster.</p>
            <div className="hero-buttons reveal delay-3">
              <button className="button button-primary" onClick={onBook} data-testid="button-hero-book">Book a discovery <ArrowUpRight size={15} /></button>
              <a className="button button-ghost" href="#solutions" onClick={(event) => { event.preventDefault(); scrollToTarget('#solutions'); }} data-testid="link-hero-solutions">See what we automate <Zap size={15} /></a>
            </div>
            <div className="proof-row">
              <span><CircleDot size={14} color="#0c9d96" /> Built for production</span>
              <span><Clock3 size={14} color="#0c9d96" /> Live in 7–10 days</span>
              <span><ShieldCheck size={14} color="#0c9d96" /> Human-approved by design</span>
            </div>
          </div>
          <WorkflowVisual />
        </div>
      </section>
      <div className="marquee" aria-label="Kinetix capabilities">
        <div className="marquee-track">
          {[...Array(2)].flatMap(() => ['stateful agents', 'tool calling', 'property operations', 'typed workflows', 'human-in-the-loop', 'audit-ready systems']).map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>
    </>
  );
}

function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="container solution-grid">
        <div>
          <div className="section-heading">
            <div className="eyebrow">The operating layer</div>
            <h2>Less coordination. More compounding output.</h2>
            <p>Most teams do not need another dashboard. They need the invisible work between systems to finally run itself.</p>
          </div>
          <div className="solution-list">
            {solutions.map(({ number, icon: Icon, title, description }) => (
              <article className="solution-item" key={number} data-testid={`card-solution-${number}`}>
                <span className="solution-number mono">{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <Icon size={18} />
              </article>
            ))}
          </div>
        </div>
        <div className="blueprint">
          <span className="blueprint-tag"><Layers3 size={13} /> SYSTEM BLUEPRINT / 004</span>
          <h3>Messy inputs in. Decisive operations out.</h3>
          <p>We map the decisions your best operator makes instinctively — then encode them into a reliable loop your whole company can use.</p>
          <div className="blueprint-stamp">KINETIX LABS / FIELD NOTES</div>
        </div>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    ['01', 'Map the friction', 'Day 01–02', 'We sit inside the real workflow, trace handoffs, and find the decision bottleneck worth removing first.'],
    ['02', 'Wire the context', 'Day 03–05', 'Your systems, policies, data, and edge cases become a typed context layer the agent can reason over.'],
    ['03', 'Ship the loop', 'Day 06–08', 'We build, test, and put a monitored workflow in the hands of the people who will actually use it.'],
    ['04', 'Tune for trust', 'Day 09–10', 'Guardrails, human approvals, alerts, and the operating dashboard turn a clever demo into infrastructure.'],
  ];
  return (
    <section className="section framework" id="method">
      <div className="container framework-grid">
        <div className="section-heading">
          <div className="eyebrow">Deployment framework</div>
          <h2>From blank page to useful autonomy in 7–10 days.</h2>
          <p>Focused scope. Fast feedback. No six-month transformation program before anyone sees value.</p>
        </div>
        <div className="step-list">
          {steps.map(([number, title, time, description]) => (
            <div className="step" key={number}>
              <span className="step-no">{number}</span>
              <div><div className="step-time">{time}</div><h3>{title}</h3><p>{description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Economics({ onBook }: { onBook: () => void }) {
  return (
    <section className="section" id="economics">
      <div className="container pricing">
        <div className="price-card">
          <div className="eyebrow">The Kinetix engagement</div>
          <h3>$2,000 <small>setup</small></h3>
          <p>One focused workflow, designed and deployed with your team.</p>
          <ul>
            <li><Check size={15} /> Production deployment in 7–10 days</li>
            <li><Check size={15} /> Guardrails, monitoring, and handoff</li>
            <li><Check size={15} /> Ongoing maintenance for $900 / month</li>
          </ul>
          <span className="payback">30-DAY PAYBACK PROMISE</span>
        </div>
        <div className="pricing-copy">
          <div className="eyebrow">An engineering partnership</div>
          <h2>Pay for the system. Keep the capacity.</h2>
          <p>We price around the first operational win, not a sprawling roadmap. If the workflow does not credibly pay back in 30 days, we keep working until it does.</p>
          <div className="mini-stats">
            <div className="mini-stat"><strong>$900</strong><span>monthly care & iteration</span></div>
            <div className="mini-stat"><strong>30d</strong><span>payback promise</span></div>
          </div>
          <button className="button button-primary" style={{ marginTop: 30 }} onClick={onBook} data-testid="button-pricing-book">Talk through your workflow <ArrowUpRight size={15} /></button>
        </div>
      </div>
    </section>
  );
}

function ROICalculator() {
  const [hours, setHours] = useState(18);
  const [rate, setRate] = useState(42);
  const result = useMemo(() => {
    const weekly = hours * rate;
    const monthly = weekly * 4.33;
    const annual = monthly * 12;
    const paybackWeeks = 2000 / weekly;
    return { weekly, monthly, annual, paybackWeeks };
  }, [hours, rate]);
  const rangeStyle = (value: number, min: number, max: number) => ({ '--fill': `${((value - min) / (max - min)) * 100}%` } as CSSProperties);
  return (
    <section className="section section-dark" id="roi">
      <div className="container roi-wrap">
        <div className="roi-panel">
          <div className="roi-row"><label htmlFor="hours-range">Manual hours / week <output>{hours} hrs</output></label><input id="hours-range" data-testid="input-roi-hours" type="range" min="2" max="60" value={hours} onChange={(event) => setHours(Number(event.target.value))} style={rangeStyle(hours, 2, 60)} /></div>
          <div className="roi-row"><label htmlFor="rate-range">Blended hourly rate <output>${rate} / hr</output></label><input id="rate-range" data-testid="input-roi-rate" type="range" min="20" max="180" value={rate} onChange={(event) => setRate(Number(event.target.value))} style={rangeStyle(rate, 20, 180)} /></div>
          <div className="roi-result"><small>Estimated reclaimed capacity / year</small><strong data-testid="text-roi-result">${Math.round(result.annual).toLocaleString()}</strong><p>That is {Math.round(result.monthly).toLocaleString()} in monthly capacity — before counting the value of faster response times and fewer dropped handoffs.</p></div>
        </div>
        <div className="roi-copy">
          <div className="eyebrow">Model the upside</div>
          <h2>Your busiest week is the business case.</h2>
          <p>Move the sliders to estimate what one autonomous workflow can return to your team. A Kinetix deployment is designed to pay back in {result.paybackWeeks.toFixed(1)} weeks at this baseline.</p>
          <div style={{ marginTop: 28, color: '#8de0d2', font: '11px var(--app-font-mono)' }}><BarChart3 size={15} style={{ verticalAlign: 'middle', marginRight: 8 }} />CAPACITY, NOT HEADCOUNT</div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const principles = [
    ['01', 'Make the decision legible', 'Black-box magic is not an operating system.'],
    ['02', 'Automate the repeatable', 'People stay close to the exceptions and the judgment.'],
    ['03', 'Ship the smallest loop', 'Useful beats impressive. Every time.'],
    ['04', 'Earn production trust', 'Observability and escape hatches are features.'],
  ];
  return (
    <section className="section section-dark" style={{ paddingTop: 20 }} id="principles">
      <div className="container principles">
        <div className="principles-copy"><div className="eyebrow">Engineering leadership</div><h2>The standard is not “AI-powered.” It is dependable.</h2><p>Every Kinetix system is built for the Monday morning after launch — when a real customer is waiting and the edge case finally arrives.</p></div>
        <div className="principle-grid">
          {principles.map(([number, title, copy]) => <article className="principle" key={number}><strong>{number}</strong><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <div><div className="eyebrow">Questions, answered</div><h2>Serious systems deserve direct answers.</h2><p>Still evaluating the shape of your first workflow? Start with the one that consumes the most operator attention.</p></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq ${open === index ? 'open' : ''}`} key={question}>
              <button className="faq-question" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} data-testid={`button-faq-${index}`}><span>{question}</span>{open === index ? <Plus size={18} /> : <ChevronDown size={18} />}</button>
              <div className="faq-answer">{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    toast.success('Request received — we’ll be in touch shortly.', { description: 'A Kinetix operator will follow up within one business day.' });
  };
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Close booking form" data-testid="button-close-booking"><X size={17} /></button>
        <div className="eyebrow">Start with the bottleneck</div>
        <h2 id="booking-title">Let’s find your first autonomous loop.</h2>
        <p>Tell us where the work gets stuck. We’ll come prepared with a point of view — not a generic capabilities deck.</p>
        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" data-testid="input-booking-name" /></div>
            <div className="field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" required placeholder="you@company.com" data-testid="input-booking-email" /></div>
            <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" required placeholder="Company name" data-testid="input-booking-company" /></div>
            <div className="field"><label htmlFor="role">Your role</label><input id="role" name="role" placeholder="Operator, founder, etc." data-testid="input-booking-role" /></div>
            <div className="field full"><label htmlFor="workflow">What should run itself?</label><textarea id="workflow" name="workflow" required placeholder="Briefly describe the manual workflow..." data-testid="input-booking-workflow" /></div>
          </div>
          <button className="button button-primary form-submit" type="submit" data-testid="button-submit-booking">Request a discovery call <ArrowUpRight size={15} /></button>
        </form>
      </div>
    </div>
  );
}

function Footer({ onBook }: { onBook: () => void }) {
  return (
    <>
      <section className="cta">
        <div className="container cta-inner">
          <div><div className="eyebrow">The next useful system</div><h2>Your operation is already telling you what to automate.</h2></div>
          <div className="cta-actions"><button className="button button-dark" onClick={onBook} data-testid="button-footer-book">Book a discovery <ArrowUpRight size={15} /></button></div>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-grid">
          <div><Logo /><p>Production-grade AI agents and autonomous workflows for operators who want their capacity back.</p></div>
          <div><h4>Explore</h4><a href="#solutions" data-testid="link-footer-solutions">Solutions</a><a href="#method" data-testid="link-footer-method">Deployment method</a><a href="#economics" data-testid="link-footer-economics">Economics</a></div>
          <div><h4>Connect</h4><a href="mailto:hello@kinetixlabs.ai" data-testid="link-footer-email">hello@kinetixlabs.ai</a><a href="#faq" data-testid="link-footer-faq">FAQ</a><a href="#top" data-testid="link-footer-top">Back to top</a></div>
          <div><h4>Built for</h4><span style={{ display: 'block', color: '#c2d9d5', fontSize: 12, lineHeight: 1.8 }}>B2B agencies<br />Property operators<br />High-growth teams</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2025 Kinetix Labs. Systems that move.</span><span className="mono">STATUS: OPERATIONAL</span></div>
      </footer>
    </>
  );
}

function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  return (
    <div className="kinetix-site">
      <Nav onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Solutions />
        <Method />
        <Economics onBook={openBooking} />
        <ROICalculator />
        <Principles />
        <FAQ />
      </main>
      <Footer onBook={openBooking} />
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary><Router /></RoutedErrorBoundary>
        </WouterRouter>
        <SonnerToaster position="bottom-right" richColors closeButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;