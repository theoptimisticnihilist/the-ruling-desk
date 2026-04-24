import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  sampleRulingData,
  claimVerdictTone,
  formatRulingDate,
  hasCompressionOverlay,
  classificationShort,
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
  { dot: string; text: string; border: string }
> = {
  supported: {
    dot: "bg-rule-supported",
    text: "text-rule-supported",
    border: "border-rule-supported/40",
  },
  partial: {
    dot: "bg-rule-partial",
    text: "text-rule-partial",
    border: "border-rule-partial/40",
  },
  unsupported: {
    dot: "bg-rule-unsupported",
    text: "text-rule-unsupported",
    border: "border-rule-unsupported/40",
  },
  verification: {
    dot: "bg-rule-misleading",
    text: "text-rule-misleading",
    border: "border-rule-misleading/40",
  },
};

function RulingPage() {
  const meta = r.caseMetadata;
  const top = r.topLineScores;

  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:px-10 md:pt-16">
        {/* 1 — Header block */}
        <HeaderBlock />

        {/* 2 — Score panel */}
        <section className="mt-16">
          <SectionLabel index="02" title="Top-line assessment" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ScoreCard
              label="Faithfulness to source"
              value={top.faithfulnessToSource.score}
              max={100}
              tag={top.faithfulnessToSource.label}
              confidence={top.faithfulnessToSource.confidence}
              note={top.faithfulnessToSource.explanation}
            />
            <ScoreCard
              label="Verifiability of article claims"
              value={top.verifiabilityOfArticleClaims.score}
              max={100}
              tag={top.verifiabilityOfArticleClaims.label}
              confidence={top.verifiabilityOfArticleClaims.confidence}
              note={top.verifiabilityOfArticleClaims.explanation}
            />
            <ScoreCard
              label="Tribunal review"
              value={top.tribunalReview.checksPassed}
              max={top.tribunalReview.checksTotal}
              suffix="checks"
              tag={top.tribunalReview.label}
              confidence={top.tribunalReview.status}
              note={top.tribunalReview.explanation}
            />
          </div>
        </section>

        {/* 3 — Ruling summary */}
        <section className="mt-16">
          <SectionLabel index="03" title="Ruling summary" />
          <p className="mt-6 font-serif text-xl leading-relaxed text-ink md:text-2xl">
            {r.summary}
          </p>
          <p className="mt-6 border-t border-border pt-4 font-serif text-base italic text-ink-soft">
            Rating — {r.ratingLabel}
          </p>
        </section>

        {/* 4 — Numbered findings */}
        <section className="mt-16">
          <SectionLabel
            index="04"
            title="Findings"
            meta={`${r.numberedFindings.length} in total`}
          />
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {r.numberedFindings.map((f) => (
              <li
                key={f.number}
                className="grid grid-cols-[auto_1fr] gap-x-6 py-7 md:gap-x-10"
              >
                <div className="font-serif text-3xl text-ink-soft tabular-nums">
                  {String(f.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-serif text-xl leading-snug text-ink md:text-[1.4rem]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {f.finding}
                  </p>
                  <p className="institutional-mark mt-4">
                    Certainty · {f.certainty}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 5 — Claim-by-claim analysis */}
        <section className="mt-16">
          <SectionLabel
            index="05"
            title="Claim-by-claim analysis"
            meta={`${r.claimCards.length} claims`}
          />
          <ol className="mt-8 space-y-6">
            {r.claimCards.map((c, idx) => (
              <li key={c.id}>
                <ClaimCardView card={c} index={idx + 1} />
              </li>
            ))}
          </ol>

          {/* Excluded / separate-source — secondary, kept inside claim-by-claim */}
          <details className="group mt-10 border border-border bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between p-5">
              <span className="institutional-mark">
                Excluded or separate-source material ·{" "}
                {r.excludedOrSeparateSourceMaterial.length}
              </span>
              <span className="font-serif text-sm text-ink-soft transition-transform group-open:rotate-90">
                ›
              </span>
            </summary>
            <ul className="divide-y divide-border border-t border-border">
              {r.excludedOrSeparateSourceMaterial.map((x, i) => (
                <li key={i} className="px-5 py-4">
                  <div className="institutional-mark mb-2">
                    {x.classification}
                  </div>
                  <p className="font-serif text-base leading-snug text-ink">
                    {x.articleText}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {x.reason}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </section>

        {/* 6 — Tribunal review */}
        <section className="mt-16">
          <SectionLabel
            index="06"
            title="Tribunal review"
            meta={`${top.tribunalReview.checksPassed}/${top.tribunalReview.checksTotal} checks · ${top.tribunalReview.label}`}
          />

          <div className="mt-8 border border-border bg-card p-6 md:p-8">
            <p className="institutional-mark mb-3">Dissent &amp; challenge</p>
            <p className="font-serif text-lg leading-relaxed text-ink md:text-xl">
              {r.dissentSummary.summary}
            </p>
            <dl className="mt-6 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-2">
              <Meta
                label="Material changes accepted"
                value={r.dissentSummary.materialChangesAccepted ? "Yes" : "No"}
              />
              <Meta
                label="Effect on ruling"
                value={r.dissentSummary.overallRulingChanged}
              />
            </dl>
          </div>

          <div className="mt-8">
            <p className="institutional-mark mb-4">What changed after review</p>
            <ol className="space-y-4 border-l-2 border-border-strong pl-6">
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
            </ol>
            <p className="mt-6 text-sm italic leading-relaxed text-ink-soft">
              The multi-model review materially improved this ruling. The label
              held, but the reasoning is more precise and more restrained than
              the first pass.
            </p>
          </div>
        </section>

        {/* 7 — Share card */}
        <section className="mt-16">
          <SectionLabel index="07" title="Share card" meta="For screenshot" />
          <div className="mt-6">
            <ShareCard />
          </div>
          <PublicUrlBar />
        </section>

        {/* 8 — Methodology disclosure footer */}
        <MethodologyFooter />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* 1 — Header block                                                     */
/* ──────────────────────────────────────────────────────────────────── */

function HeaderBlock() {
  const meta = r.caseMetadata;
  return (
    <div>
      <div className="border-y-2 border-ink py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-2xl leading-none tracking-tight text-ink">
              Tribunal
            </span>
            <span className="institutional-mark">{meta.productName}</span>
          </div>
          <span className="institutional-mark">Public ruling</span>
        </div>
      </div>

      <header className="mt-10">
        <p className="institutional-mark mb-4">In the matter of</p>
        <h1 className="font-serif text-[2.4rem] leading-[1.05] tracking-tight text-ink md:text-5xl">
          {meta.caseTitle}
        </h1>

        <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 border-y border-border py-6 sm:grid-cols-3">
          <Meta label="Docket" value={meta.docketNumber} />
          <Meta label="Issued" value={formatRulingDate(meta.issuedDate)} />
          <Meta
            label="Public URL"
            value={
              <code className="break-all font-mono text-sm text-ink">
                {meta.publicUrl}
              </code>
            }
          />
        </dl>
      </header>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* 2 — Score card                                                       */
/* ──────────────────────────────────────────────────────────────────── */

function ScoreCard({
  label,
  value,
  max,
  suffix,
  tag,
  confidence,
  note,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  tag: string;
  confidence: string;
  note: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col border border-border bg-card p-6">
      <div className="institutional-mark">{label}</div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-serif text-5xl leading-none text-ink tabular-nums">
          {value}
        </span>
        <span className="font-serif text-base text-ink-soft">
          /{max}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-border">
        <div
          className="h-px bg-ink"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
      <div className="mt-4 font-serif text-base italic text-ink">{tag}</div>
      <div className="mt-1 text-xs text-ink-soft">{confidence}</div>
      <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-ink-soft">
        {note}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* 5 — Claim card                                                       */
/* ──────────────────────────────────────────────────────────────────── */

function ClaimCardView({ card, index }: { card: ClaimCard; index: number }) {
  const tone = claimVerdictTone(card);
  const style = toneStyles[tone];
  const compression = hasCompressionOverlay(card);

  return (
    <article className="border border-border bg-card">
      {/* Card head */}
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border px-6 py-4">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-serif text-xl text-ink-soft tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-ink-soft">{card.id}</span>
          <span className="inline-flex items-center border border-ink/60 bg-parchment-deep px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink">
            {classificationShort(card.classification)}
          </span>
          {compression && (
            <span className="inline-flex items-center gap-2 border border-rule-partial/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-rule-partial">
              <span
                className="h-1.5 w-1.5 rounded-full bg-rule-partial"
                aria-hidden
              />
              Context compression
            </span>
          )}
        </div>
        {card.score !== null && (
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-ink tabular-nums">
              {card.score}
            </span>
            <span className="text-xs text-ink-soft">/100</span>
          </div>
        )}
      </header>

      {/* Evidence comparison */}
      <div className="grid gap-px bg-border md:grid-cols-2">
        <Excerpt
          kind="Article"
          text={card.articleText}
          accent="text-ink"
          subLabel="As published"
        />
        <Excerpt
          kind="Source"
          text={card.matchedSourceExcerpt}
          accent="text-ink"
          subLabel="Supplied transcript"
        />
      </div>

      {/* Verdict + reasoning */}
      <div className="border-t border-border px-6 py-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="institutional-mark">Verdict</span>
          <span
            className={`inline-flex items-center gap-2 border px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${style.text} ${style.border}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
              aria-hidden
            />
            {card.verdict}
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-ink">
          {card.reasoning}
        </p>
      </div>

      {/* Confidences + dissent */}
      <dl className="grid gap-x-6 gap-y-3 border-t border-border px-6 py-5 text-sm sm:grid-cols-3">
        <Meta
          label="Source provenance"
          value={card.sourceProvenanceConfidence}
        />
        <Meta
          label="Presentation fairness"
          value={card.presentationFairnessConfidence}
        />
        <Meta label="Certainty" value={card.certainty} />
      </dl>
      <p className="border-t border-border px-6 py-4 text-sm italic leading-relaxed text-ink-soft">
        Dissent · {card.dissentNote}
      </p>
    </article>
  );
}

function Excerpt({
  kind,
  text,
  subLabel,
  accent,
}: {
  kind: "Article" | "Source";
  text: string;
  subLabel: string;
  accent: string;
}) {
  return (
    <div className="bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="institutional-mark">{kind}</span>
        <span className="text-[10px] uppercase tracking-wider text-ink-soft">
          {subLabel}
        </span>
      </div>
      <p className={`mt-3 font-serif text-base leading-snug ${accent}`}>
        “{text}”
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* 7 — Share card + public URL                                          */
/* ──────────────────────────────────────────────────────────────────── */

function ShareCard() {
  const s = r.shareCard;
  const meta = r.caseMetadata;
  return (
    <div className="overflow-hidden border border-border-strong">
      <div className="aspect-[1200/630] w-full bg-parchment-deep p-6 md:p-10">
        <div className="flex h-full flex-col justify-between">
          {/* Top row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl text-ink">Tribunal</span>
              <span className="institutional-mark hidden md:inline">
                {meta.productName}
              </span>
            </div>
            <span className="institutional-mark">{meta.docketNumber}</span>
          </div>

          {/* Body */}
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-6xl leading-none text-ink tabular-nums md:text-7xl">
                {r.topLineScores.faithfulnessToSource.score}
              </span>
              <span className="font-serif text-base text-ink-soft">/100</span>
            </div>
            <p className="mt-3 font-serif text-xl italic text-ink md:text-2xl">
              {s.scoreText}
            </p>
            <p className="mt-4 font-serif text-lg leading-tight text-ink md:text-2xl">
              {meta.caseTitle}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              {s.summary}
            </p>
          </div>

          {/* Footer row */}
          <div className="flex items-baseline justify-between border-t border-ink/20 pt-3 text-xs text-ink-soft">
            <span className="font-mono">{s.url}</span>
            <span>Issued {formatRulingDate(meta.issuedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicUrlBar() {
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
  return (
    <div className="mt-6 flex flex-col gap-3 border border-border bg-parchment-deep p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="institutional-mark mb-1">Stable public URL</p>
        <code className="break-all font-mono text-sm text-ink">
          {r.caseMetadata.publicUrl}
        </code>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 border border-ink px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-parchment"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* 8 — Methodology disclosure footer                                    */
/* ──────────────────────────────────────────────────────────────────── */

function MethodologyFooter() {
  const m = r.methodologyDisclosure;
  return (
    <footer className="mt-20 border-t-2 border-ink pt-10">
      <SectionLabel index="08" title="Methodology disclosure" />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <Disclosure label="Model review mode" body={m.modelProcess} />
        <Disclosure label="Scope limit" body={m.scopeLimit} />
        <Disclosure label="Classification rule" body={m.classificationRule} />
        <Disclosure
          label="Record status"
          body={r.caseMetadata.recordStatus}
        />
      </div>

      {/* Evidence admitted */}
      <div className="mt-10">
        <p className="institutional-mark mb-3">Evidence admitted</p>
        <ul className="divide-y divide-border border-y border-border">
          {r.caseMetadata.admittedEvidence.map((e) => (
            <li
              key={e.id}
              className="grid grid-cols-[auto_1fr] gap-x-6 py-4 text-sm"
            >
              <span className="font-mono text-xs text-ink-soft tabular-nums">
                {e.id}
              </span>
              <div>
                <div className="institutional-mark mb-1">{e.type}</div>
                <div className="font-serif text-base leading-snug text-ink">
                  {e.title}
                </div>
                <div className="mt-1 text-xs text-ink-soft">
                  {e.publisher ?? ""}
                  {e.publisher && e.date ? " · " : ""}
                  {e.date ? formatRulingDate(e.date) : ""}
                  {e.source ?? ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Scoring dimensions */}
      <div className="mt-10">
        <p className="institutional-mark mb-3">Scoring dimensions</p>
        <ul className="grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
          {Object.entries(m.scoringDimensions).map(([k, v]) => (
            <li key={k}>
              <div className="font-serif text-2xl text-ink tabular-nums">
                {v}
                <span className="text-base text-ink-soft">%</span>
              </div>
              <div className="institutional-mark mt-1">{camelToTitle(k)}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Limitations */}
      <div className="mt-10">
        <p className="institutional-mark mb-3">Limitations</p>
        <p className="text-sm italic leading-relaxed text-ink-soft">
          {m.disclosureText}
        </p>
      </div>
    </footer>
  );
}

function Disclosure({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="institutional-mark mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Shared atoms                                                         */
/* ──────────────────────────────────────────────────────────────────── */

function SectionLabel({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-border-strong pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-ink-soft tabular-nums">
          {index}
        </span>
        <h2 className="font-serif text-2xl text-ink">{title}</h2>
      </div>
      {meta && <span className="institutional-mark">{meta}</span>}
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

function camelToTitle(s: string) {
  return s.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
