import { getChangelogs } from './actions'
import { TextInput } from '@logicate/ui/input/index'
import { Button } from '@logicate/ui/button'
import { Changelog } from '@logicate/database'

export default async function ChangelogPage() {
  const changelogs: Changelog[] = await getChangelogs()

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pb-20 pt-20 text-center">
          <h1 className="text-neutralgrey-1100 text-4xl font-extrabold tracking-tight sm:text-5xl">Changelog</h1>
          <p className="text-neutralgrey-800 mt-4 text-base leading-7">
            Stay up to date with all of the latest additions and improvements we've made to Tailwind UI.
          </p>
          {/* TODO: Add to resend thing */}
          <form method="post" className="mt-6 flex justify-center">
            <h2 className="sr-only">Subscribe via email</h2>
            <div className="relative w-64 shrink">
              <label htmlFor="subscribe-email" className="sr-only">
                Email address
              </label>
              <TextInput
                placeholder="Subscribe via email"
                id="subscribe-email"
                name="email_address"
                type="email"
                required
                className="block w-full min-w-0 max-w-none pl-12 pr-3 sm:leading-6"
                displayError={false}
              />
              <svg
                className="stroke-neutralgrey-600 pointer-events-none absolute left-3 top-2 h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
                <path d="m6 7 6 5 6-5"></path>
              </svg>
            </div>
            <Button
              type="submit"
              variant="dark"
              className="ml-4"
              //   className="bg-neutralgrey-1100 hover:bg-neutralgrey-900 ml-4 inline-flex flex-none justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {changelogs.map((changelog) => (
          <ChangelogItem key={changelog.id} changelog={changelog} />
        ))}
      </div>
    </>
  )
}

function ChangelogItem({ changelog }: { changelog: Changelog }) {
  return (
    <section id="2024-07-04" aria-labelledby="2024-07-04-heading" className="md:flex">
      <h2 id="2024-07-04-heading" className="text-neutralgrey-700 pl-7 text-sm leading-6 md:w-1/4 md:pl-0 md:pr-12 md:text-right">
        <a href="#2024-07-04">July 4, 2024</a>
      </h2>
      <div className="relative pb-16 pl-7 pt-2 md:w-3/4 md:pl-12 md:pt-0">
        <div className="bg-neutralgrey-400 absolute -top-3 bottom-0 left-0 w-px md:top-2.5"></div>
        <div className="border-neutralgrey-700 absolute -left-1 -top-[1.0625rem] h-[0.5625rem] w-[0.5625rem] rounded-full border-2 bg-white md:top-[0.4375rem]"></div>
        <div className="prose-h3:mb-4 prose-h3:text-base prose-h4:text-base prose-h4:font-medium prose-h3:leading-6 prose-sm prose prose-neutralgrey prose-a:font-semibold prose-a:text-blue-700 hover:prose-a:text-blue-800 max-w-none">
          <h2 className="text-2xl font-semibold">{changelog.title}</h2>
          <p>{changelog.subtitle}</p>
          <img className="rounded-xl" src="//tailwindui.com/img/changelog/react-server-components.png" alt="React Server Components" />
          <h4>Additions</h4>
          <ul className="marker:text-neutralgrey-900 list-disc">
            {changelog.additions.map((addition) => (
              <li key={addition}>{addition}</li>
            ))}
          </ul>
          <h4>Changes</h4>
          <ul className="marker:text-neutralgrey-900 list-disc">
            {changelog.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <h4>Fixes</h4>
          <ul className="marker:text-neutralgrey-900 list-disc">
            {changelog.fixes.map((fix) => (
              <li key={fix}>{fix}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
