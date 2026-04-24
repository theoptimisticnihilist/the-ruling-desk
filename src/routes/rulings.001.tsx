import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  sampleRulingData,
  claimVerdictTone,
  formatRulingDate,
  type ClaimCard,
  type ClaimVerdictTone,
} from "@/data/sampleRulingData";

const r = sampleRulingData;

export const Route = createFileRoute("/rulings/001")({
  head: () => ({
    meta: [
      { title: `${r.caseMetadata.docketNumber} — ${r.caseMetadata.caseTitle}` },
      { name: "description", content: r.summary.slice(0, 155) },
      {
        property: "og:title",
        content: `${r.caseMetadata.docketNumber} — ${r.caseMetadata.caseTitle}`,
      },
      { property: "og:description", content: r.shareCard.summary },
      { property: "og:type", content: "article" },
    ],
  }),
  component: RulingPage,
});

const toneStyles: Record<
  ClaimVerdictTone,
  { dot: string; text: string; border: string; label: string }
> = {
  supported: {
    dot: "bg-rule-supported",
    text: "text-rule-supported",
    border: "border-rule-supported/40",
    label: "Supported",
  },
  partial: {
    dot: "bg-rule-partial",
    text: "text-rule-partial",
    border: "border-rule-partial/40",
    label: "Context compressed",
  },
  unsupported: {
    dot: "bg-rule-unsupported",
    text: "text-rule-unsupported",
    border: "border-rule-unsupported/40",
    label: "Compression",
  },
  verification: {
    dot: "bg-rule-misleading",
    text: "text-rule-misleading",
    border: "border-rule-misleading/40",
    label: "Needs verification",
  },
};

function RulingPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(r.caseMetadata.publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const meta = r.caseMetadata;
  const top = r.topLineScores;

  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:px-10 md:pt-20">
        {/* Masthead */}
        <div className="border-y-2 border-ink py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="institutional-mark">
              {meta.publishedBy} · {meta.productName}
            </span>
            <span className="institutional-mark">{meta.docketNumber}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-sm text-ink-soft">
              Issued {formatRulingDate(meta.issuedDate)}
            </span>
            <span className="text-sm text-ink-soft">Public record</span>
          </div>
        </div>

        {/* Title */}
        <header className="mt-12">
          <p className="institutional-mark mb-4">In the matter of</p>
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl">
            {meta.caseTitle}
          </h1>
          <p className="mt-6 font-serif text-xl italic leading-snug text-ink-soft">
            Rating — {r.ratingLabel}
          </p>
        </header>

        {/* Record status & evidence */}
        <section className="mt-10 border-t border-border pt-8">
          <p className="institutional-mark mb-3">Record status</p>
          <p className="text-base leading-relaxed text-ink">{meta.recordStatus}</p>

          <div className="mt-8">
            <p className="institutional-mark mb-4">Admitted evidence</p>
            <ul className="divide-y divide-border border-y border-border">
              {meta.admittedEvidence.map((e) => (
                <li key={e.id} className="grid grid-cols-[auto_1fr] gap-x-6 py-4">
                  <span className="font-mono text-xs text-ink-soft tabular-nums">
                    {e.id}
                  </span>
                  <div>
                    <div className="institutional-mark mb-1">{e.type}</div>
                    <div className="font-serif text-lg leading-snug text-ink">
                      {e.title}
                    </div>
                    <div className="mt-1 text-sm text-ink-soft">
                      {e.publisher ? `${e.publisher}` : ""}
                      {e.publisher && e.date ? " · " : ""}
                      {e.date ? formatRulingDate(e.date) : ""}
                      {e.source ?? ""}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Top-line scores */}
        <section className="mt-14 border border-border bg-card p-8 md:p-10">
          <p className="institutional-mark mb-6">Top-line assessment</p>
          <div className="grid gap-8 md:grid-cols-3">
            <ScoreCell
              label="Faithfulness to source"
              value={`${top.faithfulnessToSource.score}`}
              suffix="/100"
              tag={top.faithfulnessToSource.label}
              confidence={`Confidence: ${top.faithfulnessToSource.confidence}`}
            />
            <ScoreCell
              label="Verifiability of article claims"
              value={`${top.verifiabilityOfArticleClaims.score}`}
              suffix="/100"
              tag={top.verifiabilityOfArticleClaims.label}
              confidence={`Confidence: ${top.verifiabilityOfArticleClaims.confidence}`}
            />
            <ScoreCell
              label="Tribunal review"
              value={`${top.tribunalReview.checksPassed}`}
              suffix={`/${top.tribunalReview.checksTotal} checks`}
              tag={top.tribunalReview.label}
              confidence={`Status: ${top.tribunalReview.status}`}
            />
          </div>
          <div className="mt-8 grid gap-6 border-t border-border pt-6 text-sm leading-relaxed text-ink-soft md:grid-cols-3">
            <p>{top.faithfulnessToSource.explanation}</p>
            <p>{top.verifiabilityOfArticleClaims.explanation}</p>
            <p>{top.tribunalReview.explanation}</p>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-14">
          <p className="institutional-mark mb-3">Summary</p>
          <p className="font-serif text-xl leading-relaxed text-ink md:text-2xl">
            {r.summary}
          </p>
        </section>

        {/* Numbered findings */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
            <h2 className="font-serif text-2xl text-ink">Findings</h2>
            <span className="institutional-mark">
              {r.numberedFindings.length} in total
            </span>
          </div>

          <ol className="mt-8 space-y-12">
            {r.numberedFindings.map((f) => (
              <li
                key={f.number}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10"
              >
                <div className="font-serif text-3xl text-ink-soft tabular-nums">
                  {String(f.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-serif text-xl leading-snug text-ink md:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {f.finding}
                  </p>
                  <p className="institutional-mark mt-4">
                    Certainty: {f.certainty}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Claim cards */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
            <h2 className="font-serif text-2xl text-ink">Claim-by-claim review</h2>
            <span className="institutional-mark">
              {r.claimCards.length} claims
            </span>
          </div>

          <ol className="mt-8 space-y-10">
            {r.claimCards.map((c, idx) => (
              <li key={c.id}>
                <ClaimCardView card={c} index={idx + 1} />
              </li>
            ))}
          </ol>
        </section>

        {/* Excluded / separate-source */}
        <section className="mt-16 border-t border-border pt-8">
          <p className="institutional-mark mb-4">
            Excluded or separate-source material
          </p>
          <ul className="divide-y divide-border border-y border-border">
            {r.excludedOrSeparateSourceMaterial.map((x, i) => (
              <li key={i} className="py-5">
                <div className="institutional-mark mb-2">{x.classification}</div>
                <p className="font-serif text-lg leading-snug text-ink">
                  {x.articleText}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {x.reason}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* What changed after review */}
        <section className="mt-16">
          <p className="institutional-mark mb-4">What changed after review</p>
          <ul className="space-y-4 border-l-2 border-border-strong pl-6">
            {r.whatChangedAfterReview.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-x-4 text-base leading-relaxed text-ink"
              >
                <span className="font-mono text-xs text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Dissent summary */}
        <section className="mt-16 border border-border bg-card p-8 md:p-10">
          <p className="institutional-mark mb-3">Dissent and revision</p>
          <p className="font-serif text-lg leading-relaxed text-ink md:text-xl">
            {r.dissentSummary.summary}
          </p>
          <dl className="mt-6 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
            <Meta
              label="Material changes accepted"
              value={r.dissentSummary.materialChangesAccepted ? "Yes" : "No"}
            />
            <Meta
              label="Overall ruling"
              value={r.dissentSummary.overallRulingChanged}
            />
          </dl>
        </section>

        {/* Methodology disclosure */}
        <section className="mt-16">
          <p className="institutional-mark mb-4">Methodology disclosure</p>
          <div className="space-y-5 text-base leading-relaxed text-ink">
            <DisclosureRow label="Model process" value={r.methodologyDisclosure.modelProcess} />
            <DisclosureRow label="Scope limit" value={r.methodologyDisclosure.scopeLimit} />
            <DisclosureRow
              label="Classification rule"
              value={r.methodologyDisclosure.classificationRule}
            />
          </div>

          <div className="mt-8">
            <p className="institutional-mark mb-3">Scoring dimensions</p>
            <ul className="grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
              {Object.entries(r.methodologyDisclosure.scoringDimensions).map(
                ([k, v]) => (
                  <li key={k}>
                    <div className="font-serif text-2xl text-ink tabular-nums">
                      {v}
                      <span className="text-base text-ink-soft">%</span>
                    </div>
                    <div className="institutional-mark mt-1">
                      {camelToTitle(k)}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          <p className="mt-6 text-sm italic leading-relaxed text-ink-soft">
            {r.methodologyDisclosure.disclosureText}
          </p>
        </section>

        {/* Public URL */}
        <section className="mt-16 border border-border bg-parchment-deep p-6 md:p-8">
          <p className="institutional-mark mb-3">Stable public URL</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all font-mono text-sm text-ink">
              {meta.publicUrl}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 border border-ink px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-parchment"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </section>

        {/* Share card */}
        <section className="mt-12">
          <p className="institutional-mark mb-4">Share card preview</p>
          <ShareCard />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function ScoreCell({
  label,
  value,
  suffix,
  tag,
  confidence,
}: {
  label: string;
  value: string;
  suffix: string;
  tag: string;
  confidence: string;
}) {
  return (
    <div>
      <div className="institutional-mark mb-2">{label}</div>
      <div className="font-serif text-4xl text-ink tabular-nums">
        {value}
        <span className="text-lg text-ink-soft">{suffix}</span>
      </div>
      <div className="mt-2 font-serif text-base italic text-ink">{tag}</div>
      <div className="mt-1 text-xs text-ink-soft">{confidence}</div>
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

function DisclosureRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-border pb-5 sm:grid-cols-[180px_1fr] sm:gap-6">
      <div className="institutional-mark">{label}</div>
      <p>{value}</p>
    </div>
  );
}

function ClaimCardView({ card, index }: { card: ClaimCard; index: number }) {
  const tone = claimVerdictTone(card);
  const style = toneStyles[tone];
  return (
    <article className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
      <div className="font-mono text-sm text-ink-soft tabular-nums">
        {card.id}
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-xl text-ink-soft tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <span
            className={`inline-flex items-center gap-2 border px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${style.text} ${style.border}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
            {card.verdict}
          </span>
          {card.score !== null && (
            <span className="font-serif text-lg text-ink tabular-nums">
              {card.score}
              <span className="text-sm text-ink-soft">/100</span>
            </span>
          )}
        </div>

        <p className="institutional-mark mt-3">{card.classification}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Excerpt kind="Article" text={card.articleText} />
          <Excerpt kind="Source" text={card.matchedSourceExcerpt} />
        </div>

        <div className="mt-6 border-l-2 border-border-strong pl-5">
          <p className="institutional-mark mb-2">Reasoning</p>
          <p className="text-base leading-relaxed text-ink">{card.reasoning}</p>
        </div>

        <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-3">
          <Meta label="Source provenance" value={card.sourceProvenanceConfidence} />
          <Meta label="Presentation fairness" value={card.presentationFairnessConfidence} />
          <Meta label="Certainty" value={card.certainty} />
        </dl>

        <p className="mt-4 text-sm italic leading-relaxed text-ink-soft">
          Dissent: {card.dissentNote}
        </p>
      </div>
    </article>
  );
}

function Excerpt({ kind, text }: { kind: "Article" | "Source"; text: string }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="institutional-mark mb-2">{kind}</div>
      <p className="font-serif text-lg leading-snug text-ink">“{text}”</p>
    </div>
  );
}

function ShareCard() {
  const s = r.shareCard;
  return (
    <div className="overflow-hidden border border-border-strong">
      <div className="aspect-[1200/630] w-full bg-parchment-deep p-8 md:p-12">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl text-ink">Tribunal</span>
            <span className="institutional-mark">
              {r.caseMetadata.docketNumber}
            </span>
          </div>
          <div>
            <p className="institutional-mark mb-3">Ruling</p>
            <p className="font-serif text-2xl leading-tight text-ink md:text-4xl">
              {s.headline}
            </p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
              <span className="h-3 w-3 rounded-full bg-rule-partial" aria-hidden />
              <span className="font-serif text-xl text-ink md:text-2xl">
                {s.scoreText}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{s.subscoreText}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              {s.summary}
            </p>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/20 pt-4 text-xs text-ink-soft">
            <span className="font-mono">{s.url}</span>
            <span>Issued {formatRulingDate(r.caseMetadata.issuedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function camelToTitle(s: string) {
  return s.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
