"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-[#f5f3ee] text-[#17191d]">
        <main className="flex min-h-screen items-center justify-center px-5 py-16 text-center">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c74d19]">YaFoo</p>
            <h1 className="mt-3 font-display text-3xl font-bold">The route needs a reset.</h1>
            <p className="mt-3 text-sm leading-6 text-[#686a6d]">A page-level error interrupted this demo. Try rendering the route again.</p>
            <button type="button" onClick={() => reset()} className="mt-6 min-h-11 rounded-xl bg-[#111318] px-4 text-xs font-bold text-white">Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}
