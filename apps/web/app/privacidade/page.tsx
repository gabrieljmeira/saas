import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8">
        <Image src="/logonavbar.avif" alt="FetchLeads Logo" width={48} height={48} className="rounded-md" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-white">Política de Privacidade</h1>
      <p className="text-slate-400 mb-8 max-w-lg text-center">
        O conteúdo completo da Política de Privacidade do FetchLeads está sendo elaborado e será publicado em breve.
      </p>
      <Link href="/" className="flex items-center text-purple-400 hover:text-purple-300">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
      </Link>
    </div>
  );
}
