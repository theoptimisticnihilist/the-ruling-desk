import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tribunal — Media Accuracy Verifier" },
      {
        name: "description",
        content:
          "Tribunal compares a source interview to a published article and issues a formal public ruling on accuracy.",
      },
      { property: "og:title", content: "Tribunal — Media Accuracy Verifier" },
      {
        property: "og:description",
        content:
          "An independent prototype that issues public rulings on the accuracy of published interviews.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28">
          <p className="institutional-mark mb-8">Issue №01 · Prototype</p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
            A public record of what was said,
            <br />
            and what was printed.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Tribunal compares a source interview to a published article and issues a formal,
            referenceable ruling on where the two diverge. Every finding is numbered, sourced,
            and reasoned.
          </p>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              to="/rulings/001"
              className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-ink/90"
            >
              View sample ruling
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-3 border-b border-ink/40 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Submit a comparison
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
            <p className="institutional-mark mb-10">How a ruling is issued</p>
            <div className="grid gap-12 md:grid-cols-3 md:gap-16">
              {[
                {
                  n: "01",
                  title: "Source on record",
                  body: "A transcript of the original interview is submitted as the canonical source of what was said.",
                },
                {
                  n: "02",
                  title: "Article in question",
                  body: "The published article is submitted alongside, with its quotations and paraphrased claims identified.",
                },
                {
                  n: "03",
                  title: "Findings issued",
                  body: "Each disputed claim receives a verdict, a source quote, an article quote, and the reasoning behind the call.",
                },
              ].map((step) => (
                <div key={step.n} className="border-t border-border-strong pt-6">
                  <div className="font-serif text-3xl text-ink">{step.n}</div>
                  <h3 className="mt-4 font-serif text-xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-t border-border bg-parchment-deep">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
            <div>
              <p className="institutional-mark mb-6">Principles</p>
              <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                Plain findings.
                <br />
                Cited evidence.
                <br />
                No theatre.
              </h2>
            </div>
            <div className="space-y-8 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>
                Tribunal does not adjudicate intent. It does not rate journalists. It compares
                two documents and reports, line by line, where the published account departs
                from the source.
              </p>
              <p>
                Every ruling is published at a stable, citable URL. The source quote and the
                article quote are placed side by side so that any reader can verify the
                finding for themselves.
              </p>
              <Link
                to="/methodology"
                className="inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Read the full methodology →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
