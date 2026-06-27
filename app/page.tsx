"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  Home,
  Mail,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import {
  categoryRecommendations,
  links,
  questions,
  type CategoryId,
} from "@/lib/assessment-data";
import { calculateResults, type Answers } from "@/lib/scoring";

type Screen = "landing" | "assessment" | "results";

const scaleLabels = [
  "Not yet",
  "Rarely",
  "Sometimes",
  "Often",
  "Consistently",
];

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  toolConfidence: <Sparkles aria-hidden="true" />,
  workflowIntegration: <BarChart3 aria-hidden="true" />,
  careerStrategy: <BriefcaseBusiness aria-hidden="true" />,
  responsibleUse: <Brain aria-hidden="true" />,
  valueCommunication: <Target aria-hidden="true" />,
};

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => calculateResults(questions, answers), [answers]);
  const activeQuestion = questions[activeIndex];
  const progress = Math.round((results.answeredCount / questions.length) * 100);
  const isComplete = results.answeredCount === questions.length;

  const setAnswer = (questionId: string, value: number) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const reset = () => {
    setAnswers({});
    setActiveIndex(0);
    setScreen("landing");
  };

  return (
    <main className="shell">
      <nav className="topbar" aria-label="Primary">
        <a className="brand" href={links.homepage}>
          <span className="brandMark">AI</span>
          <span>AI Enablement Scorecard</span>
        </a>
        <a className="navLink" href={links.homepage}>
          <Home aria-hidden="true" />
          Home
        </a>
      </nav>

      {screen === "landing" && (
        <section className="landing" aria-labelledby="landing-title">
          <div className="landingCopy">
            <p className="eyebrow">Personal AI readiness assessment</p>
            <h1 id="landing-title">AI Enablement Scorecard</h1>
            <p className="intro">
              Assess how confidently you use AI across tools, workflows, career
              strategy, responsible judgment, and value communication. In a few
              minutes, you will receive your readiness level and a personalized
              30-day upskilling roadmap.
            </p>
            <div className="heroActions">
              <button className="primaryButton" onClick={() => setScreen("assessment")}>
                Start Assessment
                <ArrowRight aria-hidden="true" />
              </button>
              <a
                className="secondaryButton"
                href={links.downloadResource}
                download
              >
                <Download aria-hidden="true" />
                EDITT Framework
              </a>
            </div>
            <div className="audienceList" aria-label="Designed for">
              {[
                "Students",
                "Career changers",
                "Early-career professionals",
                "Mid-career professionals",
                "Non-technical teams",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="heroVisual">
            <Image
              src="/ai-enablement-hero.png"
              alt="Professional workspace with AI-enabled career planning materials"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
            />
            <div className="levelPreview" aria-label="Readiness levels">
              {["AI Aware", "AI Assisted", "AI Enabled", "AI Advantage"].map(
                (level, index) => (
                  <span key={level} className={index === 2 ? "activeLevel" : ""}>
                    {level}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {screen === "assessment" && (
        <section className="assessment" aria-labelledby="assessment-title">
          <div className="sectionHeader">
            <p className="eyebrow">Question {activeIndex + 1} of 15</p>
            <h1 id="assessment-title">Rate your current AI readiness</h1>
            <p>
              Use the 1-5 scale based on what is true today. There are no wrong
              answers; the roadmap is strongest when your responses are honest.
            </p>
          </div>

          <div className="progressBlock" aria-label={`${progress}% complete`}>
            <div className="progressMeta">
              <span>{results.answeredCount} answered</span>
              <span>{progress}% complete</span>
            </div>
            <div className="progressTrack">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <article className="questionPanel">
            <div className="categoryBadge">
              {categoryIcons[activeQuestion.categoryId]}
              {
                results.categoryScores.find(
                  (category) => category.id === activeQuestion.categoryId,
                )?.label
              }
            </div>
            <h2>{activeQuestion.text}</h2>
            <div className="likert" role="radiogroup" aria-label={activeQuestion.text}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={
                    answers[activeQuestion.id] === value
                      ? "scaleOption selected"
                      : "scaleOption"
                  }
                  onClick={() => setAnswer(activeQuestion.id, value)}
                  role="radio"
                  aria-checked={answers[activeQuestion.id] === value}
                >
                  <strong>{value}</strong>
                  <span>{scaleLabels[value - 1]}</span>
                </button>
              ))}
            </div>
          </article>

          <div className="assessmentActions">
            <button
              className="secondaryButton"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
            >
              Back
            </button>
            {activeIndex < questions.length - 1 ? (
              <button
                className="primaryButton"
                disabled={!answers[activeQuestion.id]}
                onClick={() =>
                  setActiveIndex((index) => Math.min(questions.length - 1, index + 1))
                }
              >
                Next
                <ArrowRight aria-hidden="true" />
              </button>
            ) : (
              <button
                className="primaryButton"
                disabled={!isComplete}
                onClick={() => setScreen("results")}
              >
                View Results
                <ArrowRight aria-hidden="true" />
              </button>
            )}
          </div>
        </section>
      )}

      {screen === "results" && (
        <section className="results" aria-labelledby="results-title">
          <div className="resultsHero">
            <div>
              <p className="eyebrow">Your AI readiness level</p>
              <h1 id="results-title">{results.readinessLevel.name}</h1>
              <p>{results.readinessLevel.summary}</p>
            </div>
            <div className="scoreDial" aria-label={`Overall score ${results.overallScore} out of 5`}>
              <span>{results.overallScore}</span>
              <small>/ 5</small>
            </div>
          </div>

          <div className="resultsGrid">
            <section className="panel widePanel" aria-labelledby="category-title">
              <div className="panelHeader">
                <h2 id="category-title">Category Scores</h2>
                <span>{results.overallPercentage}% overall</span>
              </div>
              <div className="scoreList">
                {results.categoryScores.map((category) => (
                  <div className="scoreRow" key={category.id}>
                    <div>
                      <span className="scoreLabel">
                        {categoryIcons[category.id]}
                        {category.label}
                      </span>
                      {" "}
                      <small>{category.description}</small>
                    </div>
                    <div className="miniBar" aria-label={`${category.score} out of 5`}>
                      <span style={{ width: `${category.percentage}%` }} />
                    </div>
                    <strong>{category.score}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel" aria-labelledby="strengths-title">
              <h2 id="strengths-title">Top Strengths</h2>
              <div className="insightList">
                {results.strengths.map((category) => (
                  <article key={category.id}>
                    <CheckCircle2 aria-hidden="true" />
                    <div>
                      <h3>{category.label}</h3>
                      <p>{categoryRecommendations[category.id].strength}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel" aria-labelledby="improvements-title">
              <h2 id="improvements-title">Improvement Areas</h2>
              <div className="insightList">
                {results.improvements.map((category) => (
                  <article key={category.id}>
                    <Target aria-hidden="true" />
                    <div>
                      <h3>{category.label}</h3>
                      <p>{categoryRecommendations[category.id].improvement}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel widePanel roadmap" aria-labelledby="roadmap-title">
              <div className="panelHeader">
                <h2 id="roadmap-title">Personalized 30-Day Roadmap</h2>
                <span>Start this week</span>
              </div>
              <ol>
                {results.roadmap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
          </div>

          <div className="ctaBand" aria-label="Next steps">
            <a className="primaryButton" href={links.downloadResource} download>
              <Download aria-hidden="true" />
              Download the EDITT Framework
            </a>
            <a className="secondaryButton" href={links.speakingInquiry}>
              <Mail aria-hidden="true" />
              Invite Tochi to Speak
            </a>
            <button className="ghostButton" onClick={reset}>
              <RotateCcw aria-hidden="true" />
              Retake
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
