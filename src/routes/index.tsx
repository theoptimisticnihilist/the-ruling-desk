import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sampleRulingData, formatRulingDate } from "@/data/sampleRulingData";

const r = sampleRulingData;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tribunal — A truth process for public claims" },
      {
        name: "description",
        content:
          "Tribunal compares interviews to published coverage, separates source-derived claims from external reporting, and issues a self-reviewed public ruling built on evidence, challenge, and disclosure.",
      },
      {
        property: "og:title",
        content: "Tribunal — A truth process for public claims",
      },
      {
        property: "og:description",
        content:
          "Truth is not a vibe. It is a process. Tribunal issues self-reviewed public rulings on media accuracy.",
      },
    ],
  }),
  component: HomePage,
});

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Admit the source record",
    body: "Upload or paste the interview, transcript, article, or supporting document. The source record becomes the evidentiary baseline.",
  },
  {
    n: "02",
    title: "Classify the article",
    body: "Tribunal separates interview-derived passages from separate-source reporting, reporter context, and claims that require external verification.",
  },
  {
    n: "03",
    title: "Issue a reviewed ruling",
    body: "The system scores faithfulness to source, runs a dissenting review against the first model’s reasoning, and publishes a citable ruling.",
  },
];

const MEASURES: { label: string; body: string }[] = [
  {
    label: "Quote fidelity",
    body: "Was the source quoted accurately?",
  },
  {
    label: "Context retention",
    body: "Did the article preserve the meaning of the source?",
  },
  {
    label: "Material omission",
    body: "Did the article leave out context that changes interpretation?",
  },
  {
    label: "Source provenance",
    body: "Which claims come from the interview, separate reporting, or outside the supplied record?",
  },
  {
    label: "Tribunal review",
    body: "Did a second model challenge the first model’s reasoning before publication?",
  },
  {
    label: "Public record",
    body: "Can readers inspect the evidence behind the ruling?",
  },
];

const TRIBUNAL_BULLETS: { label: string; body: string }[] = [
  {
    label: "Majority opinion",
    body: "Classifies claims and scores source fidelity.",
  },
  {
    label: "Dissenting review",
    body: "Challenges overreach, weak evidence, and inflated certainty.",
  },
  {
    label: "Final synthesis",
    body: "Preserves the record and explains what changed after review.",
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
              The Internet Needs a Truth Process
            </p>
            <h1 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink md:text-6xl">
              Truth is not a vibe.
              <br />
              It is a process.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              Tribunal turns source material into a public accuracy ruling. It
              compares interviews to published coverage, separates
              source-derived claims from external reporting, and reviews the
              ruling itself before publication.
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
                  A truth process for public claims.
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
                  Not just accuracy. Procedural trust.
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

        {/* Watching the watcher — AI Tribunal section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
            <p className="institutional-mark mb-6">Watching the Watcher</p>
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-5xl">
              A ruling is only trustworthy if the adjudicator is reviewed.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft">
              A single model can summarize. It can also overstate, misclassify,
              or miss context. Tribunal uses a multi-pass review process: one
              model issues the majority opinion, a second challenges its
              reasoning, and a final synthesis records what changed after
              review. The result is not just an answer. It is a reviewed
              judgment.
            </p>

            <ol className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {TRIBUNAL_BULLETS.map((b, i) => (
                <li key={b.label} className="bg-card p-6 md:p-7">
                  <div className="font-serif text-2xl text-ink-soft tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-serif text-lg text-ink">
                    {b.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                to="/rulings/001"
                hash="06"
                className="inline-flex items-center gap-3 border border-ink px-5 py-2.5 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-parchment"
              >
                See the Tribunal Review
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Sample ruling preview */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  03
                </span>
                <h2 className="font-serif text-2xl text-ink md:text-3xl">
                  See the process applied to a real article.
                </h2>
              </div>
              <span className="institutional-mark">
                {r.caseMetadata.docketNumber}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">
              The sample ruling evaluates GearJunkie’s coverage of the Enhanced
              Games against the supplied interview record. The result is not a
              simple “good” or “bad” score. It shows what was faithful, what
              was compressed, and which claims require separate verification.
            </p>

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

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-ink-soft">
                    <span className="break-all font-mono">
                      {r.caseMetadata.publicUrl}
                    </span>
                    <span className="inline-flex items-center gap-2 font-medium text-ink transition-transform group-hover:translate-x-1">
                      Open Ruling No. 001
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
