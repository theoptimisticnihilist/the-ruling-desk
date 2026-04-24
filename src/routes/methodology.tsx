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
          "How Tribunal classifies article passages, what the verdict overlays mean, and the limits of the system.",
      },
      { property: "og:title", content: "Methodology — Tribunal" },
      {
        property: "og:description",
        content:
          "The four classifications, the verdict overlays, the review process, and the disclosures behind every Tribunal ruling.",
      },
    ],
  }),
  component: MethodologyPage,
});

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
          Tribunal exists to make one narrow comparison: between what a source said on
          record and what a publication printed. This page describes how passages are
          classified, what the verdict overlays mean, and what the system does not
          attempt to do.
        </p>

        <Section title="01 · Inputs">
          <p>
            Each ruling is based on the supplied evidence package — typically an
            interview transcript treated as the canonical record of what was said,
            and the published article being reviewed. Tribunal does not silently
            consult third-party reporting; if external context appears in the
            article, it is classified as such, not assumed away.
          </p>
        </Section>

        <Section title="02 · Identifying claims">
          <p>
            The article is parsed into discrete factual passages about the subject —
            direct quotations, paraphrases, and characterisations of position.
            Stylistic prose and scene-setting are excluded from review.
          </p>
        </Section>

        <Section title="03 · Classification — the four categories">
          <p className="mb-6">
            Every reviewed passage receives exactly one of four classifications.
            Classification answers a single question: where did this passage come
            from, relative to the supplied record?
          </p>
          <ol className="space-y-6 border-t border-border pt-6">
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

        <Section title="04 · Context compression is a verdict overlay, not a classification">
          <p>
            “Context compression” describes a presentation defect: the article
            captures the substance of what the subject said but flattens a
            qualification, a hedge, or a hybrid position into a cleaner binary.
          </p>
          <p>
            Compression can apply only on top of an{" "}
            <em className="text-ink not-italic font-medium">Interview-derived</em>{" "}
            classification. A passage is still interview-derived; it has simply
            been compressed in the telling. Tribunal flags this with a separate
            “Context compression overlay” badge on the relevant claim card and
            never substitutes it for the underlying classification.
          </p>
          <div className="mt-6 grid gap-3 border-y border-border py-5 sm:grid-cols-2">
            <div>
              <p className="institutional-mark mb-2">Classification</p>
              <p className="text-base leading-relaxed text-ink">
                Where the passage came from. One of four fixed values.
              </p>
            </div>
            <div>
              <p className="institutional-mark mb-2">Verdict overlay</p>
              <p className="text-base leading-relaxed text-ink">
                How faithfully the passage is presented. Compression is one such
                overlay; it can attach to interview-derived passages without
                changing where they came from.
              </p>
            </div>
          </div>
        </Section>

        <Section title="05 · What a ruling is not">
          <p>
            A Tribunal ruling is not a judgment of a journalist, a publication, or
            the subject. It does not assess intent, editorial motive, or the
            underlying merits of the policy positions discussed. Absence from the
            supplied record is not treated as proof of reporter invention — it is
            classified as material requiring external verification.
          </p>
        </Section>

        <Section title="06 · Limitations">
          <p>
            The supplied transcript is treated as authoritative within its own
            scope. If the transcript itself is incomplete, the ruling will reflect
            that. Tribunal does not authenticate the recordings or articles
            submitted, and rulings issued in this prototype should be read as
            illustrative.
          </p>
        </Section>

        <Section title="07 · Publication">
          <p>
            Every ruling is issued at a stable, citable URL with a docket number.
            Rulings are not edited after publication. Material corrections are
            appended as addenda with their own date stamp.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
        {children}
      </div>
    </section>
  );
}
