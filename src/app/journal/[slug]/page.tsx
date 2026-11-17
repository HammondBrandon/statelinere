import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { posts, getPost, formatPostDate } from "@/lib/journal";
import { unsplash } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Not found" };
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-white pt-28 pb-24">
      <div className="container-x max-w-3xl">
        <Link href="/journal" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-teal-deep">
          <ChevronLeft className="h-4 w-4" aria-hidden /> The Journal
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.16em] text-ink-muted">{post.category} · {formatPostDate(post.date)}</p>
        <h1 className="mt-3 font-display text-5xl uppercase tracking-wide sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-xl font-light leading-relaxed">{post.excerpt}</p>
      </div>
      <div className="container-x mt-12 max-w-5xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
          <Image src={unsplash(post.image, 1800)} alt="" fill preload sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-x mt-12 max-w-3xl space-y-6 text-lg leading-relaxed">
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
        <div className="!mt-14 rounded-3xl bg-cream p-8 text-center">
          <p className="font-script text-3xl text-teal">Have a question?</p>
          <p className="mt-2">We&apos;re always happy to talk real estate, no strings attached.</p>
          <ButtonLink href="/contact" className="mt-6">Get in Touch</ButtonLink>
        </div>
      </div>
    </article>
  );
}
