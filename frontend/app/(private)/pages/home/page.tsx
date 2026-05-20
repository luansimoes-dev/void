"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

interface UserCard {
  name: string;
  avatar?: string;
  description?: string;
  isVerified?: boolean;
}

interface CardItem {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  user: UserCard;
}

async function fetchCards(
  page: number,
  jwt: string | undefined,
): Promise<CardItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}posts?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();

    console.log(res.status);
    console.log(jwt);
    console.log(text);

    throw new Error(`Erro ${res.status}`);
  }

  const body = await res.json();

  const data: CardItem[] = body.content.map((item: any) => ({
    title: item.title,
    description: item.description,
    image: item.image,
    tags: item.tags,
    githubLink: item.githubLink,
    demoLink: item.demoLink,

    user: {
      name: item.user.name,
      avatar: item.user.avatar,
      description: item.user.description,
      isVerified: item.user.isVerified,
    },
  }));

  return data;
}

export default function HomePage() {
  const { user } = useUser();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadCards = useCallback(async () => {
    if (!user?.jwt) return;

    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const newCards = await fetchCards(page, user.jwt);

      if (newCards.length === 0) {
        setHasMore(false);
      } else {
        setCards((prev) => [...prev, ...newCards]);

        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.jwt, loading, hasMore, page]);

  useEffect(() => {
    if (!user?.jwt) return;
    loadCards();
  }, [user?.jwt]);

  useEffect(() => {
    const el = loadMoreRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          loadCards();
        }
      },
      {
        threshold: 1,
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [page, loading, hasMore]);

  const cores: string[] = [
    "bg-pink-700 text-white",
    "bg-blue-700 text-white",
    "bg-green-700 text-white",
    "bg-yellow-700 text-white",
    "bg-red-700 text-white",
    "bg-purple-700 text-white",
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-10 flex flex-col gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="overflow-hidden border-primary/20 text-zinc-100 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl"
          >
            <CardHeader className="space-y-4">
              <div className="group relative flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={card.user.avatar} />

                  <AvatarFallback>
                    {card.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <p className="font-medium">{card.user.name}</p>

                  {card.user.isVerified && (
                    <MdVerified className="text-primary" />
                  )}
                </div>

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-14
                    z-50
                    w-72
                    translate-y-2
                    rounded-2xl
                    border border-zinc-700
                    bg-background
                    p-4
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:opacity-100
                  "
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={card.user.avatar} />

                      <AvatarFallback>
                        {card.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {card.user.name}
                        </h3>

                        {card.user.isVerified && (
                          <MdVerified className="text-primary" />
                        )}
                      </div>

                      <p className="text-sm text-zinc-400">
                        @{card.user.name.toLowerCase().replace(/\s/g, "")}
                      </p>
                    </div>
                  </div>

                  {card.user.description && (
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      {card.user.description}
                    </p>
                  )}
                </div>
              </div>

              <CardTitle className="text-xl font-bold tracking-tight">
                {card.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-zinc-400">
                {expanded === index
                  ? card.description
                  : card.description.slice(0, 80) +
                    (card.description.length > 80 ? "..." : "")}
              </p>

              {card.description.length > 80 && (
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="cursor-pointer text-sm font-medium text-primary hover:underline"
                >
                  {expanded === index ? "Mostrar menos" : "Mostrar mais"}
                </button>
              )}

              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      cores[index % cores.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center gap-2 pt-2">
              {card.githubLink && (
                <Link
                  href={card.githubLink}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  <FaGithub />
                  GitHub
                </Link>
              )}

              {card.demoLink && (
                <Link
                  href={card.demoLink}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  <FiExternalLink />
                  Ver demo
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}

        <div ref={loadMoreRef} className="h-10" />

        {loading && <p className="text-center text-zinc-400">Carregando...</p>}

        {!hasMore && (
          <p className="text-center text-zinc-500">Sem mais posts</p>
        )}
      </div>
    </div>
  );
}
