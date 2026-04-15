import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { TOPICS } from "@/data/topics";
import type { Lesson, LessonMeta, PublicQuizBank, QuizBank, TopicMeta, TopicSlug } from "@/types/learning";

const LESSONS_ROOT = path.join(process.cwd(), "content", "lessons");
const QUIZZES_ROOT = path.join(process.cwd(), "content", "quizzes");

function normalizeTopic(topic: string): TopicSlug | null {
  const matchingTopic = TOPICS.find((item) => item.slug === topic);

  if (matchingTopic) {
    return matchingTopic.slug;
  }

  return null;
}

export function getTopics(): TopicMeta[] {
  return TOPICS;
}

export function getTopic(topic: string) {
  return TOPICS.find((item) => item.slug === topic);
}

export function getLessonsForTopic(topic: TopicSlug): LessonMeta[] {
  const topicDir = path.join(LESSONS_ROOT, topic);

  if (!fs.existsSync(topicDir)) {
    return [];
  }

  return fs
    .readdirSync(topicDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(topicDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      return {
        ...(data as Omit<LessonMeta, "slug" | "topic">),
        slug,
        topic,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getAllLessons() {
  return TOPICS.flatMap((topic) => getLessonsForTopic(topic.slug));
}

export function getLesson(topicInput: string, slug: string): Lesson | null {
  const topic = normalizeTopic(topicInput);

  if (!topic) {
    return null;
  }

  const filePath = path.join(LESSONS_ROOT, topic, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as Omit<Lesson, "content" | "slug" | "topic">),
    content,
    slug,
    topic,
  };
}

export function getAdjacentLessons(topic: TopicSlug, slug: string) {
  const lessons = getLessonsForTopic(topic);
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export function getFeaturedLessons(limit = 4) {
  return getAllLessons().slice(0, limit);
}

export function getQuizBank(topicInput: string): QuizBank | null {
  const topic = normalizeTopic(topicInput);

  if (!topic) {
    return null;
  }

  const filePath = path.join(QUIZZES_ROOT, `${topic}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as QuizBank;
}

export function getPublicQuizBank(topicInput: string): PublicQuizBank | null {
  const bank = getQuizBank(topicInput);

  if (!bank) {
    return null;
  }

  return {
    ...bank,
    questions: bank.questions.map((question) => ({
      id: question.id,
      type: question.type,
      prompt: question.prompt,
      viPrompt: question.viPrompt,
      skills: question.skills,
      difficulty: question.difficulty,
      bucketId: question.bucketId,
      followUps: question.followUps,
      viFollowUps: question.viFollowUps,
      answerSampleEn: question.answerSampleEn,
      answerSampleVi: question.answerSampleVi,
      options: question.options,
    })),
  };
}

export function getTopicSummary(topicInput: string) {
  const topic = normalizeTopic(topicInput);

  if (!topic) {
    return null;
  }

  const topicMeta = getTopic(topic);
  const lessons = getLessonsForTopic(topic);
  const quizBank = getQuizBank(topic);

  if (!topicMeta || !quizBank) {
    return null;
  }

  const questionCount = quizBank.questions.length;

  return {
    topic: topicMeta,
    lessons,
    quizBank,
    counts: {
      lessons: lessons.length,
      questions: questionCount,
    },
  };
}
