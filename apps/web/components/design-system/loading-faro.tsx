import Image from "next/image";

interface LoadingFaroProps {
  text?: string;
}

export function LoadingFaro({
  text = "Farejando novos leads...",
}: LoadingFaroProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 rounded-xl border border-gray-800">
      <div className="relative w-32 h-32 mb-6 animate-pulse shadow-[0_0_25px_rgba(147,51,234,0.3)] rounded-full bg-purple-900/20 p-4">
        <div className="absolute inset-0 bg-purple-600/10 rounded-full animate-ping opacity-75"></div>
        <Image
          src="/mascot-loading.jpg"
          alt="Mascote Farejando"
          fill
          className="object-contain rounded-full opacity-90 mix-blend-screen relative z-10"
        />
      </div>
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 animate-pulse">
        {text}
      </h3>
      <p className="text-sm text-gray-400 mt-2">
        Nossa IA está cruzando dados em tempo real.
      </p>
    </div>
  );
}
