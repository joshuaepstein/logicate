import Link from 'next/link'

export default function GetStarted() {
  return (
    <section id="get-started" className="border-neutralgrey-400 flex flex-col items-center justify-start border-t bg-white">
      <div className="container flex h-full flex-col items-center justify-start py-16">
        <h2 className="text-neutralgrey-1200 text-center text-3xl font-medium">Get Started Now!</h2>
        <p className="text-neutralgrey-1000/85 mt-2 text-center">
          Sign up for free and start building, simulating, and testing logic gates.
        </p>

        <Link
          href="/register"
          className="mt-8 rounded-md border border-blue-900/50 bg-blue-800 px-3 py-1.5 text-sm text-white transition hover:scale-105 hover:border-blue-900"
        >
          Sign Up
          <kbd className="ml-2 hidden rounded-[3px] bg-white/10 px-1 py-px font-mono text-xs transition md:inline">N</kbd>
        </Link>
      </div>
    </section>
  )
}
