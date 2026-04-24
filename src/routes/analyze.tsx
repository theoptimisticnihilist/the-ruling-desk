import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ACCEPTED_DOC_EXTENSIONS,
  extractFileText,
  type ExtractedFile,
} from "@/lib/extractFileText";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze a Story — Tribunal" },
      {
        name: "description",
        content:
          "Paste a source transcript and the published article. Tribunal will classify article passages, compare interview-derived claims to the source, run a challenge review, and issue a public ruling.",
      },
      { property: "og:title", content: "Analyze a Story — Tribunal" },
      {
        property: "og:description",
        content:
          "Submit an interview transcript and a published article. Tribunal will classify passages, compare them to the source, run a challenge review, and issue a public ruling.",
      },
    ],
  }),
  component: AnalyzePage,
});

const SAMPLE_TRANSCRIPT = `[Aaron D'Souza — Enhanced Games interview transcript, excerpt]

INTERVIEWER: Why are you doing this now?
AARON: And now we're reinventing the Olympiad for the 21st century for an era of science of technology where we can push human achievement and boundaries beyond what we can even imagine today.

INTERVIEWER: Is this a company?
AARON: I don't think of this as a company or as a business. I think of this is a social political and scientific movement that will inevitably lead to super humanity.

INTERVIEWER: Format?
AARON: So my vision for it is an annual competition, so not every four years but every year because athletes need more opportunities to engage and monetize.

INTERVIEWER: Sports?
AARON: These are sports like track, swimming, combat, gymnastics and weightlifting. And these are five sports that have low infrastructural requirements.

INTERVIEWER: Nationality?
AARON: Athletes will represent themselves but also their countries... he's not representing team Serbia. He's representing himself. He's still wearing the Serbian flag, but it's a lot smaller.

INTERVIEWER: Drug policy?
AARON: The enhanced games is all about high quality clinical supervision with full regulatory support. And so the outcomes will be better.

INTERVIEWER: Sponsors?
AARON: The reality is that the fastest people in the world will no doubt be at the enhanced games. And so if you're a Nike, you don't just need to sponsor the enhanced games, you sort of have to.`;

const SAMPLE_ARTICLE = `No Banned Substances: 'Enhanced Games' Aim to Push Physical Limits to Extremes
GearJunkie · 2024-11-13

"We're reinventing the Olympics for the 21st century, for an era of science and technology, where we can push human achievement and boundaries," Dr. Aron D'Souza told GearJunkie.

"I don't think of this as a company or as a business. I think of this as a social, political, and scientific movement that will inevitably lead to superhumanity."

First and foremost, he said, the Enhanced Games will be held annually instead of every 4 years. That will provide more opportunities for engagement, a more consistent stage for athletes to compete on, and more opportunities to monetize the games.

Unlike the Olympics, the Enhanced Games will also only play host to five categories of sport: swimming, track and field, weight lifting, gymnastics, and combat... because they require the least amount of infrastructure.

Second, athletes will not be there to represent nations but to represent themselves. In contrast, the Enhanced Games will allow athletes to use any drug or substance they want.

The reality is that the fastest people in the world will no doubt be at the Enhanced Games. And so if you're [a brand like] Nike, you don't just want to sponsor the Enhanced Games. You sort of have to.

He's not only won eight gold, five silver, and three bronze Olympic Medals, but he is also a two-time world champion in the 100m freestyle race...`;

const STAGES = [
  "Admitting evidence…",
  "Classifying article passages…",
  "Drafting majority opinion…",
  "Running dissenting review…",
  "Issuing final ruling…",
] as const;

function AnalyzePage() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [article, setArticle] = useState("");
  const [transcriptFile, setTranscriptFile] = useState<ExtractedFile | null>(
    null,
  );
  const [articleFile, setArticleFile] = useState<ExtractedFile | null>(null);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);
  const [articleError, setArticleError] = useState<string | null>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const canSubmit =
    transcript.trim().length > 50 &&
    article.trim().length > 50 &&
    !submitting;

  const handleLoadSample = () => {
    setTranscript(SAMPLE_TRANSCRIPT);
    setArticle(SAMPLE_ARTICLE);
    setTranscriptFile(null);
    setArticleFile(null);
    setTranscriptError(null);
    setArticleError(null);
    setSampleLoaded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setStageIndex(0);

    // Multi-stage prototype loading sequence (5 stages).
    timersRef.current.push(setTimeout(() => setStageIndex(1), 800));
    timersRef.current.push(setTimeout(() => setStageIndex(2), 1600));
    timersRef.current.push(setTimeout(() => setStageIndex(3), 2400));
    timersRef.current.push(setTimeout(() => setStageIndex(4), 3200));
    timersRef.current.push(
      setTimeout(() => navigate({ to: "/rulings/001" }), 4000),
    );
  };

  const handleFile = async (
    file: File,
    setLoading: (v: boolean) => void,
    setError: (v: string | null) => void,
    setFile: (v: ExtractedFile | null) => void,
    setText: (v: string) => void,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await extractFileText(file);
      setFile(result);
      setText(result.text);
      setSampleLoaded(false);
    } catch (err) {
      console.error("File extract failed:", err);
      setFile(null);
      setError(
        "We couldn't extract text from this file. Please paste the text manually.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:px-10 md:pt-24">
        <p className="institutional-mark mb-6">Submission</p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
          Analyze a Story
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">
          Paste the source record and the published article. Tribunal will
          classify article passages, compare interview-derived claims to the
          source, run a dissenting model review, and generate a public ruling.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-10">
          {/* Sample loader strip */}
          <div className="flex flex-col gap-3 border-y border-border bg-parchment-deep px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="institutional-mark mb-1">Sample case</p>
              <p className="text-sm leading-relaxed text-ink">
                {sampleLoaded
                  ? "Enhanced Games sample loaded into both fields."
                  : "Populate both fields with the supplied GearJunkie article and Aaron D'Souza interview transcript."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadSample}
              disabled={submitting}
              className="inline-flex shrink-0 items-center gap-2 border border-ink px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-parchment disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sampleLoaded ? "Sample loaded ✓" : "Load Enhanced Games sample"}
            </button>
          </div>

          {/* Two textareas */}
          <div className="grid gap-10 md:grid-cols-2">
            <FieldBlock
              label="Admit Source Record"
              helper="Upload or paste the interview transcript, source document, or supporting evidence."
              chars={transcript.length}
              uploadLabel="Upload transcript / document"
              uploaded={transcriptFile}
              loading={transcriptLoading}
              error={transcriptError}
              disabled={submitting}
              onFile={(file) =>
                handleFile(
                  file,
                  setTranscriptLoading,
                  setTranscriptError,
                  setTranscriptFile,
                  setTranscript,
                )
              }
            >
              <textarea
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  setTranscriptFile(null);
                  setSampleLoaded(false);
                }}
                disabled={submitting}
                placeholder="Paste the full transcript of the recorded interview, or upload a .txt, .md, .rtf, .pdf, or .docx file."
                rows={18}
                className="w-full resize-y border border-border bg-card p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none disabled:opacity-60"
              />
            </FieldBlock>

            <FieldBlock
              label="Admit Published Article"
              helper="Upload or paste the article to be reviewed against the source record."
              chars={article.length}
              uploadLabel="Upload article file"
              uploaded={articleFile}
              loading={articleLoading}
              error={articleError}
              disabled={submitting}
              onFile={(file) =>
                handleFile(
                  file,
                  setArticleLoading,
                  setArticleError,
                  setArticleFile,
                  setArticle,
                )
              }
            >
              <textarea
                value={article}
                onChange={(e) => {
                  setArticle(e.target.value);
                  setArticleFile(null);
                  setSampleLoaded(false);
                }}
                disabled={submitting}
                placeholder="Paste the full text of the published article, or upload a .txt, .md, .rtf, .pdf, or .docx file."
                rows={18}
                className="w-full resize-y border border-border bg-card p-5 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none disabled:opacity-60"
              />
            </FieldBlock>
          </div>

          {/* Submit row */}
          <div className="flex flex-col gap-4 border-t border-border-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-soft">
              For this prototype, the sample case renders Ruling No. 001 using
              the supplied GearJunkie article, interview transcript, and model
              tribunal review.
            </p>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-muted disabled:text-ink-soft"
            >
              {submitting ? "Issuing ruling…" : "Generate Reviewed Ruling"}
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>
      </main>

      {submitting && <LoadingOverlay stageIndex={stageIndex} />}

      <SiteFooter />
    </div>
  );
}

function FieldBlock({
  label,
  helper,
  chars,
  uploadLabel,
  uploaded,
  loading,
  error,
  disabled,
  onFile,
  children,
}: {
  label: string;
  helper?: string;
  chars: number;
  uploadLabel: string;
  uploaded: ExtractedFile | null;
  loading: boolean;
  error: string | null;
  disabled: boolean;
  onFile: (file: File) => void;
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <label className="institutional-mark">{label}</label>
        <span className="text-xs text-ink-soft">
          {chars.toLocaleString()} chars
        </span>
      </div>
      {helper && (
        <p className="mb-3 text-xs leading-relaxed text-ink-soft">{helper}</p>
      )}
      {children}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_DOC_EXTENSIONS}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            // reset so re-selecting the same file fires change again
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || loading}
          className="inline-flex items-center gap-2 border border-ink px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-parchment disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden>↑</span>
          {loading ? "Reading file…" : uploadLabel}
        </button>
        <span className="text-[10px] uppercase tracking-wider text-ink-soft">
          .txt · .md · .rtf · .pdf · .docx
        </span>
      </div>
      {uploaded && !error && (
        <p className="mt-3 border-l-2 border-ink-soft/40 pl-3 text-xs leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">{uploaded.name}</span>
          <span className="mx-2">·</span>
          {uploaded.type}
          <span className="mx-2">·</span>
          {uploaded.text.length.toLocaleString()} chars extracted
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-3 border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function LoadingOverlay({ stageIndex }: { stageIndex: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-parchment/85 backdrop-blur-sm"
    >
      <div className="mx-6 w-full max-w-md border border-ink bg-parchment-deep p-8">
        <p className="institutional-mark mb-6">Tribunal · In session</p>
        <ol className="space-y-4">
          {STAGES.map((stage, i) => {
            const state =
              i < stageIndex
                ? "done"
                : i === stageIndex
                  ? "active"
                  : "pending";
            return (
              <li
                key={stage}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-4"
              >
                <span
                  className={`font-mono text-xs tabular-nums ${
                    state === "pending" ? "text-ink-soft" : "text-ink"
                  }`}
                >
                  {state === "done"
                    ? "✓"
                    : state === "active"
                      ? "●"
                      : String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-serif text-lg leading-snug ${
                    state === "pending"
                      ? "text-ink-soft"
                      : state === "active"
                        ? "text-ink"
                        : "text-ink"
                  } ${state === "active" ? "italic" : ""}`}
                >
                  {stage}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 border-t border-border pt-4 text-xs italic text-ink-soft">
          Routing to Ruling No. 001 on completion.
        </p>
      </div>
    </div>
  );
}
