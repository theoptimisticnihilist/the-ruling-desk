import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — Tribunal" },
      {
        name: "description",
        content:
          "How Tribunal compares interviews and articles, what its rulings mean, and the limits of the system.",
      },
      { property: "og:title", content: "Methodology — Tribunal" },
      {
        property: "og:description",
        content:
          "The verdict scale, the review process, and the disclosures behind every Tribunal ruling.",
      },
    ],
  }),
  component: MethodologyPage,
});

const verdicts = [
  {
    label: "Supported",
    body: "The article's claim is faithful to the source in substance and framing.",
    token: "bg-rule-supported",
  },
  {
    label: "Partially Supported",
    body: "The claim has a basis in the source but omits qualification or shifts emphasis in a way that changes meaning.",
    token: "bg-rule-partial",
  },
  {
    label: "Unsupported",
    body: "The claim does not appear in the source in any equivalent form.",
    token: "bg-rule-unsupported",
  },
  {
    label: "Misleading",
    body: "The article presents as the subject's position something the subject explicitly rejected or contradicted in the source.",
    token: "bg-rule-misleading",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:px-10 md:pt-24">
        <p className="institutional-mark mb-6">Methodology & Disclosure</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          How a Tribunal ruling is reached.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Tribunal exists to make one narrow comparison: between what a source said on record
          and what a publication printed. This page describes how that comparison is made and
          what it does not attempt to do.
        </p>

        <Section title="01 · Inputs">
          <p>
            Each ruling is based on two documents: an interview transcript treated as the
            canonical source of what was said, and the published article being reviewed.
            Tribunal does not consult third-party reporting, biographical context, or prior
            statements by the subject.
          </p>
        </Section>

        <Section title="02 · Identifying claims">
          <p>
            The article is parsed into discrete factual claims about the subject — direct
            quotations, paraphrases, and characterisations of position. Stylistic prose,
            scene-setting, and the journalist's own analysis are excluded from review.
          </p>
        </Section>

        <Section title="03 · The verdict scale">
          <p className="mb-6">
            Each claim receives one of four verdicts. The scale is deliberately small to keep
            findings legible.
          </p>
          <ul className="space-y-5 border-t border-border pt-6">
            {verdicts.map((v) => (
              <li key={v.label} className="flex gap-4">
                <span
                  className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${v.token}`}
                  aria-hidden
                />
                <div>
                  <p className="font-serif text-lg text-ink">{v.label}</p>
                  <p className="mt-1 text-base leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="04 · What a ruling is not">
          <p>
            A Tribunal ruling is not a judgment of a journalist, a publication, or the
            subject. It does not assess intent, editorial motive, or the underlying merits of
            the policy positions discussed. It is a record of textual divergence, nothing
            more.
          </p>
        </Section>

        <Section title="05 · Limitations">
          <p>
            The transcript is treated as authoritative. If the transcript itself is incomplete
            or inaccurate, the ruling will reflect that. Tribunal does not verify the
            authenticity of the recordings or articles submitted, and rulings issued in this
            prototype should be read as illustrative.
          </p>
        </Section>

        <Section title="06 · Publication">
          <p>
            Every ruling is issued at a stable, citable URL with a case number. Rulings are
            not edited after publication. Material corrections are appended as addenda with
            their own date stamp.
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
