import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze — Tribunal" },
      {
        name: "description",
        content:
          "Submit an interview transcript and a published article. Tribunal will issue a formal ruling comparing the two.",
      },
      { property: "og:title", content: "Analyze — Tribunal" },
      {
        property: "og:description",
        content:
          "Submit an interview transcript and a published article for accuracy review.",
      },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [article, setArticle] = useState("");
  const [publication, setPublication] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = transcript.trim().length > 50 && article.trim().length > 50 && !submitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // Prototype: route to the sample ruling.
    setTimeout(() => navigate({ to: "/rulings/001" }), 700);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:px-10 md:pt-24">
        <p className="institutional-mark mb-6">Submission</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          Submit a comparison for ruling.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          Provide the recorded interview transcript and the published article. Tribunal will
          identify disputed claims, place source and article side by side, and issue a numbered
          set of findings.
        </p>

        <form onSubmit={handleSubmit} className="mt-14 space-y-12">
          <div className="border-t border-border-strong pt-8">
            <label className="institutional-mark mb-3 block">Publication (optional)</label>
            <input
              type="text"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              placeholder="e.g. The Continental Review"
              className="w-full max-w-md border-b border-border bg-transparent py-2 font-serif text-xl text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
            />
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <label className="institutional-mark">Source · Interview transcript</label>
                <span className="text-xs text-ink-soft">
                  {transcript.length.toLocaleString()} chars
                </span>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the full transcript of the recorded interview. Include speaker labels and timestamps where possible."
                rows={18}
                className="w-full resize-y border border-border bg-card p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <label className="institutional-mark">Subject · Published article</label>
                <span className="text-xs text-ink-soft">
                  {article.length.toLocaleString()} chars
                </span>
              </div>
              <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Paste the full text of the published article as it appeared."
                rows={18}
                className="w-full resize-y border border-border bg-card p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="rule-line-soft flex flex-col items-start gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-soft">
              By submitting, you confirm both documents are accurate copies of the source and
              published material.
            </p>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-muted disabled:text-ink-soft"
            >
              {submitting ? "Issuing ruling…" : "Generate ruling"}
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
