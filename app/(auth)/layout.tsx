import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full flex overflow-hidden bg-[#121620] antialiased selection:bg-purple-600 selection:text-white">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">

        <div className="relative hidden md:block h-full w-full bg-[#0a0c10]">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent z-10 pointer-events-none" />
          <Image
            src="/images/engine.webp"
            alt="Music Headphones"
            fill
            priority
            className="object-cover brightness-[0.75] contrast-[1.05]"
          />
        </div>

        <div className="h-full w-full">
          {children} 
        </div>

      </div>
    </section>
  );
}