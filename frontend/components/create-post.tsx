"use client";

import { useState } from "react";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { X } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { Post } from "@/domain/Post";
import Link from "next/link";

export function CreatePost() {
  const { user } = useUser();

  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");

  const [expanded, setExpanded] = useState(false);

  const cores: string[] = [
    "bg-pink-700 text-white",
    "bg-blue-700 text-white",
    "bg-green-700 text-white",
    "bg-yellow-700 text-white",
    "bg-red-700 text-white",
    "bg-purple-700 text-white",
  ];

  function addTag() {
    const tag = tagInput.trim().toLowerCase();

    if (!tag || post.tags.includes(tag)) return;

    setPost((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setTagInput("");
  }

  function removeTag(tagToRemove: string) {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">
          Create Post
        </DialogTitle>

        <p className="text-sm text-zinc-400">
          Share your project with the community.
        </p>
      </DialogHeader>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title</label>

            <Input
              placeholder="My awesome project..."
              value={post.title}
              className="border-zinc-800 bg-zinc-900"
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Content</label>

            <Textarea
              placeholder="Tell something about your project..."
              value={post.content}
              className="min-h-[180px] resize-none border-zinc-800 bg-zinc-900"
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />

            <div className="flex justify-end">
              <span className="text-xs text-zinc-500">
                {post.content.length}/1000
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300">Tags</label>

            <div className="flex gap-2">
              <Input
                value={tagInput}
                placeholder="react, nextjs..."
                className="border-zinc-800 bg-zinc-900"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />

              <Button
                type="button"
                variant="secondary"
                className="bg-zinc-800 hover:bg-zinc-700"
                onClick={addTag}
              >
                Add
              </Button>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                      cores[index % cores.length]
                    }`}
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="opacity-70 transition hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              GitHub Link
            </label>

            <Input
              value={githubLink}
              placeholder="https://github.com/..."
              className="border-zinc-800 bg-zinc-900"
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Demo Link
            </label>

            <Input
              value={demoLink}
              placeholder="https://..."
              className="border-zinc-800 bg-zinc-900"
              onChange={(e) => setDemoLink(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-400">Preview</p>

          <Card className="overflow-hidden border-zinc-800 bg-zinc-900 text-zinc-100">
            <CardHeader className="space-y-4">
              <div className="group relative flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <p className="font-medium">{user?.name || "Unknown"}</p>

                  <MdVerified className="text-primary" />
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
                    bg-zinc-950
                    p-4
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:opacity-100
                  "
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={user?.avatar} />

                      <AvatarFallback>
                        {user?.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {user?.name}
                        </h3>

                        <MdVerified className="text-primary" />
                      </div>

                      <p className="text-sm text-zinc-400">
                        @{user?.name?.toLowerCase().replace(/\s/g, "")}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {user?.description ||
                      "Frontend developer passionate about creating modern interfaces."}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold tracking-tight">
                {post.title || "Your post title"}
              </h2>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-zinc-400">
                {expanded
                  ? post.content || "Your content preview..."
                  : (post.content || "Your content preview...").slice(0, 120) +
                    ((post.content || "").length > 120 ? "..." : "")}
              </p>

              {(post.content || "").length > 120 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {expanded ? "Mostrar menos" : "Mostrar mais"}
                </button>
              )}

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      cores[index % cores.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <CardFooter className="flex items-center gap-2 px-0 pt-2">
                {githubLink && (
                  <Link
                    href={githubLink}
                    target="_blank"
                    className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                  >
                    <FaGithub />
                    GitHub
                  </Link>
                )}

                {demoLink && (
                  <Link
                    href={demoLink}
                    target="_blank"
                    className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                  >
                    <FiExternalLink />
                    Ver demo
                  </Link>
                )}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button
            variant="outline"
            className="border-zinc-800 bg-transparent hover:bg-zinc-900"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          disabled={!post.title || !post.content}
          className="bg-white text-black hover:bg-zinc-200"
        >
          Create Post
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
