import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

export default function Registro() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Navbar />
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold text-white">Seja bem vindo</h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Hoje é um novo dia. Uma nova ideia pode começar aqui. Crie sua conta
            e compartilhe os projetos que mostram quem você é como desenvolvedor
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-zinc-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-zinc-500"
          />

          <input
            type="password"
            placeholder="senha"
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-zinc-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl  "
          >
            Registrar
          </button>
        </form>

        <div className="flex items-center gap-4 my-6 w-full">
          <Separator className="flex-1 bg-zinc-700" />

          <p className="text-zinc-500 text-sm whitespace-nowrap">ou</p>

          <Separator className="flex-1 bg-zinc-700" />
        </div>
        <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-medium py-3 rounded-xl transition-all">
          <FcGoogle size={22} />
          Registre-se com Google
        </button>

        <p className="text-zinc-500 text-sm text-center mt-6">
          tem uma conta?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
