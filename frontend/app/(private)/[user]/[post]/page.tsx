import Footer from "@/components/footer";
import { MD } from "@/components/MD";
import { DropDownPost } from "@/components/posts/DropDown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Post } from "@/domain/Post";
export const dynamic = "force-dynamic";
import { UserType } from "@/types/UserType";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{
    user: string;
    post: string;
  }>;
}

async function getUser(id: number): Promise<UserType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/user/${id}`,
    {
      cache: "no-cache",
    },
  );
  const data = await response.json();
  console.log(data);
  return data;
}
async function getPost(id: number): Promise<Post> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}posts/${id}`,
    {
      cache: "no-cache",
    },
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export default async function PostPage({ params }: PostPageProps) {
  const { user: ownerPost, post } = await params;

  const userData = await getUser(Number(ownerPost));
  const postData = await getPost(Number(post));
  console.log(postData);
  return (
    <div>
      <div className="border-b border-border">
        <header className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              {postData.title}
            </h1>

            <DropDownPost userID={Number(ownerPost)} />
          </div>

          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userData.photo} alt={userData.name} />
                <AvatarFallback>
                  {userData.name.substring(0, 3).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{userData.name}</span>
            </div>
            <span>•</span>
            <span>
              {new Date(postData.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/pages/home">home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`/${ownerPost}`}>{userData.name}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`/${ownerPost}/${post}`}>{postData.title}</Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      </div>
      <div className="mx-auto max-w-6xl  px-6 py-10">
        <MD md={postData.description} />
      </div>
      <Footer />
    </div>
  );
}
