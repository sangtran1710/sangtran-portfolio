export type TopicSlug = "shaders" | "english";
export type KnowledgePillarSlug = "foundations" | "languages" | "optimization" | "tricks";

export interface TopicMeta {
  slug: TopicSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  seoDescription: string;
  color: string;
  accent: string;
  outcomes: string[];
  practiceFocus: string[];
}

export interface LessonFrontmatter {
  title: string;
  description: string;
  summary: string;
  order: number;
  duration: string;
  level: string;
  tags: string[];
  objectives: string[];
  pillar?: KnowledgePillarSlug;
  prerequisites?: string[];
}

export interface Lesson extends LessonFrontmatter {
  slug: string;
  topic: TopicSlug;
  content: string;
}

export interface LessonMeta extends LessonFrontmatter {
  slug: string;
  topic: TopicSlug;
}

export interface MultipleChoiceOption {
  id: string;
  label: string;
  detail?: string;
  viLabel?: string;
  viDetail?: string;
}

export interface QuizBucket {
  id: string;
  label: string;
  description: string;
  viDescription?: string;
  answerSkeleton?: string[];
  viAnswerSkeleton?: string[];
  speakFirstPrompt?: string;
  viSpeakFirstPrompt?: string;
  isWeakPoint?: boolean;
}

export interface WeakPointArea {
  id: string;
  title: string;
  whyItMatters: string;
  coachLine: string;
  viWhyItMatters?: string;
  viCoachLine?: string;
  bucketIds: string[];
}

export interface BaseQuestion {
  id: string;
  prompt: string;
  viPrompt?: string;
  skills: string[];
  difficulty: "foundation" | "intermediate" | "advanced";
  bucketId?: string;
  followUps?: string[];
  viFollowUps?: string[];
  answerSampleEn?: string;
  answerSampleVi?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "mcq";
  explanation: string;
  viExplanation?: string;
  answer: string;
  options: MultipleChoiceOption[];
}

export interface PublicMultipleChoiceQuestion extends BaseQuestion {
  type: "mcq";
  options: MultipleChoiceOption[];
}

export interface QuizBank {
  topic: TopicSlug;
  title: string;
  description: string;
  estimatedTime: string;
  sessionSize: number;
  buckets?: QuizBucket[];
  weakPoints?: WeakPointArea[];
  practiceNotes?: string[];
  questions: MultipleChoiceQuestion[];
}

export interface PublicQuizBank extends Omit<QuizBank, "questions"> {
  questions: PublicMultipleChoiceQuestion[];
}

export interface QuizQuestionResult {
  id: string;
  prompt: string;
  viPrompt?: string;
  skills: string[];
  bucketId?: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
  viExplanation?: string;
  followUps?: string[];
  viFollowUps?: string[];
  answerSampleEn?: string;
  answerSampleVi?: string;
}

export interface QuizSubmissionRequest {
  topic: TopicSlug;
  questionIds: string[];
  answers: Record<string, string>;
}

export interface QuizSubmissionResponse {
  score: number;
  correct: number;
  total: number;
  accuracy: number;
  strengths: string[];
  nextSteps: string[];
  summary: string;
  questionResults: QuizQuestionResult[];
}

export interface ProgressEntry {
  id: string;
  topic: TopicSlug;
  topicLabel: string;
  sessionTitle: string;
  createdAt: string;
  score: number;
  mcqCorrect: number;
  mcqTotal: number;
  accuracy: number;
  strengths: string[];
  nextSteps: string[];
}
