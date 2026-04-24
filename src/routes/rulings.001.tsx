import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sampleRuling, type Verdict } from "@/data/sampleRuling";

export const Route = createFileRoute("/rulings/001")({
  head: () => ({
    meta: [
      { title: `Ruling ${sampleRuling.caseNumber} — Tribunal` },
      {
        name: "description",
        content: sampleRuling.summary.slice(0, 155),
      },
      { property: "og:title", content: `Ruling ${sampleRuling.caseNumber} — Tribunal` },
      { property: "og:description", content: sampleRuling.summary.slice(0, 155) },
      { property: "og:type", content: "article" },
    ],
  }),
  component: RulingPage,
});

const verdictStyles: Record<Verdict, { dot: string; text: string; border: string }> = {
  Supported: {
    dot: "bg-rule-supported",
    text: "text-rule-supported",
    border: "border-rule-supported/40",
  },
  "Partially Supported": {
    dot: "bg-rule-partial",
    text: "text-rule-partial",
    border: "border-rule-partial/40",
  },
  Unsupported: {
    dot: "bg-rule-unsupported",
    text: "text-rule-unsupported",
    border: "border-rule-unsupported/40",
  },
  Misleading: {
    dot: "bg-rule-misleading",
    text: "text-rule-misleading",
    border: "border-rule-misleading/40",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function RulingPage() {
  const r = sampleRuling;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(r.publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const verdictCounts = r.findings.reduce<Record<Verdict, number>>(
    (acc, f) => {
      acc[f.verdict] = (acc[f.verdict] ?? 0) + 1;
      return acc;
    },
    {
      Supported: 0,
      "Partially Supported": 0,
      Unsupported: 0,
      Misleading: 0,
    },
  );

  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:px-10 md:pt-20">
        {/* Masthead */}
        <div className="border-y-2 border-ink py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="institutional-mark">Tribunal · Ruling</span>
            <span className="institutional-mark">{r.caseNumber}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-sm text-ink-soft">Issued {formatDate(r.issuedAt)}</span>
            <span className="text-sm text-ink-soft">Public record</span>
          </div>
        </div>

        {/* Title */}
        <header className="mt-12">
          <p className="institutional-mark mb-4">In the matter of</p>
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl">
            {r.subject.publication} on{" "}
            <span className="italic">{r.subject.intervieweeName}</span>
          </h1>
          <p className="mt-6 font-serif text-xl italic leading-snug text-ink-soft">
            “{r.subject.articleTitle}”
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
            <Meta label="Interview recorded" value={formatDate(r.subject.interviewDate)} />
            <Meta label="Article published" value={formatDate(r.subject.articleDate)} />
            <Meta label="Publication" value={r.subject.publication} />
            <Meta
              label="Article"
              value={
                <a
                  href={r.subject.articleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-ink/40 hover:border-ink"
                >
                  Source link
                </a>
              }
            />
          </dl>
        </header>

        {/* Overall verdict */}
        <section className="mt-14 border border-border bg-card p-8 md:p-10">
          <p className="institutional-mark mb-4">Overall finding</p>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span
              className={`flex items-center gap-3 font-serif text-3xl ${verdictStyles[r.overallVerdict].text} md:text-4xl`}
            >
              <span
                className={`h-3 w-3 rounded-full ${verdictStyles[r.overallVerdict].dot}`}
                aria-hidden
              />
              {r.overallVerdict}
            </span>
            <span className="font-serif text-2xl text-ink-soft">
              Accuracy score{" "}
              <span className="text-ink">{r.scoreOutOf100}</span>
              <span className="text-base">/100</span>
            </span>
          </div>
          <p className="mt-6 text-base leading-relaxed text-ink md:text-lg">{r.summary}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-4">
            {(Object.keys(verdictCounts) as Verdict[]).map((v) => (
              <div key={v}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${verdictStyles[v].dot}`} aria-hidden />
                  <span className="text-xs uppercase tracking-wider text-ink-soft">{v}</span>
                </div>
                <div className="mt-1 font-serif text-2xl text-ink">{verdictCounts[v]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Findings */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
            <h2 className="font-serif text-2xl text-ink">Findings</h2>
            <span className="institutional-mark">{r.findings.length} in total</span>
          </div>

          <ol className="mt-8 space-y-14">
            {r.findings.map((f) => {
              const style = verdictStyles[f.verdict];
              return (
                <li key={f.number} className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
                  <div className="font-serif text-3xl text-ink-soft tabular-nums">
                    {String(f.number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className={`inline-flex items-center gap-2 border px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${style.text} ${style.border}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
                        {f.verdict}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-ink md:text-2xl">
                      {f.claim}
                    </h3>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <Quote
                        kind="Source"
                        location={f.sourceLocation}
                        text={f.sourceQuote}
                      />
                      <Quote
                        kind="Article"
                        location={f.articleLocation}
                        text={f.articleQuote}
                      />
                    </div>

                    <div className="mt-6 border-l-2 border-border-strong pl-5">
                      <p className="institutional-mark mb-2">Reasoning</p>
                      <p className="text-base leading-relaxed text-ink">{f.reasoning}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Notes */}
        <section className="mt-16 border-t border-border pt-8">
          <p className="institutional-mark mb-3">Note on scope</p>
          <p className="text-base leading-relaxed text-ink-soft">{r.notes}</p>
        </section>

        {/* Public URL */}
        <section className="mt-12 border border-border bg-parchment-deep p-6 md:p-8">
          <p className="institutional-mark mb-3">Stable public URL</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all font-mono text-sm text-ink">{r.publicUrl}</code>
            <button
              onClick={handleCopy}
              className="shrink-0 border border-ink px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-parchment"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </section>

        {/* Share card preview */}
        <section className="mt-12">
          <p className="institutional-mark mb-4">Share card preview</p>
          <ShareCard />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-ink-soft">{label}</dt>
      <dd className="mt-1 text-base text-ink">{value}</dd>
    </div>
  );
}

function Quote({
  kind,
  location,
  text,
}: {
  kind: "Source" | "Article";
  location: string;
  text: string;
}) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="institutional-mark">{kind}</span>
        <span className="text-xs text-ink-soft">{location}</span>
      </div>
      <p className="mt-3 font-serif text-lg leading-snug text-ink">“{text}”</p>
    </div>
  );
}

function ShareCard() {
  const r = sampleRuling;
  const style = verdictStyles[r.overallVerdict];
  return (
    <div className="overflow-hidden border border-border-strong">
      <div className="aspect-[1200/630] w-full bg-parchment-deep p-8 md:p-12">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl text-ink">Tribunal</span>
            <span className="institutional-mark">{r.caseNumber}</span>
          </div>
          <div>
            <p className="institutional-mark mb-3">Ruling</p>
            <p className="font-serif text-2xl leading-tight text-ink md:text-4xl">
              {r.subject.publication} on{" "}
              <span className="italic">{r.subject.intervieweeName}</span>
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${style.dot}`} aria-hidden />
              <span className={`font-serif text-xl ${style.text} md:text-2xl`}>
                {r.overallVerdict}
              </span>
              <span className="text-sm text-ink-soft">· {r.scoreOutOf100}/100</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/20 pt-4 text-xs text-ink-soft">
            <span>tribunal.example/rulings/{r.id}</span>
            <span>Issued {formatDate(r.issuedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
