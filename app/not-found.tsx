import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-light dark:bg-black text-light-text dark:text-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-light tracking-tight mb-4 animate-pulse text-light-text dark:text-white">
          404
        </div>
        <div className="h-px w-16 bg-primary mx-auto mb-6"></div>
        <h1 className="text-xl md:text-2xl font-light text-light-text-muted dark:text-gray-400 mb-8 uppercase tracking-[0.3em]">
          Technical Connection Found
        </h1>
        <p className="text-light-text-subtle dark:text-gray-600 mb-12 max-w-md mx-auto text-sm uppercase tracking-widest leading-loose">
          The asset or datasheet you are attempting to retrieve does not exist in our current ledger.
        </p>
        <Link
          href="/"
          className="inline-block border border-light-border dark:border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-light-lighter/50 dark:bg-white/5 backdrop-blur-sm"
        >
          Reset to Terminal [Home]
        </Link>
      </div>
    </main>
  );
}
