// Placeholder sample ruling — replace with sample_ruling.json contents when provided.

export type Verdict = "Supported" | "Partially Supported" | "Unsupported" | "Misleading";

export interface Finding {
  number: number;
  claim: string;
  verdict: Verdict;
  sourceQuote: string;
  sourceLocation: string; // e.g. "Transcript 14:32"
  articleQuote: string;
  articleLocation: string; // e.g. "Paragraph 6"
  reasoning: string;
}

export interface Ruling {
  id: string;
  caseNumber: string;
  publicUrl: string;
  issuedAt: string; // ISO
  subject: {
    intervieweeName: string;
    publication: string;
    articleTitle: string;
    articleUrl: string;
    interviewDate: string;
    articleDate: string;
  };
  summary: string;
  overallVerdict: Verdict;
  scoreOutOf100: number;
  findings: Finding[];
  notes: string;
}

export const sampleRuling: Ruling = {
  id: "001",
  caseNumber: "TRB-2025-001",
  publicUrl: "https://tribunal.example/rulings/001",
  issuedAt: "2025-04-18T09:00:00Z",
  subject: {
    intervieweeName: "Dr. Helena Marsh",
    publication: "The Continental Review",
    articleTitle:
      "The Quiet Reformer: How Helena Marsh Plans to Reshape Public Health",
    articleUrl: "https://continental-review.example/marsh-profile",
    interviewDate: "2025-03-22",
    articleDate: "2025-04-09",
  },
  summary:
    "A profile of Dr. Helena Marsh published in The Continental Review materially diverges from the recorded source interview on three substantive points. Two further passages compress or reorder her statements in ways that alter their meaning. The remainder of the article is consistent with the source.",
  overallVerdict: "Partially Supported",
  scoreOutOf100: 64,
  findings: [
    {
      number: 1,
      claim:
        "Marsh stated she would 'dismantle' the existing vaccination advisory board.",
      verdict: "Misleading",
      sourceQuote:
        "I think the advisory board needs serious reform — the structure hasn't been revisited in fifteen years. That doesn't mean dismantling it. It means rebuilding trust in how it works.",
      sourceLocation: "Transcript 14:32",
      articleQuote:
        "Marsh told us she intends to dismantle the existing vaccination advisory board.",
      articleLocation: "Paragraph 6",
      reasoning:
        "The interviewee explicitly contrasted reform with dismantling. The article presents a position she rejected in the same sentence as her own.",
    },
    {
      number: 2,
      claim:
        "Marsh described her predecessor's record as 'a failure on every measure.'",
      verdict: "Unsupported",
      sourceQuote:
        "There were real shortcomings, particularly in rural outreach. But it would be unfair to call the whole record a failure.",
      sourceLocation: "Transcript 22:11",
      articleQuote:
        "She characterised her predecessor's record as 'a failure on every measure.'",
      articleLocation: "Paragraph 11",
      reasoning:
        "No equivalent phrase appears in the transcript. The quoted language is not present in any form.",
    },
    {
      number: 3,
      claim:
        "Marsh supports increasing the public health budget by approximately twelve percent.",
      verdict: "Supported",
      sourceQuote:
        "We're looking at something in the region of a twelve percent uplift over the next cycle.",
      sourceLocation: "Transcript 31:48",
      articleQuote:
        "Marsh confirmed she is targeting a roughly twelve percent budget increase.",
      articleLocation: "Paragraph 14",
      reasoning:
        "The article's paraphrase is faithful to the source figure and framing.",
    },
    {
      number: 4,
      claim:
        "Marsh accused private insurers of 'actively obstructing' reform.",
      verdict: "Partially Supported",
      sourceQuote:
        "Some private insurers have been slow to engage. I wouldn't say obstruction across the board, but there is friction.",
      sourceLocation: "Transcript 38:02",
      articleQuote:
        "Marsh accused private insurers of actively obstructing reform.",
      articleLocation: "Paragraph 18",
      reasoning:
        "The interviewee acknowledged friction but explicitly rejected the framing of obstruction as a general charge. The article presents the stronger framing without the qualification.",
    },
    {
      number: 5,
      claim:
        "Marsh trained as an epidemiologist before entering public service.",
      verdict: "Supported",
      sourceQuote:
        "My background is in epidemiology — I worked in the field for nearly a decade before this.",
      sourceLocation: "Transcript 02:15",
      articleQuote:
        "Marsh, an epidemiologist by training, entered public service after nearly a decade in the field.",
      articleLocation: "Paragraph 2",
      reasoning: "Biographical detail matches the source.",
    },
  ],
  notes:
    "This ruling is based solely on the audio transcript and published article submitted. It does not assess the underlying policy positions or the publication's editorial judgment beyond the points of factual divergence above.",
};
