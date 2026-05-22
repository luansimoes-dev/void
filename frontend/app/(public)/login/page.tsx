"use client";

import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@/hooks/use-user";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { login } from "@/services/auth-service";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;
function errorToast(message: string) {
  toast.error(message, {
    position: "bottom-right",
  });
}

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    setLoading(true);
    try {
      const result = await login(data);

      setUser({
        jwt: result.jwt,
        isAdmin: result.isAdmin,
        name: result.name,
        photo: result.photo,
        email: result.email,
      });

      toast.success("login realizado com sucesso", {
        position: "bottom-right",
      });

      router.push("/pages/home");
    } catch (err: any) {
      if (err.status == 400) {
        err.message.forEach((e) => errorToast(e));
      } else {
        errorToast(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold text-white">
            Seja bem vindo de volta
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Hoje é um novo dia. É o seu dia.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Spinner className="size-4 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex justify-end mt-3">
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            esqueceu a senha?
          </button>
        </div>

        <div className="flex items-center gap-4 my-6 w-full">
          <Separator className="flex-1 bg-zinc-700" />

          <p className="text-zinc-500 text-sm">ou</p>

          <Separator className="flex-1 bg-zinc-700" />
        </div>

        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-medium py-3 rounded-[5px] transition-all disabled:opacity-50"
        >
          <FcGoogle size={22} />
          Login com Google
        </button>

        <p className="text-zinc-500 text-sm text-center mt-6">
          Não tem uma conta?{" "}
          <a
            href="/registro"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
