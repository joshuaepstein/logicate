import { Changelog } from '@logicate/database'
import { getChangelogs } from './actions'
import SubscribeForm from './subscribe-form'

export default async function ChangelogPage() {
  const changelogs: Changelog[] = await getChangelogs()

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center justify-start pb-20 pt-20 text-center">
          <h1 className="text-neutralgrey-1200 text-4xl font-semibold tracking-tight sm:text-5xl">Changelog</h1>
          <p className="text-neutralgrey-800 mt-4 max-w-xl text-base leading-7">
            Stay up to date with the latest changes to Logicate. Subscribe to our newsletter to get the latest updates delivered to your
            inbox.
          </p>
          <SubscribeForm />
        </div>
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {changelogs
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((changelog) => (
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
        <a href="#2024-07-04">
          {changelog.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </a>
      </h2>
      <div className="relative pb-16 pl-7 pt-2 md:w-3/4 md:pl-12 md:pt-0">
        <div className="bg-neutralgrey-400 absolute -top-3 bottom-0 left-0 w-px md:top-2.5"></div>
        <div className="border-neutralgrey-700 absolute -left-1 -top-[1.0625rem] h-[0.5625rem] w-[0.5625rem] rounded-full border-2 bg-white md:top-[0.4375rem]"></div>
        <div className="prose-h3:mb-4 prose-h3:text-base prose-h4:text-base prose-h4:font-medium prose-h3:leading-6 prose-sm prose prose-neutralgrey prose-a:font-semibold prose-a:text-blue-700 hover:prose-a:text-blue-800 max-w-none">
          <h2 className="text-2xl font-semibold">{changelog.title}</h2>
          <p>{changelog.subtitle}</p>
          <img
            className="rounded-xl"
            src="https://tailwindui.com/plus/img/changelog/20241003-new-pricing-table-example.png"
            alt="React Server Components"
          />
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
