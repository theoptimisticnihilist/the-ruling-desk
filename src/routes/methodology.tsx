import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CLASSIFICATIONS } from "@/data/sampleRulingData";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — Truth Requires Process" },
      {
        name: "description",
        content:
          "Why Tribunal reviews itself: scope, classification, scoring, dissenting review, certainty labels, and disclosure for every ruling.",
      },
      { property: "og:title", content: "Methodology — Truth Requires Process" },
      {
        property: "og:description",
        content:
          "A media accuracy ruling should not depend on a single unchecked model response. Tribunal evaluates the article, then evaluates the evaluation.",
      },
    ],
  }),
  component: MethodologyPage,
});

const SCORING_DIMENSIONS: string[] = [
  "Quote fidelity",
  "Context retention",
  "Material omission",
  "Coverage",
  "Source provenance",
  "Tribunal integrity",
];

const CERTAINTY: { label: string; body: string }[] = [
  {
    label: "High",
    body: "The supplied record clearly supports the finding. A reasonable reader comparing the two documents would reach the same conclusion.",
  },
  {
    label: "Moderate",
    body: "The supplied record supports the finding, but the call relies on judgment about emphasis, sequencing, or compression rather than on a clean textual match.",
  },
  {
    label: "Low",
    body: "The supplied record is suggestive but not decisive. The finding is offered as the best reading available, not as a settled determination.",
  },
  {
    label: "Indeterminate",
    body: "The supplied record cannot resolve the question. The claim is outside the transcript and requires separate verification before any verdict is appropriate.",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:px-10 md:pt-24">
        <p className="institutional-mark mb-6">Methodology</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          Methodology: Truth Requires Process
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Tribunal is designed around a simple premise: a media accuracy
          ruling should not depend on a single unchecked model response. The
          system evaluates the article, then evaluates the evaluation.
        </p>

        {/* 1 — Why the tribunal reviews itself */}
        <Section index="01" title="Why the tribunal reviews itself">
          <p>
            Any system that claims to adjudicate truth must answer a basic
            question: who watches the watcher? Tribunal addresses that problem
            by making review part of the ruling itself. The first model issues
            a majority opinion. A second model challenges the opinion for
            category errors, weak evidence, inflated certainty, and reasoning
            beyond the record. The final ruling preserves both the judgment
            and the review that shaped it.
          </p>

          {/* Pull-quote callout */}
          <figure className="not-prose mt-8 border-l-4 border-ink bg-parchment-deep px-6 py-6 md:px-8 md:py-7">
            <blockquote className="font-serif text-xl leading-snug text-ink md:text-2xl">
              “The model tribunal does not merely improve the answer. It
              reveals where the adjudicator itself was oversimplifying the
              evidentiary record.”
            </blockquote>
            <figcaption className="institutional-mark mt-4">
              On the purpose of dissent
            </figcaption>
          </figure>
        </Section>

        {/* 2 — Scope of Review */}
        <Section index="02" title="Scope of Review">
          <p>
            Tribunal does not assume every article passage should appear in
            the interview. Real articles are mixed artifacts. Some passages
            are interview-derived. Others come from separate sources, reporter
            background, or claims that require external verification. The
            system classifies source type before scoring fidelity.
          </p>
        </Section>

        {/* 3 — Classification Categories */}
        <Section index="03" title="Classification Categories">
          <p>
            Every reviewed passage receives exactly one of four
            classifications. Classification answers a single question: where
            did this passage come from, relative to the supplied record?
          </p>
          <ol className="not-prose mt-6 space-y-6 border-t border-border pt-6">
            {CLASSIFICATIONS.map((c, i) => (
              <li
                key={c.value}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10"
              >
                <span className="font-serif text-2xl text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-xl leading-snug text-ink">
                    {c.value}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">
                    {c.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 4 — Scoring Dimensions */}
        <Section index="04" title="Scoring Dimensions">
          <p>
            Within interview-derived passages, fidelity is assessed against
            the dimensions below. They are reported separately so a reader
            can see where a ruling’s score is coming from.
          </p>
          <ul className="not-prose mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
            {SCORING_DIMENSIONS.map((d, i) => (
              <li key={d} className="bg-card p-5">
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-serif text-lg text-ink">{d}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 5 — Certainty Labels */}
        <Section index="05" title="Certainty Labels">
          <p>
            Each finding carries a certainty label that describes how strong
            the supplied record is for the call being made. Certainty is
            distinct from verdict: a confidently wrong reading would still
            score low certainty if the record does not support it.
          </p>
          <ul className="not-prose mt-6 divide-y divide-border border-y border-border">
            {CERTAINTY.map((c) => (
              <li
                key={c.label}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <p className="font-serif text-lg text-ink">{c.label}</p>
                <p className="text-base leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 6 — Disclosure */}
        <Section index="06" title="Disclosure">
          <p>
            This prototype uses model-assisted review to generate a sample
            public ruling. It is not a legal judgment. It demonstrates how an
            AI tribunal can make source-to-story compression inspectable,
            challenge its own reasoning, and produce a citable record.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-ink-soft tabular-nums">
            {index}
          </span>
          <h2 className="font-serif text-2xl text-ink md:text-3xl">{title}</h2>
        </div>
      </div>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
        {children}
      </div>
    </section>
  );
}
