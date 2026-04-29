import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Topic =
  | "AI"
  | "Blockchain"
  | "Networking"
  | "Cybersecurity"
  | "Web3"
  | "Enterprise"
  | "Quantum";

type BookStatus = "Live" | "Draft";

type Book = {
  id: string;
  catalogId: number;
  title: string;
  shortTitle: string;
  topic: Topic;
  publishedOn: string;
  cover: string;
  description: string;
  keyTopics: string[];
  audience: string;
  creatorEdition?: boolean;
  asin: string;
  status: BookStatus;
  resources: { label: string; href: string }[];
  authorNote: string;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TOPICS: Topic[] = [
  "AI",
  "Blockchain",
  "Networking",
  "Cybersecurity",
  "Web3",
  "Enterprise",
  "Quantum",
];

const BOOKS: Book[] = [
  {
    id: "enterprise-resource-planning",
    catalogId: 1,
    title: "Enterprise Resource Planning - DEEP DIVE by Charles Sterling",
    shortTitle: "Enterprise Resource Planning",
    topic: "Enterprise",
    publishedOn: "2025-08-28",
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description:
      "A practitioner's guide to designing, implementing, and optimizing modern ERP platforms for complex enterprise environments.",
    keyTopics: [
      "Platform selection",
      "Data migration",
      "Process mapping",
      "Change management",
    ],
    audience:
      "IT leaders, enterprise architects, and project managers overseeing ERP rollouts.",
    asin: "B0FP16RDCF",
    status: "Live",
    resources: [
      { label: "Sample chapter", href: "#" },
      { label: "Implementation checklist", href: "#" },
    ],
    authorNote:
      "I wrote this to give ERP teams a battle-tested reference that goes beyond vendor documentation.",
  },
  {
    id: "quantum-computing",
    catalogId: 2,
    title: "Quantum Computing - DEEP DIVE by Charles Sterling",
    shortTitle: "Quantum Computing",
    topic: "Quantum",
    publishedOn: "2025-03-13",
    cover:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description:
      "Understand quantum computing fundamentals, gate models, error correction, and practical hybrid algorithms for today's NISQ hardware.",
    keyTopics: [
      "Qubit models",
      "Shor's & Grover's algorithms",
      "Error correction",
      "Hybrid classical-quantum",
    ],
    audience:
      "Software engineers and researchers exploring quantum advantage in real applications.",
    asin: "B0F1BSRT86",
    status: "Live",
    resources: [
      { label: "Qiskit notebooks", href: "#" },
      { label: "Glossary of terms", href: "#" },
    ],
    authorNote:
      "Quantum is arriving faster than most expect — this book prepares you to evaluate and apply it responsibly.",
  },
  {
    id: "llm-deep-dive",
    catalogId: 3,
    title: "LLM - DEEP DIVE by Charles Sterling",
    shortTitle: "LLM - DEEP DIVE",
    topic: "AI",
    publishedOn: "2025-02-27",
    cover:
      "https://images.unsplash.com/photo-1677442135068-9a91f2f11a36?auto=format&fit=crop&w=800&q=80",
    description:
      "A technical deep dive into large language model architecture, fine-tuning pipelines, inference optimization, and responsible deployment.",
    keyTopics: [
      "Transformer internals",
      "LoRA & QLoRA",
      "RAG pipelines",
      "Safety alignment",
    ],
    audience:
      "ML engineers and platform teams building products powered by large language models.",
    asin: "B0DYP56YTX",
    status: "Live",
    resources: [
      { label: "Fine-tuning scripts", href: "#" },
      { label: "Evaluation benchmarks", href: "#" },
    ],
    authorNote:
      "I wanted engineers to move beyond API calls and truly understand what's happening inside these models.",
  },
  {
    id: "ccna-deep-dive",
    catalogId: 4,
    title: "CCNA - DEEP DIVE by Charles Sterling",
    shortTitle: "CCNA - DEEP DIVE",
    topic: "Networking",
    publishedOn: "2025-02-23",
    cover:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    description:
      "Comprehensive CCNA preparation with hands-on lab exercises, protocol analysis, and enterprise network design patterns.",
    keyTopics: [
      "OSPF & BGP",
      "VLANs & STP",
      "Network automation",
      "Security fundamentals",
    ],
    audience:
      "Aspiring and current network engineers preparing for CCNA certification.",
    asin: "B0DY5ZMPVY",
    status: "Live",
    resources: [
      { label: "Lab topology files", href: "#" },
      { label: "Practice exam questions", href: "#" },
    ],
    authorNote:
      "This goes beyond exam prep — it's a working reference for your first years in network engineering.",
  },
  {
    id: "ai-with-python-deep-dive",
    catalogId: 5,
    title: "AI with Python - DEEP DIVE by Charles Sterling",
    shortTitle: "AI with Python",
    topic: "AI",
    publishedOn: "2025-08-14",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    description:
      "Build production-grade AI systems in Python — from data pipelines and model training to deployment, monitoring, and governance.",
    keyTopics: [
      "Model ops",
      "Prompt engineering",
      "Vector pipelines",
      "Governance",
    ],
    audience:
      "Engineering leads, platform teams, and senior developers shipping AI to production.",
    asin: "B0FMDW2ZH1",
    status: "Live",
    resources: [
      { label: "Sample chapter", href: "#" },
      { label: "Code examples", href: "#" },
      { label: "Errata", href: "#" },
    ],
    authorNote:
      "I wrote this to help teams close the gap between notebooks and resilient production systems.",
  },
  {
    id: "multi-chain-protocol",
    catalogId: 6,
    title: "Multi-Chain Protocol - DEEP DIVE by Charles Sterling",
    shortTitle: "Multi-Chain Protocol",
    topic: "Blockchain",
    publishedOn: "2025-08-13",
    cover:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    description:
      "Design and operate cross-chain infrastructure: bridge security, interoperability standards, and multi-chain deployment strategies.",
    keyTopics: [
      "Bridge architecture",
      "Interoperability layers",
      "Cross-chain security",
      "Relayer design",
    ],
    audience:
      "Blockchain engineers and architects building multi-chain platforms and tooling.",
    asin: "B0FM6V9N2Q",
    status: "Live",
    resources: [
      { label: "Reference diagrams", href: "#" },
      { label: "Bridge audit checklist", href: "#" },
    ],
    authorNote:
      "Multi-chain is the operational reality now — this book prepares teams to build across ecosystems safely.",
  },
  {
    id: "malware-analysis",
    catalogId: 7,
    title: "MALWARE ANALYSIS - DEEP DIVE by Charles Sterling",
    shortTitle: "MALWARE ANALYSIS",
    topic: "Cybersecurity",
    publishedOn: "2025-06-24",
    cover:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description:
      "Systematic malware dissection methodology: static analysis, dynamic instrumentation, threat intelligence correlation, and reporting.",
    keyTopics: [
      "Reverse engineering",
      "Sandboxing",
      "IOC extraction",
      "Threat hunting",
    ],
    audience:
      "Security analysts, reverse engineers, and incident response teams.",
    asin: "B0DGLH1ZNJ",
    status: "Live",
    resources: [
      { label: "Sample payloads (safe)", href: "#" },
      { label: "Analysis templates", href: "#" },
    ],
    authorNote:
      "This is the operational manual I wish every SOC analyst had on day one.",
  },
  {
    id: "xrp-deep-dive",
    catalogId: 8,
    title: "XRP - DEEP DIVE by Charles Sterling",
    shortTitle: "XRP - DEEP DIVE",
    topic: "Blockchain",
    publishedOn: "2025-02-23",
    cover:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    description:
      "Technical exploration of the XRP Ledger: consensus mechanics, payment channels, token issuance, and enterprise integration patterns.",
    keyTopics: [
      "XRPL consensus",
      "Payment channels",
      "Token issuance",
      "Institutional integration",
    ],
    audience:
      "Developers and architects building payment solutions on the XRP Ledger.",
    asin: "B0DY5RL276",
    status: "Live",
    resources: [
      { label: "Transaction reference", href: "#" },
      { label: "SDK quickstart", href: "#" },
    ],
    authorNote:
      "XRP's ledger is underrated as an engineering platform — this book shows what's really possible.",
  },
  {
    id: "web3-frontend",
    catalogId: 9,
    title: "Web3 Frontend - DEEP DIVE by Charles Sterling",
    shortTitle: "Web3 Frontend",
    topic: "Web3",
    publishedOn: "2025-08-04",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description:
      "Build reliable Web3 frontends: wallet UX, transaction flows, on-chain data indexing, and security best practices for dApps.",
    keyTopics: [
      "Wallet integration",
      "Transaction UX",
      "On-chain indexing",
      "Frontend security",
    ],
    audience:
      "Frontend engineers and product teams shipping user-facing decentralized applications.",
    asin: "B0FL1K5M6V",
    status: "Live",
    resources: [
      { label: "Component library", href: "#" },
      { label: "Security checklist", href: "#" },
    ],
    authorNote:
      "Web3 UX doesn't have to be painful — this book provides the patterns that actually work.",
  },
  {
    id: "solana-deep-dive",
    catalogId: 10,
    title: "SOLANA - DEEP DIVE by Charles Sterling",
    shortTitle: "SOLANA - DEEP DIVE",
    topic: "Blockchain",
    publishedOn: "2025-02-25",
    cover:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=800&q=80",
    description:
      "Deep technical coverage of the Solana runtime: Sealevel parallelism, account model, program development, and performance optimization.",
    keyTopics: [
      "Sealevel runtime",
      "BPF programs",
      "Account model",
      "TPS optimization",
    ],
    audience:
      "Solana developers, protocol engineers, and high-performance dApp builders.",
    asin: "B0DYF9MNWJ",
    status: "Live",
    resources: [
      { label: "Program templates", href: "#" },
      { label: "Performance benchmarks", href: "#" },
    ],
    authorNote:
      "Solana's architecture is genuinely different — this book teaches you to think in parallel from day one.",
  },
  {
    id: "smart-contract-development",
    catalogId: 11,
    title: "Smart Contract Development - DEEP DIVE by Charles Sterling",
    shortTitle: "Smart Contract Development",
    topic: "Blockchain",
    publishedOn: "2025-08-05",
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    description:
      "End-to-end smart contract engineering: secure Solidity patterns, testing methodology, upgrade patterns, and audit preparation.",
    keyTopics: [
      "Solidity patterns",
      "Testing & fuzzing",
      "Upgradeable contracts",
      "Audit readiness",
    ],
    audience:
      "Blockchain developers writing and shipping production smart contracts.",
    asin: "B0FL71C4CF",
    status: "Live",
    resources: [
      { label: "Contract templates", href: "#" },
      { label: "Audit checklist", href: "#" },
    ],
    authorNote:
      "I wrote this to be the contract engineering manual I needed when I started — rigorous but practical.",
  },
  {
    id: "blockchain-fundamentals",
    catalogId: 12,
    title: "BLOCKCHAIN FUNDAMENTALS - DEEP DIVE by Charles Sterling",
    shortTitle: "BLOCKCHAIN FUNDAMENTALS",
    topic: "Blockchain",
    publishedOn: "2025-07-31",
    cover:
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=800&q=80",
    description:
      "Comprehensive foundation in blockchain technology: cryptography, consensus mechanisms, network architecture, and real-world use cases.",
    keyTopics: [
      "Cryptographic primitives",
      "Consensus mechanisms",
      "Network architecture",
      "Use-case analysis",
    ],
    audience:
      "Engineers, managers, and technical professionals entering the blockchain space.",
    asin: "B0FKM9CGQV",
    status: "Live",
    resources: [
      { label: "Concept maps", href: "#" },
      { label: "Decision framework", href: "#" },
    ],
    authorNote:
      "This is the starting point — clear, rigorous, and designed for technical professionals who need depth fast.",
  },
  {
    id: "tether-deep-dive",
    catalogId: 13,
    title: "TETHER - DEEP DIVE by Charles Sterling",
    shortTitle: "TETHER - DEEP DIVE",
    topic: "Blockchain",
    publishedOn: "2025-05-06",
    cover:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    description:
      "In-depth technical analysis of Tether: reserve architecture, Omni/ERC-20/Tron implementations, compliance mechanics, and market dynamics.",
    keyTopics: [
      "Stablecoin mechanics",
      "Multi-chain issuance",
      "Reserve transparency",
      "Compliance frameworks",
    ],
    audience:
      "Fintech engineers, compliance analysts, and stablecoin infrastructure teams.",
    asin: "B0F7LMRKHM",
    status: "Live",
    resources: [
      { label: "Chain comparison table", href: "#" },
      { label: "Compliance checklist", href: "#" },
    ],
    authorNote:
      "Tether is the most used stablecoin and least understood — this book changes that.",
  },
  {
    id: "ethereum-deep-dive",
    catalogId: 14,
    title: "Ethereum - DEEP DIVE by Charles Sterling",
    shortTitle: "Ethereum - DEEP DIVE",
    topic: "Blockchain",
    publishedOn: "2025-03-21",
    cover:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=800&q=80",
    description:
      "Technical deep dive into Ethereum: EVM internals, gas optimization, Layer 2 scaling, and protocol-level architecture.",
    keyTopics: [
      "EVM internals",
      "Gas optimization",
      "Layer 2 scaling",
      "Protocol upgrades",
    ],
    audience:
      "Ethereum developers, protocol researchers, and dApp architects.",
    asin: "B0F23P9Y26",
    status: "Live",
    resources: [
      { label: "Gas calculator", href: "#" },
      { label: "Opcode reference", href: "#" },
    ],
    authorNote:
      "Ethereum's complexity rewards deep study — this book is your shortcut to real mastery.",
  },
  {
    id: "ai-with-python-creators-edition",
    catalogId: 15,
    title: "AI with Python - Creator's Edition by Charles Sterling",
    shortTitle: "AI with Python - Creator's Edition",
    topic: "AI",
    publishedOn: "2025-08-15",
    cover:
      "https://images.unsplash.com/photo-1684369176170-463e84248b70?auto=format&fit=crop&w=800&q=80",
    description:
      "The premium Creator's Edition of AI with Python: expanded case studies, exclusive code notebooks, and extended production deployment guides.",
    keyTopics: [
      "Advanced pipelines",
      "Production MLOps",
      "Extended case studies",
      "Creator annotations",
    ],
    audience:
      "Senior engineers and team leads who want the deepest possible AI with Python reference.",
    creatorEdition: true,
    asin: "B0DZD8S4VR",
    status: "Draft",
    resources: [
      { label: "Exclusive notebooks", href: "#" },
      { label: "Creator annotations", href: "#" },
    ],
    authorNote:
      "This Creator's Edition adds everything I couldn't fit in the standard edition — more depth, more code, more war stories.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function pill(active: boolean): string {
  return `rounded-md border px-3 py-1.5 text-sm transition ${
    active
      ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
      : "border-slate-700 text-slate-300 hover:border-slate-500"
  }`;
}

const selectClass =
  "rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400";

/* ------------------------------------------------------------------ */
/*  Scroll-to-top on route change                                      */
/* ------------------------------------------------------------------ */

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Shared nav link class                                               */
/* ------------------------------------------------------------------ */

function navClassName({ isActive }: { isActive: boolean }): string {
  return `transition ${isActive ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"}`;
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function Header({
  search,
  setSearch,
  highContrast,
  setHighContrast,
}: {
  search: string;
  setSearch: (v: string) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/books");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-[#0a192f]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-content-center rounded-md border border-cyan-400/50 bg-cyan-500/10 text-cyan-300">
            {`</>`}
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide">
              Charles Sterling
            </p>
            <p className="text-[11px] text-slate-400">DEEP DIVE Series</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
          <NavLink className={navClassName} to="/books">
            Books
          </NavLink>
          <NavLink className={navClassName} to="/about">
            About
          </NavLink>
          <NavLink className={navClassName} to="/contact">
            Contact
          </NavLink>
        </nav>

        {/* Desktop search */}
        <form onSubmit={submit} className="hidden flex-1 md:block md:max-w-xs">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search books by title or topic"
            placeholder="Search title or topic…"
            className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          />
        </form>

        {/* High-contrast toggle (desktop) */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="hidden rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 md:block"
        >
          {highContrast ? "Standard" : "High Contrast"}
        </button>

        {/* Mobile hamburger */}
        <button
          className="ml-auto rounded-md border border-slate-700 px-2 py-1 text-slate-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-800 bg-[#0a192f] px-4 py-3 md:hidden">
          <form onSubmit={submit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search books by title or topic"
              placeholder="Search title or topic…"
              className="mb-3 w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
            />
          </form>
          <div className="flex flex-col gap-3 text-sm">
            <NavLink className={navClassName} to="/books" onClick={() => setOpen(false)}>
              Books
            </NavLink>
            <NavLink className={navClassName} to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink className={navClassName} to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className="w-fit rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-300"
            >
              {highContrast ? "Standard" : "High Contrast"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0a192f]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Charles Sterling. All rights
          reserved.
        </p>
        <p>
          Disclosure: As an Amazon Associate, this site may earn from
          qualifying purchases.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-cyan-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-cyan-300">
            LinkedIn
          </a>
          <a href="#" className="hover:text-cyan-300">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

function HomePage({ books }: { books: Book[] }) {
  const liveBooks = books.filter((b) => b.status === "Live");
  const featured = liveBooks.slice(0, 4);
  const [current, setCurrent] = useState(0);
  const [topicFilter, setTopicFilter] = useState<Topic | "All">("All");

  useEffect(() => {
    const timer = window.setInterval(
      () => setCurrent((v) => (v + 1) % featured.length),
      4500
    );
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const filtered = liveBooks.filter(
    (b) => topicFilter === "All" || b.topic === topicFilter
  );

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative isolate overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(45,212,191,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_45%)]" />
        <div className="relative mx-auto grid min-h-[75vh] w-full max-w-7xl content-center gap-8 px-4 py-20 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-sm uppercase tracking-[0.25em] text-cyan-300"
          >
            Charles Sterling &mdash; Technical Deep Dives
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Mastering Enterprise, Blockchain, AI &amp; Cybersecurity.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-2xl text-lg text-slate-300"
          >
            Practical, developer-friendly books built for engineers shipping
            real systems under real constraints.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/books"
              className="rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#0a192f] transition hover:bg-cyan-300"
            >
              Explore Catalog
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300"
            >
              Bulk Orders
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- Featured carousel ---- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-3xl text-white">
          Featured Releases
        </h2>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.article
              key={featured[current]?.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 border border-slate-800 bg-slate-900/40 p-5 sm:grid-cols-[220px_1fr]"
            >
              <img
                src={featured[current]?.cover}
                alt={`Cover of ${featured[current]?.shortTitle}`}
                loading="lazy"
                className="h-[300px] w-full object-cover"
              />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                  DEEP DIVE
                </p>
                <h3 className="font-serif text-3xl text-white">
                  {featured[current]?.shortTitle}
                </h3>
                <p className="text-slate-300">
                  {featured[current]?.description}
                </p>
                <p className="text-sm text-slate-400">
                  Topic: {featured[current]?.topic} &middot;{" "}
                  {formatDate(featured[current]?.publishedOn)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/books/${featured[current]?.id}`}
                    className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    View detail
                  </Link>
                  <a
                    href={amazonUrl(featured[current]?.asin)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    Buy on Amazon &rarr;
                  </a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {featured.map((book, i) => (
              <button
                key={book.id}
                onClick={() => setCurrent(i)}
                className={`border px-3 py-4 text-left transition ${
                  current === i
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-slate-800 bg-slate-900/30 hover:border-slate-600"
                }`}
              >
                <p className="font-serif text-sm text-white">
                  {book.shortTitle}
                </p>
                <p className="text-xs text-slate-400">{book.topic}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Quick filter ---- */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Browse by Topic
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setTopicFilter("All")}
            className={pill(topicFilter === "All")}
          >
            All Topics
          </button>
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopicFilter(t)}
              className={pill(topicFilter === t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((book) => (
            <article
              key={book.id}
              className="border border-slate-800 bg-slate-900/30 p-4 transition hover:border-cyan-400/50"
            >
              <p className="text-xs text-cyan-300">{book.topic}</p>
              <h3 className="font-serif text-xl text-white">
                {book.shortTitle}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {formatDate(book.publishedOn)}
              </p>
              <div className="mt-3 flex gap-3">
                <Link
                  to={`/books/${book.id}`}
                  className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Details
                </Link>
                <a
                  href={amazonUrl(book.asin)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Amazon &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---- Why DEEP DIVE? ---- */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-2 font-serif text-3xl text-white">
            Why DEEP DIVE?
          </h2>
          <p className="max-w-3xl text-slate-300">
            Every title is written for hands-on practitioners. You get
            architecture choices, trade-offs, implementation patterns, and
            battle-tested checklists that map directly to modern engineering
            workflows. No fluff. No filler. Just depth you can ship.
          </p>
        </div>
      </section>

      {/* ---- Build Your Bundle ---- */}
      <BundleBuilder books={liveBooks} />

      {/* ---- Newsletter ---- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Release Updates
        </h2>
        <p className="mb-4 max-w-2xl text-slate-300">
          Get launch alerts, sample chapter drops, and DEEP DIVE update notes.
        </p>
        <form className="flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@company.com"
            className="flex-1 border border-slate-700 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
          />
          <button className="bg-cyan-400 px-5 py-2 text-sm font-semibold text-[#0a192f]">
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Bundle Builder                                                     */
/* ------------------------------------------------------------------ */

function BundleBuilder({ books }: { books: Book[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = books.filter((b) => selected.includes(b.id));
  const count = chosen.length;
  const discount = count >= 5 ? 0.2 : count >= 3 ? 0.15 : 0;

  const toggle = (id: string) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-white">Build Your Bundle</h2>
          <p className="text-slate-300">
            Select 3+ books for a 15% preview discount, or 5+ for 20%.
          </p>
        </div>
        <motion.p
          key={count}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-cyan-300"
        >
          Selected: {count}
        </motion.p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <label
            key={book.id}
            className="flex cursor-pointer items-center justify-between border border-slate-800 bg-slate-900/30 p-3"
          >
            <span>
              <span className="block font-serif text-lg text-white">
                {book.shortTitle}
              </span>
              <span className="text-xs text-slate-400">{book.topic}</span>
            </span>
            <input
              type="checkbox"
              checked={selected.includes(book.id)}
              onChange={() => toggle(book.id)}
              className="h-4 w-4 accent-cyan-400"
            />
          </label>
        ))}
      </div>

      {count >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-md border border-cyan-400/30 bg-cyan-400/5 p-4"
        >
          <p className="text-cyan-200">
            Bundle of {count} books &mdash;{" "}
            <span className="font-semibold">{Math.round(discount * 100)}% preview discount</span>{" "}
            when you purchase individually via Amazon.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            (Discount shown for planning purposes — actual savings applied per-title at checkout.)
          </p>
        </motion.div>
      )}
    </section>
  );
}

/* ================================================================== */
/*  BOOKS CATALOG PAGE                                                 */
/* ================================================================== */

function CatalogPage({ books, search }: { books: Book[]; search: string }) {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const [statusFilter, setStatusFilter] = useState<BookStatus | "All">("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    const data = [...books].filter((b) => {
      const q = search.toLowerCase();
      const matchSearch =
        `${b.title} ${b.shortTitle} ${b.topic}`.toLowerCase().includes(q);
      const matchTopic = topic === "All" || b.topic === topic;
      const matchStatus =
        statusFilter === "All" || b.status === statusFilter;
      return matchSearch && matchTopic && matchStatus;
    });

    data.sort((a, b) => {
      if (sortBy === "title") return a.shortTitle.localeCompare(b.shortTitle);
      if (sortBy === "topic") return a.topic.localeCompare(b.topic);
      return b.publishedOn.localeCompare(a.publishedOn);
    });

    return data;
  }, [books, search, topic, statusFilter, sortBy]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-white">Books Catalog</h1>
      <p className="mt-2 text-slate-300">
        {books.length} titles in the DEEP DIVE series &middot; All linked
        directly to Amazon.
      </p>

      {/* Filters */}
      <div className="mt-6 grid gap-3 border border-slate-800 bg-slate-900/30 p-4 md:grid-cols-4">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic | "All")}
          className={selectClass}
        >
          <option value="All">All Topics</option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as BookStatus | "All")
          }
          className={selectClass}
        >
          <option value="All">All Statuses</option>
          <option value="Live">Live</option>
          <option value="Draft">Coming Soon</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={selectClass}
        >
          <option value="newest">Newest First</option>
          <option value="title">Title A-Z</option>
          <option value="topic">Topic</option>
        </select>
        <p className="flex items-center text-sm text-slate-400">
          Showing {filtered.length} of {books.length}
        </p>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((book) => (
          <motion.article
            key={book.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="group border border-slate-800 bg-slate-900/30 p-4 transition hover:border-cyan-400/60"
          >
            <div className="relative">
              <img
                src={book.cover}
                loading="lazy"
                alt={`Cover of ${book.shortTitle}`}
                className="h-64 w-full object-cover"
              />
              {book.status === "Draft" && (
                <span className="absolute right-2 top-2 rounded bg-amber-500/90 px-2 py-0.5 text-xs font-semibold text-black">
                  Coming Soon
                </span>
              )}
              {book.creatorEdition && (
                <span className="absolute left-2 top-2 rounded bg-cyan-500/90 px-2 py-0.5 text-xs font-semibold text-black">
                  Creator's Edition
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                {book.topic}
              </p>
              <h2 className="font-serif text-2xl text-white">
                {book.shortTitle}
              </h2>
              <p className="text-sm text-slate-400">
                {formatDate(book.publishedOn)}
              </p>
              <div className="flex gap-3 pt-1">
                <Link
                  to={`/books/${book.id}`}
                  className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200"
                >
                  View detail
                </Link>
                {book.status === "Live" && (
                  <a
                    href={amazonUrl(book.asin)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200"
                  >
                    Buy on Amazon &rarr;
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-slate-400">
          No books match your filters. Try broadening your search.
        </p>
      )}
    </section>
  );
}

/* ================================================================== */
/*  BOOK DETAIL PAGE                                                   */
/* ================================================================== */

function BookDetailPage({ books }: { books: Book[] }) {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const [tab, setTab] = useState<"overview" | "purchase" | "author" | "resources">(
    "overview"
  );

  if (!book) return <Navigate to="/books" replace />;

  const isLive = book.status === "Live";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/books"
        className="mb-6 inline-block text-sm text-slate-400 hover:text-cyan-300"
      >
        &larr; Back to catalog
      </Link>

      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Cover */}
        <div className="relative">
          <img
            src={book.cover}
            loading="lazy"
            alt={`Cover of ${book.shortTitle}`}
            className="h-auto w-full object-cover"
          />
          {book.creatorEdition && (
            <span className="absolute left-0 top-0 rounded-br bg-cyan-500 px-3 py-1 text-sm font-semibold text-black">
              Creator's Edition
            </span>
          )}
          {!isLive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded bg-amber-500 px-4 py-2 text-lg font-bold text-black">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
            DEEP DIVE Series
          </p>
          <h1 className="mt-1 font-serif text-4xl text-white">
            {book.shortTitle}
          </h1>
          <p className="mt-2 text-slate-300">
            By Charles Sterling &middot; {formatDate(book.publishedOn)}
          </p>

          {/* Main purchase CTA */}
          {isLive ? (
            <a
              href={amazonUrl(book.asin)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#0a192f] transition hover:bg-cyan-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.4.4-.1 1.1.5 1.1H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              Buy on Amazon
            </a>
          ) : (
            <p className="mt-4 text-sm text-amber-300">
              This title is not yet available for purchase.
            </p>
          )}

          <p className="mt-3 text-xs text-slate-500">
            ASIN: {book.asin} &middot;{" "}
            <a
              href={amazonUrl(book.asin)}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300"
            >
              {amazonUrl(book.asin)}
            </a>
          </p>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setTab("overview")} className={pill(tab === "overview")}>
              Overview
            </button>
            <button onClick={() => setTab("purchase")} className={pill(tab === "purchase")}>
              Purchase Info
            </button>
            <button onClick={() => setTab("author")} className={pill(tab === "author")}>
              Author Note
            </button>
            <button onClick={() => setTab("resources")} className={pill(tab === "resources")}>
              Resources
            </button>
          </div>

          {/* Tab panels */}
          <div className="mt-6 border border-slate-800 bg-slate-900/30 p-5">
            {tab === "overview" && (
              <div className="space-y-4">
                <p className="text-slate-200">{book.description}</p>
                <p className="text-sm text-slate-400">
                  <span className="text-slate-200">Target audience:</span>{" "}
                  {book.audience}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {book.keyTopics.map((t) => (
                    <span
                      key={t}
                      className="border border-slate-700 px-2 py-1 text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tab === "purchase" && (
              <div className="space-y-4">
                <p className="text-slate-200">
                  Available formats may include Kindle eBook, Paperback, and
                  Hardcover. Click below to see all available formats and
                  current pricing on Amazon.
                </p>
                {isLive ? (
                  <a
                    href={amazonUrl(book.asin)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#0a192f] hover:bg-cyan-300"
                  >
                    View on Amazon &rarr;
                  </a>
                ) : (
                  <p className="text-sm text-amber-300">
                    Not yet available for purchase.
                  </p>
                )}
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <h3 className="text-sm font-semibold text-slate-200">
                    Need author or bulk copies?
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    For institutional orders, desk copies, or bulk purchases,{" "}
                    <Link to="/contact" className="text-cyan-300 hover:text-cyan-200">
                      contact the author
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {tab === "author" && (
              <p className="text-slate-200">{book.authorNote}</p>
            )}

            {tab === "resources" && (
              <div className="space-y-2">
                {book.resources.length > 0 ? (
                  book.resources.map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      className="block text-cyan-300 hover:text-cyan-200"
                    >
                      {r.label}
                    </a>
                  ))
                ) : (
                  <p className="text-slate-400">
                    Resources will be available after publication.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Order Author Copies CTA */}
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-md border border-cyan-400 px-5 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
          >
            Order Author / Bulk Copies
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ABOUT PAGE                                                         */
/* ================================================================== */

function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-white">About the Author</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
          alt="Professional portrait of Charles Sterling"
          loading="lazy"
          className="h-80 w-full object-cover rounded"
        />
        <div className="space-y-3 text-slate-300">
          <p>
            <span className="font-semibold text-white">Charles Sterling</span>{" "}
            is a technical author and enterprise advisor focused on applied AI,
            secure cloud systems, blockchain architecture, and operational
            resilience.
          </p>
          <p>
            His writing philosophy is simple: <em>no fluff, no abstract theory
            without implementation detail</em>, and no recommendations that
            ignore delivery constraints.
          </p>
          <p>
            The <span className="text-cyan-300">DEEP DIVE</span> series is
            designed for developers and technical leaders who need to move
            quickly while making durable engineering decisions. Each title
            delivers architecture choices, trade-offs, implementation patterns,
            and battle-tested checklists.
          </p>
          <p>
            Charles covers topics spanning AI and large language models,
            blockchain protocols, cybersecurity operations, enterprise
            networking, Web3 development, quantum computing, and enterprise
            resource planning.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-sm">
            <a
              href="#"
              className="rounded border border-slate-700 px-3 py-1.5 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="rounded border border-slate-700 px-3 py-1.5 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
            >
              GitHub
            </a>
            <a
              href="#"
              className="rounded border border-slate-700 px-3 py-1.5 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
            >
              Amazon Author Central
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTACT PAGE                                                       */
/* ================================================================== */

function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-white">
        Contact &amp; Bulk Orders
      </h1>
      <p className="mt-2 text-slate-300">
        Reader questions, institutional orders, and speaking/workshop requests.
      </p>

      <form className="mt-6 space-y-4 border border-slate-800 bg-slate-900/30 p-5">
        <label className="block text-sm text-slate-300">
          Name
          <input
            className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Inquiry Type
          <select className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400">
            <option>Reader Question</option>
            <option>Bulk / Institutional Purchase</option>
            <option>Author Copy Request</option>
            <option>Speaking / Workshop Request</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Message
          <textarea
            rows={5}
            className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
          />
        </label>
        <button className="rounded-md bg-cyan-400 px-5 py-2 text-sm font-semibold text-[#0a192f]">
          Send Message
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-400">
        Direct author-copy orders:{" "}
        <a
          href="mailto:orders@charlessterling.dev"
          className="text-cyan-300 hover:text-cyan-200"
        >
          orders@charlessterling.dev
        </a>
      </p>
    </section>
  );
}

/* ================================================================== */
/*  ANIMATED ROUTES                                                    */
/* ================================================================== */

function AnimatedRoutes({
  books,
  search,
}: {
  books: Book[];
  search: string;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage books={books} />} />
          <Route
            path="/books"
            element={<CatalogPage books={books} search={search} />}
          />
          <Route
            path="/books/:id"
            element={<BookDetailPage books={books} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  SITE WRAPPER                                                       */
/* ================================================================== */

function Site() {
  const [search, setSearch] = useState("");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100">
      {/* Circuit-grid texture */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:70px_70px] opacity-50" />

      <div className="relative">
        <Header
          search={search}
          setSearch={setSearch}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
        />
        <ScrollToTop />
        <AnimatedRoutes books={BOOKS} search={search} />
        <Footer />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  APP ENTRY                                                          */
/* ================================================================== */

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
