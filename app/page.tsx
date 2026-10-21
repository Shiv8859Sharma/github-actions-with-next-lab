"use client";

import { useState } from "react";

interface PipelineStep {
  id: string;
  name: string;
  command: string;
  description: string;
  status: "idle" | "running" | "passed" | "failed";
  duration?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "checklist" | "commands">("pipeline");
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: true,
    step4: false,
    step5: false,
  });

  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: "step-lint",
      name: "Linting & Code Quality",
      command: "npm run lint",
      description: "Enforces ESLint flat rules, formatting guidelines, and detects anti-patterns.",
      status: "passed",
      duration: "1.8s",
    },
    {
      id: "step-test",
      name: "Automated Unit & Component Tests",
      command: "npm test",
      description: "Executes Vitest and React Testing Library specs to prevent regressions.",
      status: "passed",
      duration: "2.3s",
    },
    {
      id: "step-build",
      name: "TypeScript & Turbopack Build",
      command: "npm run build",
      description: "Compiles production assets, validates TypeScript types, and creates static pages.",
      status: "passed",
      duration: "4.1s",
    },
    {
      id: "step-audit",
      name: "Dependency Security Audit",
      command: "npm audit --omit=dev",
      description: "Scans production dependencies for known CVEs and security advisories.",
      status: "passed",
      duration: "1.2s",
    },
  ]);

  const simulatePipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);

    setSteps((prev) =>
      prev.map((step) => ({ ...step, status: "idle" }))
    );

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => (i === index ? { ...s, status: "running" } : s))
        );
      }, index * 900);

      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => (i === index ? { ...s, status: "passed" } : s))
        );
        if (index === steps.length - 1) {
          setPipelineRunning(false);
        }
      }, (index + 1) * 900);
    });
  };

  const toggleChecklist = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalCount = Object.keys(completedSteps).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-cyan-500 selection:text-neutral-950">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-violet-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] bg-cyan-700/10 blur-[120px] rounded-full" />
      </div>

      {/* Top Navbar */}
      <header className="border-b border-neutral-800/80 backdrop-blur-md sticky top-0 z-20 bg-neutral-950/75">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-sm tracking-tight text-neutral-200">
              GitHub Actions Lab
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              CI/CD Active
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="hidden sm:inline-block font-mono bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
              Next.js 16 • Vitest 5 • Node 22
            </span>
            <a
              id="github-repo-link"
              href="https://github.com/Shiv8859Sharma/github-actions-with-next-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 bg-neutral-800/80 hover:bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-700/60"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full flex flex-col gap-10">
        <section className="flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-medium">
            <span>🚀 CI/CD Automated Testing Ground</span>
          </div>

          <h1
            id="main-lab-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.15]"
          >
            Next.js GitHub Actions{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Laboratory
            </span>
          </h1>

          <p
            id="hero-description"
            className="text-neutral-400 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal"
          >
            Explore automated linting, unit testing with Vitest, production compilation, and security gates running on every pull request and push.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="simulate-pipeline-btn"
              onClick={simulatePipeline}
              disabled={pipelineRunning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-semibold shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {pipelineRunning ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-950"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Running Pipeline Simulation...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Simulate CI Pipeline
                </>
              )}
            </button>

            <button
              id="tab-toggle-commands"
              onClick={() => setActiveTab("commands")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
            >
              <span>View CI Commands</span>
            </button>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 text-sm gap-2">
          <button
            id="tab-pipeline"
            onClick={() => setActiveTab("pipeline")}
            className={`pb-3 px-3 font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === "pipeline"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            ⚡ CI Pipeline Stages
          </button>
          <button
            id="tab-checklist"
            onClick={() => setActiveTab("checklist")}
            className={`pb-3 px-3 font-medium transition-colors cursor-pointer border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "checklist"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <span>📋 Lab Checklist</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono">
              {completedCount}/{totalCount}
            </span>
          </button>
          <button
            id="tab-commands"
            onClick={() => setActiveTab("commands")}
            className={`pb-3 px-3 font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === "commands"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            🛠️ Workflow Commands
          </button>
        </div>

        {/* Tab 1: Pipeline Stages */}
        {activeTab === "pipeline" && (
          <section id="pipeline-section" className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>WORKFLOW: <span className="font-mono text-neutral-300">.github/workflows/ci.yml</span></span>
              <span>RUNNER: <span className="font-mono text-neutral-300">ubuntu-latest (Node.js 22)</span></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  id={step.id}
                  className="p-5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-neutral-800 text-xs font-mono font-bold text-neutral-300">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold text-neutral-200 text-sm">
                          {step.name}
                        </h3>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {step.status === "passed" && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full font-mono">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Passed ({step.duration})
                          </span>
                        )}
                        {step.status === "running" && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-full font-mono animate-pulse">
                            ● Running...
                          </span>
                        )}
                        {step.status === "idle" && (
                          <span className="text-xs text-neutral-500 font-mono">Queued</span>
                        )}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60 font-mono text-xs">
                    <span className="text-neutral-500">Command:</span>
                    <code className="text-cyan-300 bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
                      {step.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Lab Checklist */}
        {activeTab === "checklist" && (
          <section id="checklist-section" className="flex flex-col gap-6">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-200">GitHub Actions Mastery Progress</span>
                <span className="font-mono text-cyan-400 font-bold">{progressPct}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: "step1",
                  title: "Initial Workflow Trigger (hello.yml)",
                  detail: "Configured push and workflow_dispatch triggers on ubuntu-latest runner.",
                },
                {
                  id: "step2",
                  title: "Continuous Integration Workflow (ci.yml)",
                  detail: "Automates Node.js setup, caching, dependencies, and code linting.",
                },
                {
                  id: "step3",
                  title: "Automated Testing Suite (Vitest & React Testing Library)",
                  detail: "Executes unit and component tests to catch regressions before merging.",
                },
                {
                  id: "step4",
                  title: "Failure UI Validation in GitHub Pull Requests",
                  detail: "Tested deliberate lint/build errors and observed GitHub PR inline check annotations.",
                },
                {
                  id: "step5",
                  title: "Automated Deployment / Release Pipeline",
                  detail: "Configure production deployment step or release tagging when main is updated.",
                },
              ].map((item) => (
                <label
                  key={item.id}
                  id={`item-${item.id}`}
                  onClick={() => toggleChecklist(item.id)}
                  className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700/80 cursor-pointer flex items-start gap-4 transition-all"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    checked={!!completedSteps[item.id]}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-cyan-500 focus:ring-cyan-400 cursor-pointer accent-cyan-500"
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-sm font-medium ${
                        completedSteps[item.id]
                          ? "line-through text-neutral-400"
                          : "text-neutral-100"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-400 leading-relaxed">
                      {item.detail}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Workflow Commands */}
        {activeTab === "commands" && (
          <section id="commands-section" className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  cmd: "npm run lint",
                  title: "Static Linting",
                  desc: "Runs ESLint 9 using the flat configuration in eslint.config.mjs to enforce clean syntax.",
                },
                {
                  cmd: "npm test",
                  title: "Automated Unit Tests",
                  desc: "Runs Vitest test runner in single-run mode for CI environments.",
                },
                {
                  cmd: "npm run build",
                  title: "Production Build & Types",
                  desc: "Runs Next.js Turbopack compiler and executes full TypeScript type checking.",
                },
                {
                  cmd: "npm audit --omit=dev",
                  title: "Production Dependency Audit",
                  desc: "Verifies that production packages have zero known security vulnerabilities.",
                },
              ].map((c) => (
                <div
                  key={c.cmd}
                  className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 flex flex-col gap-2 justify-between"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-200">{c.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{c.desc}</p>
                  </div>
                  <pre className="font-mono text-xs bg-neutral-950 p-2.5 rounded border border-neutral-800/80 text-cyan-300 overflow-x-auto">
                    {c.cmd}
                  </pre>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-500">
        Next.js Actions Lab • Pair programming with GitHub Actions & Vitest
      </footer>
    </div>
  );
}
