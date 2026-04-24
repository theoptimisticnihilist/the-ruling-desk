import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CLASSIFICATIONS } from "@/data/sampleRulingData";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — Tribunal" },
      {
        name: "description",
        content:
          "Scope, classification, scoring, tribunal review, certainty labels, and disclosure for every Tribunal ruling.",
      },
      { property: "og:title", content: "Methodology — Tribunal" },
      {
        property: "og:description",
        content:
          "How Tribunal classifies passages, scores fidelity, runs adversarial review, and discloses its limits.",
      },
    ],
  }),
  component: MethodologyPage,
});

const SCORING: { label: string; body: string }[] = [
  {
    label: "Quote fidelity",
    body: "How closely the article's quotations track the words in the supplied transcript. Light disfluency cleanup is acceptable; substituted words, reordered clauses, and rewritten endings are not.",
  },
  {
    label: "Context retention",
    body: "Whether the qualifications, hedges, and hybrid framings present in the source survive into the article. A passage may be near-verbatim yet still fail context retention if it strips a load-bearing caveat.",
  },
  {
    label: "Material omission",
    body: "Whether substantive elements of the source — counterpoints, conditions, scope limits — are dropped in a way that changes meaning. Editorial compression is not, by itself, a defect; meaning-altering compression is.",
  },
  {
    label: "Coverage",
    body: "How much of the source the article actually engages with. Coverage is what the article chose to use, not just whether what it used was accurate.",
  },
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
    body: "The supplied record cannot resolve the question. This usually means the claim is outside the transcript and requires separate verification before any verdict is appropriate.",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:px-10 md:pt-24">
        <p className="institutional-mark mb-6">Methodology &amp; Disclosure</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          How a Tribunal ruling is reached.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Tribunal makes one narrow comparison: between what a source said on
          record and what a publication printed. This page describes the scope
          of that review, how passages are classified, how fidelity is scored,
          how the ruling is challenged before it is issued, and what the
          system does not attempt to do.
        </p>

        {/* 1 — Scope of review */}
        <Section index="01" title="Scope of review">
          <p>
            Tribunal evaluates whether a published article{" "}
            <em className="not-italic font-medium text-ink">
              faithfully represented the supplied source interview
            </em>
            . That is the entire question. The system does not adjudicate the
            article's policy claims, the journalist's intent, or the editorial
            judgment of the publication.
          </p>
          <p>
            Importantly, the system does{" "}
            <em className="not-italic font-medium text-ink">not</em> assume
            every article passage should appear in the transcript. Articles
            routinely include background, separately-sourced reporting, and
            reporter-added context. Tribunal is built to recognise that, name
            it, and judge each passage by the standard appropriate to its
            classification.
          </p>
        </Section>

        {/* 2 — Article classification */}
        <Section index="02" title="Article classification">
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
          <p className="mt-6 border-t border-border pt-5 text-sm italic text-ink-soft">
            Note: “Context compression” is not a classification. It is a
            verdict overlay that may attach to interview-derived passages
            where wording flattens nuance.
          </p>
        </Section>

        {/* 3 — Scoring dimensions */}
        <Section index="03" title="Scoring dimensions">
          <p>
            Within interview-derived passages, fidelity is assessed against
            four scoring dimensions. They are weighted but reported
            separately so a reader can see where a ruling's score is coming
            from.
          </p>
          <ul className="not-prose mt-6 divide-y divide-border border-y border-border">
            {SCORING.map((d) => (
              <li
                key={d.label}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-6"
              >
                <p className="font-serif text-lg text-ink">{d.label}</p>
                <p className="text-base leading-relaxed text-ink-soft">
                  {d.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 4 — Tribunal review */}
        <Section index="04" title="Tribunal review">
          <p>
            A single model issuing a single opinion is a known failure mode:
            confident, fluent, and prone to category errors it cannot detect
            from the inside. Tribunal mitigates this with a three-step
            adversarial process.
          </p>
          <ol className="not-prose mt-6 space-y-6 border-t border-border pt-6">
            {[
              {
                title: "Majority opinion",
                body: "A first model reads the supplied evidence and drafts a ruling: classifications, verdicts, scores, and reasoning.",
              },
              {
                title: "Dissent / challenge",
                body: "A second model is given the same evidence and the first model's ruling, and is instructed to challenge it — surface category errors, overconfidence, missed context, and unsupported reasoning.",
              },
              {
                title: "Synthesis",
                body: "A final model reconciles the majority opinion and the dissent into the published ruling, accepting changes only where the dissent is grounded in the supplied evidence.",
              },
            ].map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10"
              >
                <span className="font-serif text-2xl text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-xl leading-snug text-ink">
                    {step.title}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            The purpose of this process is narrow: reduce category errors,
            overconfidence, and unsupported reasoning. It does not make the
            ruling true. It makes the ruling more honest about what the
            supplied record can and cannot support.
          </p>

          {/* Pull-quote callout */}
          <figure className="mt-10 border-l-4 border-ink bg-parchment-deep px-6 py-6 md:px-8 md:py-7">
            <blockquote className="font-serif text-xl leading-snug text-ink md:text-2xl">
              “The model tribunal did not merely improve the answer. It
              revealed where the adjudicator itself was oversimplifying the
              evidentiary record.”
            </blockquote>
            <figcaption className="institutional-mark mt-4">
              On the purpose of dissent
            </figcaption>
          </figure>
        </Section>

        {/* 5 — Certainty labels */}
        <Section index="05" title="Certainty labels">
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
            <strong className="font-medium text-ink">Admitted evidence.</strong>{" "}
            Each ruling lists the documents on which it was based — the
            article under review, the supplied transcript, and the model
            tribunal audit. Material outside that record is not part of the
            ruling.
          </p>
          <p>
            <strong className="font-medium text-ink">
              Model-assisted review.
            </strong>{" "}
            Rulings are drafted, challenged, and synthesised by language
            models under the tribunal procedure described above. They are
            not human judgments, and they should not be cited as such.
          </p>
          <p>
            <strong className="font-medium text-ink">Limitations.</strong>{" "}
            The supplied transcript is treated as authoritative within its
            own scope. If the transcript itself is incomplete or inaccurate,
            the ruling will reflect that. Tribunal does not authenticate
            recordings or articles submitted, and rulings issued in this
            prototype should be read as illustrative.
          </p>
          <p>
            <strong className="font-medium text-ink">
              Externally sourced claims.
            </strong>{" "}
            Passages classified as separate-source material,
            reporter-added context, or requiring external verification are
            outside the supplied record. They are not adjudicated as
            interview-derived material and{" "}
            <em className="not-italic font-medium text-ink">
              may require separate verification
            </em>{" "}
            against the relevant primary records before being treated as
            reliable.
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
