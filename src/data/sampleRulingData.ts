// Source of truth for /rulings/001 — Tribunal sample ruling.

export type ClaimVerdictTone =
  | "supported"
  | "partial"
  | "unsupported"
  | "verification";

// Canonical classification taxonomy.
// A claim card's `classification` field MUST be one of these four values.
// "Context compression" is NOT a classification — it is a verdict overlay
// that may apply on top of an Interview-derived classification.
export type Classification =
  | "Interview-derived"
  | "Separate-source material"
  | "Reporter-added context/background"
  | "Requires external verification / unsupported in supplied record";

export const CLASSIFICATIONS: {
  value: Classification;
  short: string;
  description: string;
}[] = [
  {
    value: "Interview-derived",
    short: "Interview-derived",
    description:
      "The passage is grounded in the supplied interview transcript — as a direct quotation, a paraphrase, or a faithful synthesis of what the subject said on record.",
  },
  {
    value: "Separate-source material",
    short: "Separate-source material",
    description:
      "The passage comes from a different interview, a different speaker, or a separate piece of reporting that is not part of the supplied transcript.",
  },
  {
    value: "Reporter-added context/background",
    short: "Reporter-added context",
    description:
      "The passage is historical, legal, or explanatory context written by the reporter, not attributable to the subject.",
  },
  {
    value: "Requires external verification / unsupported in supplied record",
    short: "Requires external verification",
    description:
      "The passage makes a specific factual claim that is not present in the supplied transcript and must be checked against external records before being treated as reliable.",
  },
];

export interface AdmittedEvidence {
  id: string;
  type: string;
  title: string;
  publisher?: string;
  date?: string;
  source?: string;
}

export interface CaseMetadata {
  caseTitle: string;
  docketNumber: string;
  productName: string;
  publishedBy: string;
  issuedDate: string; // ISO date
  publicUrl: string;
  recordStatus: string;
  admittedEvidence: AdmittedEvidence[];
}

export interface ScoreBlock {
  score: number;
  label: string;
  confidence: string;
  explanation: string;
}

export interface TribunalReviewBlock {
  status: string;
  checksPassed: number;
  checksTotal: number;
  label: string;
  explanation: string;
}

export interface TopLineScores {
  faithfulnessToSource: ScoreBlock;
  verifiabilityOfArticleClaims: ScoreBlock;
  tribunalReview: TribunalReviewBlock;
}

export interface NumberedFinding {
  number: number;
  title: string;
  finding: string;
  certainty: string;
}

export interface ClaimCard {
  id: string;
  classification: Classification;
  articleText: string;
  matchedSourceExcerpt: string;
  verdict: string;
  score: number | null;
  sourceProvenanceConfidence: string;
  presentationFairnessConfidence: string;
  certainty: string;
  reasoning: string;
  dissentNote: string;
}

export interface ExcludedMaterial {
  classification: Classification;
  articleText: string;
  reason: string;
}

export interface DissentSummary {
  summary: string;
  materialChangesAccepted: boolean;
  overallRulingChanged: string;
}

export interface MethodologyDisclosure {
  modelProcess: string;
  scopeLimit: string;
  classificationRule: string;
  scoringDimensions: {
    quoteFidelity: number;
    contextRetention: number;
    materialOmission: number;
    coverage: number;
  };
  disclosureText: string;
}

export interface ShareCardData {
  headline: string;
  scoreText: string;
  subscoreText: string;
  summary: string;
  url: string;
}

export interface SampleRulingData {
  caseMetadata: CaseMetadata;
  topLineScores: TopLineScores;
  summary: string;
  ratingLabel: string;
  numberedFindings: NumberedFinding[];
  claimCards: ClaimCard[];
  excludedOrSeparateSourceMaterial: ExcludedMaterial[];
  whatChangedAfterReview: string[];
  dissentSummary: DissentSummary;
  methodologyDisclosure: MethodologyDisclosure;
  shareCard: ShareCardData;
}

export const sampleRulingData: SampleRulingData = {
  caseMetadata: {
    caseTitle: "In re: GearJunkie Coverage of the Enhanced Games",
    docketNumber: "RULING-001",
    productName: "AI Media Accuracy Verifier",
    publishedBy: "Tribunal Prototype",
    issuedDate: "2026-04-24",
    publicUrl: "/rulings/001",
    recordStatus:
      "Sample ruling generated from supplied article, supplied transcript, and multi-model tribunal review",
    admittedEvidence: [
      {
        id: "E-001",
        type: "Published Article",
        title:
          "No Banned Substances: ‘Enhanced Games’ Aim to Push Physical Limits to Extremes",
        publisher: "GearJunkie",
        date: "2024-11-13",
      },
      {
        id: "E-002",
        type: "Interview Transcript",
        title: "Aaron D’Souza / Enhanced Games interview transcript",
        source: "Candidate-provided evidence package",
      },
      {
        id: "E-003",
        type: "Model Tribunal Review",
        title: "Three-model evidence analysis and synthesis",
        source: "Candidate-generated audit outputs",
      },
    ],
  },
  topLineScores: {
    faithfulnessToSource: {
      score: 84,
      label: "Mostly Faithful",
      confidence: "High",
      explanation:
        "The article’s Aaron-derived material is largely faithful to the supplied interview. The strongest founder-thesis claims map closely to the transcript, including the 21st-century Olympics framing, annual cadence, infrastructure logic, sponsor logic, and the science / research thesis. The main weaknesses are contextual compression and a few wording or sequencing issues, not wholesale misrepresentation.",
    },
    verifiabilityOfArticleClaims: {
      score: 68,
      label: "Mixed / Needs External Verification",
      confidence: "Moderate-High",
      explanation:
        "Several important article sections rely on separate sourcing or reporter-added background outside the supplied interview. That is not inherently a defect, but it means those claims require separate provenance handling. The Magnussen medal-count passage is the highest-priority verification candidate.",
    },
    tribunalReview: {
      status: "Completed",
      checksPassed: 6,
      checksTotal: 6,
      label: "Reviewed with Material Revisions",
      explanation:
        "The multi-model review materially improved the ruling by expanding the interview-derived set beyond direct quotes, correcting a weak compression classification, and separating source provenance from wording fidelity and contextual fairness.",
    },
  },
  summary:
    "The article is a mixed artifact: part interview-derived profile, part separate-source reporting, part external context. The supplied record supports a finding that GearJunkie represented Aaron D’Souza’s core thesis mostly faithfully. The main issues are not broad misquotation. They are narrower: the article compresses national-representation nuance into a cleaner binary, down-weights the clinical-supervision framing behind drug permissiveness, and introduces externally sourced claims that require separate verification.",
  ratingLabel: "Mostly Faithful, with Provenance Flags",
  numberedFindings: [
    {
      number: 1,
      title: "Core founder thesis was represented faithfully",
      finding:
        "The article accurately carries the central interview themes: reinvention of the Olympics, science and technology, human enhancement, annual competition, infrastructure efficiency, sponsorship logic, and research potential.",
      certainty: "High",
    },
    {
      number: 2,
      title: "Paraphrased structural material should count as interview-derived",
      finding:
        "Several important article passages are not direct quotes but are still meaningfully grounded in the transcript, including the annual format, five-sport structure, low-infrastructure rationale, pharma sponsorship, and Apple-style launch discussion.",
      certainty: "High",
    },
    {
      number: 3,
      title: "The article compresses the nation-representation model",
      finding:
        "The article says athletes will not represent nations, but the transcript describes a hybrid model: athletes primarily represent themselves while still retaining some national identification.",
      certainty: "High",
    },
    {
      number: 4,
      title:
        "The drug-permissiveness framing compresses safety and governance qualifiers",
      finding:
        "The article’s phrase ‘any drug or substance they want’ preserves the permissive core but underweights the transcript’s emphasis on clinical supervision, openness, and regulatory support.",
      certainty: "High",
    },
    {
      number: 5,
      title:
        "The Magnussen medal-count claim is the strongest external verification candidate",
      finding:
        "The claim that Magnussen won ‘eight gold, five silver, and three bronze Olympic Medals’ is highly specific, numerical, biographical, and not supported by the supplied Aaron transcript. It should be verified against official Olympic or swimming records before being treated as reliable.",
      certainty: "High",
    },
  ],
  claimCards: [
    {
      id: "C-001",
      classification: "Interview-derived",
      articleText:
        "“We’re reinventing the Olympics for the 21st century, for an era of science and technology, where we can push human achievement and boundaries,” Dr. Aron D’Souza told GearJunkie.",
      matchedSourceExcerpt:
        "And now we're reinventing the Olympiad for the 21st century for an era of science of technology where we can push human achievement and boundaries beyond what we can even imagine today.",
      verdict: "Near-verbatim quote",
      score: 96,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "High",
      certainty: "High",
      reasoning:
        "The article closely tracks the transcript and only trims the final phrase about pushing boundaries beyond imagination.",
      dissentNote: "No material dissent.",
    },
    {
      id: "C-002",
      classification: "Interview-derived",
      articleText:
        "“I don’t think of this as a company or as a business. I think of this as a social, political, and scientific movement that will inevitably lead to superhumanity.”",
      matchedSourceExcerpt:
        "I don't think of this as a company or as a business. I think of this is a social political and scientific movement that will inevitably lead to super humanity.",
      verdict: "Verbatim quote with cleanup",
      score: 98,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "High",
      certainty: "High",
      reasoning:
        "The article reproduces the statement almost exactly, with ordinary cleanup of speech disfluency.",
      dissentNote: "No material dissent.",
    },
    {
      id: "C-003",
      classification: "Interview-derived",
      articleText:
        "First and foremost, he said, the Enhanced Games will be held annually instead of every 4 years. That will provide more opportunities for engagement, a more consistent stage for athletes to compete on, and more opportunities to monetize the games.",
      matchedSourceExcerpt:
        "So my vision for it is an annual competition, so not every four years but every year because athletes need more opportunities to engage and monetize.",
      verdict: "Faithful paraphrase",
      score: 92,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "High",
      certainty: "High",
      reasoning:
        "The article accurately paraphrases the transcript’s annual competition and monetization rationale.",
      dissentNote:
        "Adversarial review strengthened this item by noting that paraphrased structural material should count as interview-derived.",
    },
    {
      id: "C-004",
      classification: "Interview-derived",
      articleText:
        "Unlike the Olympics, the Enhanced Games will also only play host to five categories of sport: swimming, track and field, weight lifting, gymnastics, and combat... because they require the least amount of infrastructure.",
      matchedSourceExcerpt:
        "These are sports like track, swimming, combat, gymnastics and weightlifting. And these are five sports that have low infrastructural requirements.",
      verdict: "Faithful paraphrase",
      score: 91,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "High",
      certainty: "High",
      reasoning:
        "The article accurately synthesizes the transcript’s sport list and low-infrastructure rationale.",
      dissentNote:
        "Adversarial review flagged this as a passage a narrow direct-quote analysis would likely miss.",
    },
    {
      id: "C-005",
      classification: "Interview-derived",
      articleText:
        "Second, athletes will not be there to represent nations but to represent themselves.",
      matchedSourceExcerpt:
        "Athletes will represent themselves but also their countries... he's not representing team Serbia. He's representing himself. He's still wearing the Serbian flag, but it's a lot smaller.",
      verdict: "Context compressed",
      score: 72,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "Medium",
      certainty: "High",
      reasoning:
        "The passage is interview-derived but converts a hybrid model into a cleaner binary. The transcript describes national identity as reduced, not eliminated.",
      dissentNote:
        "The challenger review sharpened this finding by separating high source provenance from lower nuance preservation.",
    },
    {
      id: "C-006",
      classification: "Interview-derived",
      articleText:
        "In contrast, the Enhanced Games will allow athletes to use any drug or substance they want.",
      matchedSourceExcerpt:
        "The enhanced games is all about high quality clinical supervision with full regulatory support. And so the outcomes will be better.",
      verdict: "Context compressed / requires rule verification",
      score: 65,
      sourceProvenanceConfidence: "Medium-High",
      presentationFairnessConfidence: "Medium",
      certainty: "High",
      reasoning:
        "The article captures the permissive premise but broadens it into an absolute formulation that underweights the transcript’s clinical-supervision and regulatory-support framing.",
      dissentNote: "This replaced a weaker compression candidate after peer review.",
    },
    {
      id: "C-007",
      classification: "Interview-derived",
      articleText:
        "The reality is that the fastest people in the world will no doubt be at the Enhanced Games. And so if you’re [a brand like] Nike, you don’t just want to sponsor the Enhanced Games. You sort of have to.",
      matchedSourceExcerpt:
        "The reality is that the fastest people in the world will no doubt be at the enhanced games. And so if you're a Nike, you don't just need to sponsor the enhanced games, you sort of have to.",
      verdict: "Supported with minor wording substitution",
      score: 86,
      sourceProvenanceConfidence: "High",
      presentationFairnessConfidence: "Medium-High",
      certainty: "High",
      reasoning:
        "The article is clearly interview-derived but changes ‘need’ to ‘want’ and adds a bracketed clarifier. Meaning is largely preserved, but exact wording fidelity is not perfect.",
      dissentNote:
        "Adversarial review split high provenance confidence from lower exact-wording confidence.",
    },
    {
      id: "C-008",
      classification:
        "Requires external verification / unsupported in supplied record",
      articleText:
        "He’s not only won eight gold, five silver, and three bronze Olympic Medals, but he is also a two-time world champion in the 100m freestyle race...",
      matchedSourceExcerpt:
        "No matching support in the supplied Aaron D’Souza transcript.",
      verdict: "High-priority verification candidate",
      score: null,
      sourceProvenanceConfidence: "Low within supplied record",
      presentationFairnessConfidence: "Indeterminate without external records",
      certainty: "High that external verification is required",
      reasoning:
        "This precise numerical biographical claim is outside the supplied interview record and should be verified against official Olympic, World Aquatics, or Swimming Australia records before being treated as reliable.",
      dissentNote:
        "Peer review preserved this as the strongest verification candidate but cautioned against declaring it false from the supplied record alone.",
    },
  ],
  excludedOrSeparateSourceMaterial: [
    {
      classification: "Separate-source material",
      articleText: "James Magnussen biography, comeback framing, and direct quotes.",
      reason:
        "Magnussen does not appear in the supplied Aaron transcript. This appears to come from separate sourcing or a separate interview.",
    },
    {
      classification: "Separate-source material",
      articleText: "Travis Tygart criticism and CNN Sport quote.",
      reason:
        "Tygart does not appear in the transcript; the article signals separate CNN and GearJunkie sourcing.",
    },
    {
      classification: "Separate-source material",
      articleText: "Julian Woolf criticism and expert commentary.",
      reason:
        "Woolf is not in the transcript and appears as an independent expert counterpoint.",
    },
    {
      classification: "Reporter-added context/background",
      articleText:
        "1968 Grenoble drug-testing history and DEA Schedule III legal context.",
      reason:
        "These are external historical or legal context claims, not supplied by the Aaron transcript.",
    },
  ],
  whatChangedAfterReview: [
    "Expanded interview-derived findings beyond direct quotes to include structurally important paraphrased material.",
    "Separated source provenance from wording fidelity and contextual fairness.",
    "Reclassified the UFC / X Games sponsor line as a provenance gap rather than a compression finding.",
    "Elevated the ‘any drug or substance’ language as the stronger compression finding because it underweights clinical supervision and regulatory support.",
    "Retained the Magnussen medal-count passage as the strongest verification candidate, while avoiding a definitive falsity claim without external records.",
  ],
  dissentSummary: {
    summary:
      "The dissent agreed that the article is largely faithful to Aaron-derived material but challenged the first-pass model’s binary sourcing assumptions. It argued that absence from the supplied transcript does not prove reporter invention, that several paraphrased sections were meaningfully interview-derived, and that some confidence labels needed to be split between source provenance and presentation fairness.",
    materialChangesAccepted: true,
    overallRulingChanged:
      "The overall label remained Mostly Faithful, but the final ruling became more precise and more restrained.",
  },
  methodologyDisclosure: {
    modelProcess:
      "Prototype uses a tribunal-style review process: a majority analysis, an adversarial challenge, and a final synthesis.",
    scopeLimit:
      "This ruling evaluates the article against the supplied interview record and the supplied tribunal audit. It does not prove or disprove external claims unless separately verified.",
    classificationRule:
      "The system does not treat absence from the supplied transcript as proof of reporter invention. It distinguishes interview-derived content, separate-source material, reporter-added context, and claims requiring external verification.",
    scoringDimensions: {
      quoteFidelity: 35,
      contextRetention: 30,
      materialOmission: 20,
      coverage: 15,
    },
    disclosureText:
      "This sample ruling was generated from supplied evidence and reviewed through a multi-model tribunal workflow. It should be read as a prototype record, not a legal judgment.",
  },
  shareCard: {
    headline: "GearJunkie / Enhanced Games Coverage",
    scoreText: "Mostly Faithful",
    subscoreText: "Faithfulness 84 · Verifiability 68 · Tribunal Review 6/6",
    summary:
      "Core Aaron-derived material was mostly faithful. Main risks: context compression and externally verifiable claims.",
    url: "/rulings/001",
  },
};

// Map a claim card's verdict string to a verdict tone for styling.
export function claimVerdictTone(card: ClaimCard): ClaimVerdictTone {
  if (card.score === null) return "verification";
  if (card.score >= 85) return "supported";
  if (card.score >= 75) return "partial";
  return "unsupported";
}

// Returns true when a claim's verdict carries a "context compression" overlay.
// The overlay is independent of classification and may apply to any
// Interview-derived passage where wording compresses or flattens nuance.
export function hasCompressionOverlay(card: ClaimCard): boolean {
  return /compress/i.test(card.verdict);
}

export function classificationShort(c: Classification): string {
  return CLASSIFICATIONS.find((x) => x.value === c)?.short ?? c;
}

export function formatRulingDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
