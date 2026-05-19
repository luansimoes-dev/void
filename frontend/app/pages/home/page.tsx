"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { MdVerified, MdVerifiedUser } from "react-icons/md";

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

export default function HomePage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const cards: CardItem[] = [
    {
      title: "Void.dev",
      description:
        "Uma plataforma social focada em desenvolvedores para compartilhar projetos, snippets e ideias.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
      githubLink: "https://github.com/roberdoo/void.dev",
      demoLink: "https://void.dev",
      user: {
        name: "Roberdoo",
        avatar: "https://i.pravatar.cc/150?img=12",
        description: "Fullstack developer apaixonado por UI e backend.",
      },
    },
    {
      title: "Realtime Chat",
      description:
        "Aplicação de chat em tempo real usando WebSocket e autenticação JWT.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      tags: ["React", "Node.js", "Socket.IO"],
      githubLink: "https://github.com/roberdoo/realtime-chat",
      user: {
        name: "Lucas Silva",
        avatar: "https://i.pravatar.cc/150?img=20",
        isVerified: true,
      },
    },
  ];
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
            className="overflow-hidden border-primary/20  text-zinc-100 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl"
          >
            <CardHeader className="space-y-4">
              <div className="group relative flex items-center gap-3">
                <Avatar className="h-11 w-11 cursor-pointer ring-2 ring-transparent transition-all duration-200 group-hover:ring-zinc-700">
                  <AvatarImage src={card.user.avatar} />

                  <AvatarFallback className="text-sm">
                    {card.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <p className="cursor-pointer font-medium transition-colors group-hover:text-primary">
                    {card.user.name}
                  </p>
                  {card.user.isVerified && (
                    <MdVerified className="text-primary" />
                  )}
                </div>

                {/* Hover Card */}
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

                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
                    <span>
                      <strong className="text-white">12</strong> projetos
                    </span>
                  </div>
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
                  className="text-sm font-medium text-primary cursor-pointer hover:underline"
                >
                  {expanded === index ? "Mostrar menos" : "Mostrar mais"}
                </button>
              )}

              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
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
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  <FaGithub className="text-base" />
                  GitHub
                </Link>
              )}

              {card.demoLink && (
                <Link
                  href={card.demoLink}
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  <FiExternalLink className="text-base" />
                  Ver demo
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
