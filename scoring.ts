import {
  categories,
  categoryRecommendations,
  type CategoryId,
  type Question,
} from "./assessment-data";

export type Answers = Record<string, number>;

export type ReadinessLevel = {
  name: "AI Aware" | "AI Assisted" | "AI Enabled" | "AI Advantage";
  range: string;
  summary: string;
};

export type CategoryScore = {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
  score: number;
  percentage: number;
};

export type Results = {
  answeredCount: number;
  overallScore: number;
  overallPercentage: number;
  readinessLevel: ReadinessLevel;
  categoryScores: CategoryScore[];
  strengths: CategoryScore[];
  improvements: CategoryScore[];
  roadmap: string[];
};

// Update scoring thresholds here. Scores use the average Likert rating from 1.0 to 5.0.
export const readinessLevels: ReadinessLevel[] = [
  {
    name: "AI Aware",
    range: "1.0-2.4",
    summary:
      "You are building foundational awareness. Your next move is to get comfortable with practical tools, simple prompts, and responsible review habits.",
  },
  {
    name: "AI Assisted",
    range: "2.5-3.4",
    summary:
      "You are using AI for support, but there is room to make your use more intentional, repeatable, and connected to career value.",
  },
  {
    name: "AI Enabled",
    range: "3.5-4.4",
    summary:
      "You are integrating AI into meaningful work. Focus next on deeper workflows, clearer proof of value, and stronger strategic positioning.",
  },
  {
    name: "AI Advantage",
    range: "4.5-5.0",
    summary:
      "You are using AI as a strategic advantage. Your opportunity is to lead, teach, measure impact, and help others adopt AI responsibly.",
  },
];

const getLevel = (score: number) => {
  if (score >= 4.5) return readinessLevels[3];
  if (score >= 3.5) return readinessLevels[2];
  if (score >= 2.5) return readinessLevels[1];
  return readinessLevels[0];
};

const rounded = (value: number) => Math.round(value * 10) / 10;

export function calculateResults(questions: Question[], answers: Answers): Results {
  const answeredQuestions = questions.filter((question) => answers[question.id]);
  const answeredCount = answeredQuestions.length;
  const total = answeredQuestions.reduce(
    (sum, question) => sum + answers[question.id],
    0,
  );
  const overallScore = answeredCount ? rounded(total / answeredCount) : 0;

  const categoryScores = categories.map((category) => {
    const categoryQuestions = questions.filter(
      (question) => question.categoryId === category.id,
    );
    const categoryTotal = categoryQuestions.reduce(
      (sum, question) => sum + (answers[question.id] || 0),
      0,
    );
    const score = rounded(categoryTotal / categoryQuestions.length);

    return {
      ...category,
      score,
      percentage: Math.round((score / 5) * 100),
    };
  });

  const rankedHighToLow = [...categoryScores].sort((a, b) => b.score - a.score);
  const rankedLowToHigh = [...categoryScores].sort((a, b) => a.score - b.score);
  const improvements = rankedLowToHigh.slice(0, 3);

  return {
    answeredCount,
    overallScore,
    overallPercentage: Math.round((overallScore / 5) * 100),
    readinessLevel: getLevel(overallScore),
    categoryScores,
    strengths: rankedHighToLow.slice(0, 3),
    improvements,
    roadmap: buildRoadmap(improvements),
  };
}

function buildRoadmap(improvements: CategoryScore[]) {
  const focusItems = improvements.flatMap(
    (category) => categoryRecommendations[category.id].roadmap,
  );

  // Update roadmap framing here if you want a different 30-day structure.
  return [
    `Days 1-7: Focus on ${improvements[0].label}. ${focusItems[0]}`,
    `Days 8-14: Build a repeatable practice. ${focusItems[1]}`,
    `Days 15-21: Add proof of progress. ${focusItems[2]}`,
    `Days 22-30: Connect your work to career value. ${focusItems[3] || focusItems[0]}`,
  ];
}
