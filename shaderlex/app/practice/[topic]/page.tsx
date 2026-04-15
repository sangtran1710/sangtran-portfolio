import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { QuizSession } from "@/components/practice/quiz-session";
import { getPublicQuizBank, getTopic, getTopics } from "@/lib/content";

type PracticeTopicPageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PracticeTopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const topicMeta = getTopic(topic);

  if (!topicMeta) {
    return {
      title: "Practice Topic Not Found",
    };
  }

  return {
    title: `${topicMeta.name} Practice`,
    description: topicMeta.seoDescription,
  };
}

export default async function PracticeTopicPage({ params }: PracticeTopicPageProps) {
  const { topic } = await params;
  const topicMeta = getTopic(topic);

  if (!topicMeta) {
    notFound();
  }

  const bank = getPublicQuizBank(topic);

  if (!bank) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <QuizSession bank={bank} topic={topicMeta} />
    </div>
  );
}
