import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  Menu,
  MessageCircleMore,
  Mountain,
  Play,
  Search,
  Sparkles,
  Sprout,
  Sun,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import communityAsset from "@/assets/community.jpg.asset.json";
import fieldStoryAsset from "@/assets/field-story.jpg.asset.json";
import heroAsset from "@/assets/rural-hero.jpg.asset.json";
import initiativesAsset from "@/assets/initiatives.jpg.asset.json";

const easing = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="Rooted Impact home">
      <span className={`grid size-9 place-items-center rounded-full ${light ? "bg-surface text-primary" : "bg-primary text-primary-foreground"}`}>
        <Leaf className="size-5 transition-transform group-hover:-rotate-12" />
      </span>
      <span className={`font-display text-lg font-extrabold ${light ? "text-primary-foreground" : "text-foreground"}`}>
        ROOTED<span className={light ? "text-sun" : "text-accent-warm"}>.</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Our work", "Stories", "Resources"];

  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-primary-foreground/15 text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand light />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-sm font-semibold transition-opacity hover:opacity-70">
              {link}
            </a>
          ))}
          <Button asChild className="h-11 rounded-full bg-sun px-6 text-forest shadow-none hover:bg-sun/90">
            <a href="#contact">Get in touch <ArrowRight /></a>
          </Button>
        </nav>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-primary-foreground/15 bg-forest px-5 py-5 md:hidden">
          {links.map((link) => (
            <a key={link} onClick={() => setOpen(false)} href={`#${link.toLowerCase().replace(" ", "-")}`} className="block border-b border-primary-foreground/10 py-3 font-semibold">
              {link}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-forest md:min-h-[820px]">
      <img src={heroAsset.url} alt="Farmer walking through green rice fields beneath misty hills" width={1920} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <Header />
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-24 pt-36 md:min-h-[820px] md:items-center md:pb-0 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easing }} className="max-w-3xl text-primary-foreground">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sun"><span className="h-px w-8 bg-sun" /> Ideas that move people</p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.3rem]">
            A resilient future calls for behaviour change today.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 md:text-lg">
            We turn research into stories, tools and action—helping communities build a fairer, climate-ready future.
          </p>
          <Button asChild size="lg" className="mt-8 h-13 rounded-full bg-sun px-7 text-forest shadow-none hover:bg-sun/90">
            <a href="#our-work">Explore our work <ArrowRight /></a>
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/70 md:flex">
        <span>Scroll to discover</span><span className="h-12 w-px bg-primary-foreground/40" />
      </div>
    </section>
  );
}

const pillars = [
  { icon: Search, title: "Research", copy: "Listening deeply to uncover what shapes everyday choices.", tone: "bg-mint text-primary" },
  { icon: MessageCircleMore, title: "Communication", copy: "Making complex ideas human, useful and memorable.", tone: "bg-peach text-accent-warm" },
  { icon: Sparkles, title: "Capacity & Action", copy: "Building the confidence and tools that turn intent into impact.", tone: "bg-sky text-ocean" },
];

function Pillars() {
  return (
    <section id="about" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How change takes root</p>
          <h2 className="section-title mt-4">We bring together three disciplines to create lasting change.</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1} className="text-center">
              <motion.div whileHover={{ rotate: index === 1 ? 5 : -5, scale: 1.04 }} className={`mx-auto grid size-24 place-items-center rounded-full ${pillar.tone}`}>
                <pillar.icon className="size-10" strokeWidth={1.7} />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-bold">{pillar.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{pillar.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 55, damping: 18 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);
  useEffect(() => rounded.on("change", setDisplay), [rounded]);
  useEffect(() => { if (inView) motionValue.set(value); }, [inView, motionValue, value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

const stats = [
  { value: 13, suffix: "+", label: "years of learning" },
  { value: 100, suffix: "+", label: "projects shaped" },
  { value: 10, suffix: "+", label: "states across India" },
];

function Impact() {
  return (
    <section className="overflow-hidden bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="eyebrow">Built on evidence, shaped by people</p>
            <h2 className="section-title mt-4 max-w-2xl">We study the small decisions that can unlock system-wide progress.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">Our work lives where climate, livelihoods and public systems meet. We collaborate with communities and institutions to design practical change that holds.</p>
          </Reveal>
        </div>
        <div className="mt-14 grid overflow-hidden rounded-lg bg-primary text-primary-foreground md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative border-b border-primary-foreground/15 p-8 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10">
              <span className="absolute right-4 top-2 font-display text-8xl font-black text-primary-foreground/5">0{index + 1}</span>
              <p className="font-display text-5xl font-extrabold text-sun md:text-6xl"><AnimatedNumber value={stat.value} suffix={stat.suffix} /></p>
              <p className="mt-2 text-sm font-medium text-primary-foreground/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectors = [
  { name: "Agriculture", icon: Sprout, title: "Growing resilient choices", copy: "Helping farmers test, trust and adopt climate-smart practices that work in their fields.", tone: "bg-mint", art: "from-mint to-secondary" },
  { name: "Climate", icon: Sun, title: "Making climate action personal", copy: "Translating distant risks into choices people can understand and act on today.", tone: "bg-peach", art: "from-peach to-secondary" },
  { name: "Biodiversity", icon: Leaf, title: "Reconnecting people and nature", copy: "Using local stories and shared experience to inspire stewardship of living landscapes.", tone: "bg-sky", art: "from-sky to-secondary" },
  { name: "Clean Energy", icon: Zap, title: "Powering an inclusive transition", copy: "Building awareness and confidence around cleaner, more accessible energy choices.", tone: "bg-sun/30", art: "from-sun/30 to-secondary" },
  { name: "Health & Sanitation", icon: Users, title: "Turning knowledge into healthier habits", copy: "Designing communication around the realities of homes, families and public spaces.", tone: "bg-rose", art: "from-rose to-secondary" },
  { name: "Economy", icon: Mountain, title: "Strengthening local livelihoods", copy: "Creating pathways where sustainable choices also support dignity and opportunity.", tone: "bg-lilac", art: "from-lilac to-secondary" },
];

function SectorExplorer() {
  const [active, setActive] = useState(0);
  const sector = sectors[active] ?? sectors[0];
  if (!sector) return null;
  return (
    <section id="our-work" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><p className="eyebrow">Our sectors</p><h2 className="section-title mt-4">Working across multiple sectors.</h2></Reveal>
        <div className="mt-14 grid overflow-hidden rounded-lg border border-border lg:grid-cols-[.8fr_1.65fr]">
          <div role="tablist" aria-label="Sectors" className="grid grid-cols-2 border-b border-border bg-soft p-3 sm:grid-cols-3 lg:block lg:border-b-0 lg:border-r lg:p-5">
            {sectors.map((item, index) => (
              <button key={item.name} role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`flex min-h-14 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition-colors lg:px-4 ${active === index ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
                <item.icon className="size-4 shrink-0" /><span>{item.name}</span>{active === index && <ChevronRight className="ml-auto hidden size-4 lg:block" />}
              </button>
            ))}
          </div>
          <div className="relative min-h-[440px] overflow-hidden p-6 sm:p-10 lg:min-h-[520px] lg:p-14">
            <motion.div key={sector.name} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: easing }} className="grid h-full items-center gap-10 sm:grid-cols-[1fr_1.1fr]">
              <div>
                <span className={`inline-flex size-14 items-center justify-center rounded-full ${sector.tone}`}><sector.icon className="size-6 text-primary" /></span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-accent-warm">{sector.name}</p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{sector.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{sector.copy}</p>
                <a href="#stories" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary">See related work <ArrowRight className="size-4" /></a>
              </div>
              <div className={`relative aspect-square overflow-hidden rounded-full bg-gradient-to-br ${sector.art}`}>
                <div className="absolute inset-x-[12%] bottom-[12%] h-[38%] rounded-[50%] bg-primary/90" />
                <div className="absolute left-[44%] top-[16%] h-[54%] w-2 rounded-full bg-accent-warm" />
                <div className="absolute left-[25%] top-[25%] size-[28%] rounded-full bg-sun" />
                <div className="absolute right-[17%] top-[34%] size-[22%] rounded-full bg-ocean" />
                <sector.icon className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-primary-foreground" strokeWidth={1.2} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldStory() {
  return (
    <section className="bg-primary py-5 text-primary-foreground md:py-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden px-5 lg:grid-cols-2 lg:px-8">
        <Reveal className="min-h-[430px] overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <img loading="lazy" src={fieldStoryAsset.url} width={1408} height={1008} alt="Researcher listening to a farmer in her field" className="h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center rounded-b-lg bg-forest p-8 lg:rounded-r-lg lg:rounded-bl-none lg:p-14">
          <p className="eyebrow text-sun">From the field</p>
          <blockquote className="mt-6 font-display text-3xl font-bold leading-tight md:text-4xl">“The best solutions begin by asking—not assuming—what matters to people.”</blockquote>
          <p className="mt-6 text-sm leading-7 text-primary-foreground/70">A conversation in Odisha changed how we designed an entire farmer learning programme.</p>
          <Button asChild variant="outline" className="mt-8 w-fit rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-forest">
            <a href="#stories">Read the field note <ArrowRight /></a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

const stories = [
  { title: "Gamified Learning", tag: "Initiative", by: "Learning Lab", position: "0% 0%" },
  { title: "Storytelling for Change", tag: "Case study", by: "Meera Nair", position: "100% 0%" },
  { title: "Biodiversity Through Theatre", tag: "Field story", by: "Community Team", position: "0% 100%" },
  { title: "Capturing Field Stories", tag: "Watch", by: "Media Lab", position: "100% 100%", video: true },
];

function Stories() {
  return (
    <section id="stories" className="bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="eyebrow">Ideas in action</p><h2 className="section-title mt-4">Initiatives & case studies.</h2></div>
          <a href="#resources" className="inline-flex items-center gap-2 text-sm font-bold text-primary">View all stories <ArrowRight className="size-4" /></a>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story, index) => (
            <motion.article key={story.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -8, rotate: index % 2 ? 0.7 : -0.7 }} className="group overflow-hidden rounded-lg bg-card shadow-card">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img loading="lazy" src={initiativesAsset.url} width={1600} height={912} alt="" className="h-full w-full scale-[2.02] object-cover transition-transform duration-500 group-hover:scale-[2.1]" style={{ objectPosition: story.position }} />
                <span className="absolute left-4 top-4 rounded-full bg-surface px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">{story.tag}</span>
                {story.video && <span className="absolute inset-0 grid place-items-center bg-foreground/15"><span className="grid size-14 place-items-center rounded-full bg-sun text-forest transition-transform group-hover:scale-110"><Play className="ml-0.5 size-5 fill-current" /></span></span>}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold leading-tight">{story.title}</h3>
                <p className="mt-3 text-xs font-medium text-muted-foreground">By {story.by}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl px-5 lg:grid-cols-[1.55fr_.65fr] lg:px-8">
        <Reveal className="min-h-[440px] overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <img loading="lazy" src={communityAsset.url} width={1600} height={912} alt="Community members and field team together in a village" className="h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-between rounded-b-lg bg-accent-warm p-8 text-accent-warm-foreground lg:rounded-r-lg lg:rounded-bl-none lg:p-10">
          <Users className="size-10" strokeWidth={1.5} />
          <div className="py-14 lg:py-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Change is collective</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight">We work with people, not around them.</h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold">Partner with us <ArrowRight className="size-4" /></a>
        </Reveal>
      </div>
    </section>
  );
}

const insights = [
  { type: "Report", title: "What makes climate information actionable?", icon: BookOpen, tone: "bg-primary text-primary-foreground" },
  { type: "Toolkit", title: "A field guide to participatory storytelling", icon: MessageCircleMore, tone: "bg-peach text-foreground" },
  { type: "Brief", title: "Designing for trust in the clean energy transition", icon: Zap, tone: "bg-ocean text-primary-foreground" },
];

function Insights() {
  return (
    <section id="resources" className="bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><p className="eyebrow">Insights & knowledge hub</p><h2 className="section-title mt-4">Learning worth sharing.</h2></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group h-full overflow-hidden rounded-lg border border-border bg-card">
                <div className={`relative flex aspect-[16/10] items-center justify-center ${item.tone}`}>
                  <div className="absolute inset-5 border border-current opacity-25" />
                  <item.icon className="size-16 opacity-80 transition-transform group-hover:scale-110" strokeWidth={1.2} />
                  <span className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.17em]">Rooted / Knowledge Series</span>
                </div>
                <div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-warm">{item.type}</p><h3 className="mt-3 font-display text-xl font-bold leading-snug">{item.title}</h3><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Explore resource <ArrowRight className="size-4" /></a></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  function subscribe(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubscribed(true); }
  return (
    <footer id="contact" className="bg-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-14 border-b border-primary-foreground/15 pb-16 lg:grid-cols-[1.15fr_.85fr]">
          <div><p className="eyebrow text-sun">Stay curious</p><h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-tight md:text-5xl">Fresh field notes, ideas and useful tools—occasionally.</h2></div>
          <form onSubmit={subscribe} className="flex flex-col justify-end gap-3 sm:flex-row sm:items-end">
            <div className="flex-1"><label htmlFor="email" className="mb-2 block text-xs font-semibold text-primary-foreground/70">Email address</label><Input id="email" type="email" required placeholder="you@example.com" className="h-12 rounded-full border-primary-foreground/25 bg-primary-foreground/10 px-5 text-primary-foreground shadow-none placeholder:text-primary-foreground/45" /></div>
            <Button type="submit" className="h-12 rounded-full bg-sun px-6 text-forest shadow-none hover:bg-sun/90">{subscribed ? "You’re in" : "Subscribe"} <ArrowRight /></Button>
          </form>
        </div>
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2"><Brand light /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/60">Research, communication and action for a resilient, equitable India.</p></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-sun">Explore</p><div className="mt-5 grid gap-3 text-sm text-primary-foreground/70"><a href="#about">About</a><a href="#our-work">Our work</a><a href="#stories">Stories</a><a href="#resources">Resources</a></div></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-sun">Connect</p><p className="mt-5 text-sm text-primary-foreground/70">hello@rootedimpact.org<br />Bengaluru, India</p><div className="mt-5 flex gap-2">{[Linkedin, Instagram, Youtube, Facebook].map((Icon, index) => <a key={index} href="#contact" aria-label="Social profile" className="grid size-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10"><Icon className="size-4" /></a>)}</div></div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/45 sm:flex-row"><p>© 2026 Rooted Impact. All rights reserved.</p><div className="flex gap-5"><a href="#contact">Privacy</a><a href="#contact">Accessibility</a></div></div>
      </div>
    </footer>
  );
}

export function ImpactLanding() {
  return <main className="overflow-hidden"><Hero /><Pillars /><Impact /><SectorExplorer /><FieldStory /><Stories /><Community /><Insights /><Footer /></main>;
}