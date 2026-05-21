"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  const loadingRef = useRef(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // <- tava faltando isso

  const loadCards = useCallback(
    async (currentPage: number) => {
      if (!user?.jwt || loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        const newCards = await fetchCards(currentPage, user.jwt);

        if (newCards.length === 0) {
          // Chegou no fim — reinicia do zero
          setCards([]);
          setPage(1);
          const firstPage = await fetchCards(0, user.jwt);
          setCards(firstPage);
        } else {
          setCards((prev) => [...prev, ...newCards]);
          setPage(currentPage + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [user?.jwt],
  );

  // Carga inicial
  useEffect(() => {
    if (!user?.jwt) return;
    loadCards(0);
  }, [user?.jwt]);

  // Observer — passa a página atual via ref pra evitar closure stale
  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadCards(pageRef.current);
        }
      },
      { threshold: 1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadCards]);

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

        {loading && (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-primary/20">
                <CardHeader className="space-y-4">
                  {/* Avatar + nome */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-11 w-11 rounded-full" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                  {/* Título */}
                  <Skeleton className="h-5 w-2/3 rounded-md" />
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Descrição */}
                  <Skeleton className="h-3 w-full rounded-md" />
                  <Skeleton className="h-3 w-5/6 rounded-md" />
                  {/* Tags */}
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                </CardContent>

                <CardFooter className="gap-2 pt-2">
                  <Skeleton className="h-9 w-24 rounded-lg" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
