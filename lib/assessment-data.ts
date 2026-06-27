export type CategoryId =
  | "toolConfidence"
  | "workflowIntegration"
  | "careerStrategy"
  | "responsibleUse"
  | "valueCommunication";

export type Question = {
  id: string;
  categoryId: CategoryId;
  text: string;
};

export type Category = {
  id: CategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

export const links = {
  // Update these placeholder URLs when your real resource, speaking, and homepage links are ready.
  downloadResource: "/editt-framework.pdf",
  speakingInquiry: "#invite-tochi-to-speak",
  homepage: "#website-homepage",
};

export const categories: Category[] = [
  {
    id: "toolConfidence",
    label: "AI Tool Confidence",
    shortLabel: "Tools",
    description: "Comfort choosing, prompting, and comparing AI tools.",
  },
  {
    id: "workflowIntegration",
    label: "Workflow Integration",
    shortLabel: "Workflows",
    description: "Ability to embed AI into repeatable everyday work.",
  },
  {
    id: "careerStrategy",
    label: "Career Strategy",
    shortLabel: "Career",
    description: "Using AI to clarify goals, opportunities, and positioning.",
  },
  {
    id: "responsibleUse",
    label: "Critical Thinking & Responsible Use",
    shortLabel: "Judgment",
    description: "Quality control, ethics, privacy, and human judgment.",
  },
  {
    id: "valueCommunication",
    label: "Value Communication",
    shortLabel: "Value",
    description: "Translating AI-supported work into clear business value.",
  },
];

// Update assessment questions here. Keep 3 questions per category for balanced scoring.
export const questions: Question[] = [
  {
    id: "q1",
    categoryId: "toolConfidence",
    text: "I can choose the right AI tool for a specific work or learning task.",
  },
  {
    id: "q2",
    categoryId: "toolConfidence",
    text: "I know how to write prompts that produce useful, specific outputs.",
  },
  {
    id: "q3",
    categoryId: "toolConfidence",
    text: "I can compare AI outputs and decide which one is strongest.",
  },
  {
    id: "q4",
    categoryId: "workflowIntegration",
    text: "I use AI to speed up routine tasks like drafting, researching, summarizing, or planning.",
  },
  {
    id: "q5",
    categoryId: "workflowIntegration",
    text: "I have repeatable AI-supported workflows for projects I do often.",
  },
  {
    id: "q6",
    categoryId: "workflowIntegration",
    text: "I know when AI should assist me and when I should rely on my own expertise.",
  },
  {
    id: "q7",
    categoryId: "careerStrategy",
    text: "I use AI to explore roles, skills, industries, or career paths that fit my goals.",
  },
  {
    id: "q8",
    categoryId: "careerStrategy",
    text: "I can identify which AI skills would make me more competitive in my field.",
  },
  {
    id: "q9",
    categoryId: "careerStrategy",
    text: "I use AI to improve career materials such as resumes, portfolios, interviews, or outreach.",
  },
  {
    id: "q10",
    categoryId: "responsibleUse",
    text: "I fact-check AI outputs before using them in important work.",
  },
  {
    id: "q11",
    categoryId: "responsibleUse",
    text: "I understand basic risks around privacy, bias, hallucinations, and over-reliance.",
  },
  {
    id: "q12",
    categoryId: "responsibleUse",
    text: "I can explain the reasoning behind an AI-assisted recommendation or decision.",
  },
  {
    id: "q13",
    categoryId: "valueCommunication",
    text: "I can describe how AI improves the quality, speed, or impact of my work.",
  },
  {
    id: "q14",
    categoryId: "valueCommunication",
    text: "I can show examples of outcomes I created or improved with AI support.",
  },
  {
    id: "q15",
    categoryId: "valueCommunication",
    text: "I feel confident discussing AI-enabled skills with managers, clients, recruiters, or collaborators.",
  },
];

// Update recommendation text here. These snippets appear in strengths and improvement areas.
export const categoryRecommendations: Record<
  CategoryId,
  { strength: string; improvement: string; roadmap: string[] }
> = {
  toolConfidence: {
    strength: "You are building confidence with AI tools and prompt choices.",
    improvement: "Practice choosing tools by task type, then refine prompts with clearer context and constraints.",
    roadmap: [
      "Create a personal prompt library for five recurring tasks.",
      "Compare two AI tools on the same task and note where each performs best.",
      "Rewrite three vague prompts into specific, role-based prompts with success criteria.",
    ],
  },
  workflowIntegration: {
    strength: "You are finding ways to make AI part of your everyday work rhythm.",
    improvement: "Turn one-off AI use into repeatable workflows with inputs, review steps, and final outputs.",
    roadmap: [
      "Map one weekly workflow and mark where AI can draft, analyze, or review.",
      "Build a repeatable checklist for using AI in that workflow.",
      "Measure time saved or quality improved after using the new workflow twice.",
    ],
  },
  careerStrategy: {
    strength: "You are connecting AI skills to your career direction.",
    improvement: "Use AI to clarify target roles, skill gaps, and proof points for your next opportunity.",
    roadmap: [
      "Ask AI to compare three target roles and identify shared AI-adjacent skills.",
      "Create a 30-day skill sprint tied to one role or career goal.",
      "Update one resume, portfolio, or LinkedIn section with AI-enabled evidence.",
    ],
  },
  responsibleUse: {
    strength: "You are applying judgment and care when working with AI.",
    improvement: "Strengthen your review habits around accuracy, bias, privacy, and explainability.",
    roadmap: [
      "Create a fact-check checklist for AI-generated work.",
      "Practice identifying assumptions, missing context, and possible bias in three AI responses.",
      "Write a short responsible-use rule set for your own work or team.",
    ],
  },
  valueCommunication: {
    strength: "You are learning to communicate the value of AI-supported work.",
    improvement: "Translate AI activity into outcomes: time saved, quality improved, insight gained, or opportunity created.",
    roadmap: [
      "Document one before-and-after example of AI improving a work product.",
      "Write three concise bullet points that connect AI use to business or career value.",
      "Practice explaining your AI-enabled workflow in a 60-second professional story.",
    ],
  },
};
