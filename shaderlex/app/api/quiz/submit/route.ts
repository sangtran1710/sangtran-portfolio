import { NextResponse } from "next/server";

import { getQuizBank } from "@/lib/content";
import type { MultipleChoiceQuestion, QuizSubmissionRequest, QuizSubmissionResponse } from "@/types/learning";

function buildStrengths(correctRatio: number, correctQuestions: MultipleChoiceQuestion[]) {
  const strengths: string[] = [];
  const correctSkills = Array.from(new Set(correctQuestions.flatMap((question) => question.skills)));

  if (correctRatio >= 0.8) {
    strengths.push("Recall was consistent across most of the session.");
  }

  if (correctSkills.length > 0) {
    strengths.push(`You showed the strongest recall in ${correctSkills.slice(0, 2).join(" and ")}.`);
  }

  if (strengths.length === 0) {
    strengths.push("You already have a small base to build on, especially on the questions you answered correctly.");
  }

  return strengths.slice(0, 3);
}

function buildNextSteps(incorrectQuestions: MultipleChoiceQuestion[]) {
  if (incorrectQuestions.length === 0) {
    return [
      "Open a fresh random set while the current material is still warm.",
      "Push the difficulty by mixing both tracks in the same study block later.",
    ];
  }

  const missedSkills = Array.from(new Set(incorrectQuestions.flatMap((question) => question.skills)));

  return [
    `Review the missed areas first: ${missedSkills.slice(0, 3).join(", ")}.`,
    "Re-read the linked lesson topic, then retry a new randomized set right away.",
    "Pay attention to the explanation text on every missed question before moving on.",
  ];
}

export async function POST(request: Request) {
  const body = (await request.json()) as QuizSubmissionRequest;
  const bank = getQuizBank(body.topic);

  if (!bank) {
    return NextResponse.json({ error: "Quiz bank not found." }, { status: 404 });
  }

  const selectedQuestions = body.questionIds
    .map((id) => bank.questions.find((question) => question.id === id))
    .filter((question): question is MultipleChoiceQuestion => Boolean(question));

  if (selectedQuestions.length === 0) {
    return NextResponse.json({ error: "No valid questions were submitted." }, { status: 400 });
  }

  const questionResults = selectedQuestions.map((question) => {
    const selectedOptionId = body.answers[question.id] ?? "";

    return {
      id: question.id,
      prompt: question.prompt,
      viPrompt: question.viPrompt,
      skills: question.skills,
      bucketId: question.bucketId,
      selectedOptionId,
      correctOptionId: question.answer,
      isCorrect: selectedOptionId === question.answer,
      explanation: question.explanation,
      viExplanation: question.viExplanation,
      followUps: question.followUps,
      viFollowUps: question.viFollowUps,
      answerSampleEn: question.answerSampleEn,
      answerSampleVi: question.answerSampleVi,
    };
  });

  const correctQuestions = selectedQuestions.filter((question) => body.answers[question.id] === question.answer);
  const incorrectQuestions = selectedQuestions.filter((question) => body.answers[question.id] !== question.answer);
  const correct = correctQuestions.length;
  const total = selectedQuestions.length;
  const accuracy = correct / total;

  const response: QuizSubmissionResponse = {
    score: Number((accuracy * 10).toFixed(1)),
    correct,
    total,
    accuracy,
    strengths: buildStrengths(accuracy, correctQuestions),
    nextSteps: buildNextSteps(incorrectQuestions),
    summary:
      incorrectQuestions.length === 0
        ? "The backend scan came back clean. You can safely open a new random set or move to the next topic."
        : "The backend scan found a few weak spots. Use the explanations below to close the gap before the next attempt.",
    questionResults,
  };

  return NextResponse.json(response);
}
