import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sampleRulingData, formatRulingDate } from "@/data/sampleRulingData";

const r = sampleRulingData;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tribunal — Turn source material into a public accuracy ruling" },
      {
        name: "description",
        content:
          "Tribunal compares interviews to published coverage, separates source-derived claims from external reporting, and issues a self-reviewed public ruling with evidence, scores, and a shareable record.",
      },
      {
        property: "og:title",
        content: "Tribunal — Turn source material into a public accuracy ruling",
      },
      {
        property: "og:description",
        content:
          "Tribunal compares interviews to published coverage, separates source-derived claims from external reporting, and issues a self-reviewed public ruling.",
      },
    ],
  }),
  component: HomePage,
});

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Add the source record",
    body: "Upload or paste an interview transcript, audio, or video.",
  },
  {
    n: "02",
    title: "Add the published article",
    body: "Paste the article or URL.",
  },
  {
    n: "03",
    title: "Issue a public ruling",
    body: "Receive a claim-level fidelity report, model review, and shareable scorecard.",
  },
];

const MEASURES: { label: string; body: string }[] = [
  {
    label: "Quote fidelity",
    body: "How closely article quotations track the words on the supplied record.",
  },
  {
    label: "Context retention",
    body: "Whether qualifications and hedges in the source survive into the article.",
  },
  {
    label: "Material omission",
    body: "Whether substantive elements of the source are dropped in a way that changes meaning.",
  },
  {
    label: "Coverage",
    body: "How much of the source the article actually engages with.",
  },
  {
    label: "Source provenance",
    body: "Whether each passage is interview-derived, separately sourced, reporter context, or unverified.",
  },
  {
    label: "Tribunal integrity",
    body: "Whether the ruling held up to adversarial review and what the dissent changed.",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
            <p className="institutional-mark mb-8">
              Tribunal · AI Media Accuracy Verifier
            </p>
            <h1 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink md:text-6xl">
              Turn source material into a public accuracy ruling.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              Tribunal compares interviews to published coverage, separates
              source-derived claims from external reporting, and issues a
              self-reviewed public ruling with evidence, scores, and a
              shareable record.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                to="/rulings/001"
                className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-ink/90"
              >
                View Sample Ruling
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-3 border-b border-ink/40 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Analyze a Story
              </Link>
            </div>
          </div>
        </section>

        {/* Three steps */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  01
                </span>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">
                  How a ruling is issued
                </h2>
              </div>
              <span className="institutional-mark">3 steps</span>
            </div>

            <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="border-t border-border-strong pt-6"
                >
                  <div className="font-serif text-3xl text-ink-soft tabular-nums">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What it measures */}
        <section className="border-b border-border bg-parchment-deep">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  02
                </span>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">
                  What it measures
                </h2>
              </div>
              <span className="institutional-mark">
                {MEASURES.length} dimensions
              </span>
            </div>

            <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {MEASURES.map((m, i) => (
                <li key={m.label} className="border-t border-border pt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-ink-soft tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-lg text-ink">{m.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                    {m.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Demo preview card */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  03
                </span>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">
                  Sample ruling on file
                </h2>
              </div>
              <span className="institutional-mark">
                {r.caseMetadata.docketNumber}
              </span>
            </div>

            <Link
              to="/rulings/001"
              className="group mt-8 block border border-border bg-card transition-colors hover:border-ink"
            >
              <div className="grid gap-px bg-border md:grid-cols-[1.4fr_1fr]">
                {/* Left: case body */}
                <div className="bg-card p-6 md:p-10">
                  <p className="institutional-mark mb-4">In the matter of</p>
                  <h3 className="font-serif text-2xl leading-snug text-ink md:text-3xl">
                    {r.caseMetadata.caseTitle}
                  </h3>
                  <p className="mt-4 font-serif text-base italic text-ink-soft">
                    Rating — {r.ratingLabel}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-ink-soft md:text-base">
                    {r.shareCard.summary}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-xs text-ink-soft">
                    <span className="font-mono">
                      {r.caseMetadata.publicUrl}
                    </span>
                    <span className="inline-flex items-center gap-2 font-medium text-ink transition-transform group-hover:translate-x-1">
                      Open ruling
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>

                {/* Right: scoreboard */}
                <div className="grid grid-cols-1 gap-px bg-border">
                  <Mini
                    label="Faithfulness"
                    value={`${r.topLineScores.faithfulnessToSource.score}`}
                    suffix="/100"
                    note={r.topLineScores.faithfulnessToSource.label}
                  />
                  <Mini
                    label="Verifiability"
                    value={`${r.topLineScores.verifiabilityOfArticleClaims.score}`}
                    suffix="/100"
                    note={r.topLineScores.verifiabilityOfArticleClaims.label}
                  />
                  <Mini
                    label="Tribunal review"
                    value={`${r.topLineScores.tribunalReview.checksPassed}/${r.topLineScores.tribunalReview.checksTotal}`}
                    suffix="checks"
                    note={r.topLineScores.tribunalReview.label}
                  />
                  <Mini
                    label="Issued"
                    value={formatRulingDate(r.caseMetadata.issuedDate)}
                    note={r.caseMetadata.publishedBy}
                  />
                </div>
              </div>
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Read the methodology →
              </Link>
              <span className="text-sm text-ink-soft">
                Or{" "}
                <Link
                  to="/analyze"
                  className="border-b border-ink/40 pb-0.5 text-ink hover:border-ink"
                >
                  submit a story for review
                </Link>
                .
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Mini({
  label,
  value,
  suffix,
  note,
}: {
  label: string;
  value: string;
  suffix?: string;
  note: string;
}) {
  return (
    <div className="bg-card p-5">
      <div className="institutional-mark">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-serif text-2xl text-ink tabular-nums md:text-3xl">
          {value}
        </span>
        {suffix && (
          <span className="font-serif text-sm text-ink-soft">{suffix}</span>
        )}
      </div>
      <p className="mt-1 text-xs italic text-ink-soft">{note}</p>
    </div>
  );
}
