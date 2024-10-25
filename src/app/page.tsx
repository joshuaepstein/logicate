import LogicGateIcon from '@/components/icons/logic-gate-icon'
import AppScreenshot from '@/components/marketing/app-screenshot'
import FeatureQuestions from '@/components/marketing/sections/features/questions'
import FeatureSimulate from '@/components/marketing/sections/features/simulate'
import { BlurImage } from '@/components/ui/blur-image'
import { Book04Icon, FileReturn02Icon, UsersProfiles03Icon } from '@jfstech/icons-react/24/outline'
import Link from 'next/link'
import { CSSProperties } from 'react'
import {
  default as HasmoLogo,
  default as ImmanuelCollegeLogo,
  default as JCoSSLogo,
  default as JFSLogo,
  default as YavnehCollegeLogo,
} from '~/_static/brands/joshuaepstein.png'

export default function Page() {
  return (
    <>
      <div
        className="bg-neutralgrey-300 relative flex w-full flex-col items-center justify-center md:min-h-[70dvh]"
        style={{
          backgroundImage: 'url(/_static/landing-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-neutralgrey-1200 -mt-36 text-center text-5xl font-semibold leading-tight">
          <span className="motion-preset-focus-lg motion-delay-300 motion-duration-1000">Build</span>
          <span className="motion-preset-focus-lg motion-delay-500 motion-duration-1000">, Simulate</span>
          <span className="motion-preset-focus-lg motion-delay-700 motion-duration-1000">, Test</span>
          <br />
          <span className="motion-preset-focus-lg motion-delay-1000 motion-duration-1000 bg-gradient-to-b from-blue-700 to-indigo-600 bg-clip-text font-semibold text-transparent">
            Logic Gates
          </span>
        </h1>

        <AppScreenshot className="absolute top-1/2" />
      </div>

      <div id="mt" data-empty-placeholder className="min-h-[25dvh]" />

      <section id="what-we-do" className="flex min-h-[45dvh] items-center justify-center">
        <p className="text-neutralgrey-1200 max-w-3xl text-center text-3xl font-medium [&>span]:transition-colors [&>span]:duration-300">
          With Logicate you can{' '}
          <Link
            href="#feature-simulate"
            style={{ '--animation-duration': '3s' } as CSSProperties}
            className="hover-text-shimmer inline-flex items-center gap-2 text-indigo-900"
          >
            build and simulate <LogicGateIcon className="inline-block size-10 text-current" />
          </Link>{' '}
          logic gates,{' '}
          <Link
            href="#feature-questions"
            style={{ '--animation-duration': '3s' } as CSSProperties}
            className="hover-text-shimmer inline-flex items-center gap-2 text-purple-900"
          >
            test knowledge <Book04Icon className="inline-block size-9 text-current" />
          </Link>{' '}
          and{' '}
          <Link
            href="#feature-learn"
            style={{ '--animation-duration': '1.5s' } as CSSProperties}
            className="hover-text-shimmer inline-flex items-center justify-start gap-2 text-orange-900"
          >
            learn
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              className="inline-block size-9 text-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4475 17.2539L17.939 16.3929L18.4475 17.2539ZM18.939 16.3929H17.939H18.939ZM10.9657 20.4036L10.4292 21.2475L10.9657 20.4036ZM13.0555 20.4379L13.564 21.299L13.0555 20.4379ZM1.90419 7.13686L1.39226 6.27784L1.90419 7.13686ZM1.90419 7.99589L1.39226 8.85492L1.90419 7.99589ZM12.512 13.7074L13.024 14.5664L12.512 13.7074ZM11.4882 13.7074L12.0001 12.8483L11.4882 13.7074ZM22.096 7.13686L22.6079 6.27784L22.096 7.13686ZM22.096 7.99589L21.5841 7.13686L22.096 7.99589ZM6.01768 17.2583L6.55413 16.4144L6.01768 17.2583ZM12.512 1.4254L12.0001 2.28442L12.512 1.4254ZM11.4882 1.4254L12.0001 2.28442L11.4882 1.4254ZM23.2001 7.54973C23.2001 6.99745 22.7524 6.54973 22.2001 6.54973C21.6478 6.54973 21.2001 6.99745 21.2001 7.54973H23.2001ZM21.2001 12.9497C21.2001 13.502 21.6478 13.9497 22.2001 13.9497C22.7524 13.9497 23.2001 13.502 23.2001 12.9497H21.2001ZM12.0001 2.28442L21.5841 7.99589L22.6079 6.27784L13.024 0.566368L12.0001 2.28442ZM21.5841 7.13686L12.0001 12.8483L13.024 14.5664L22.6079 8.85492L21.5841 7.13686ZM2.41612 7.99589L12.0001 2.28442L10.9762 0.566367L1.39226 6.27784L2.41612 7.99589ZM12.0001 12.8483L6.06606 9.312L5.0422 11.0301L10.9762 14.5664L12.0001 12.8483ZM6.06606 9.312L2.41612 7.13686L1.39226 8.85492L5.0422 11.0301L6.06606 9.312ZM4.55413 10.171V16.4144H6.55413V10.171H4.55413ZM5.48123 18.1023L10.4292 21.2475L11.5021 19.5597L6.55413 16.4144L5.48123 18.1023ZM13.564 21.299L18.956 18.115L17.939 16.3929L12.5471 19.5768L13.564 21.299ZM19.939 16.3929L19.939 10.171H17.939L17.939 16.3929H19.939ZM18.956 18.115C19.5652 17.7553 19.939 17.1004 19.939 16.3929H17.939L18.956 18.115ZM10.4292 21.2475C11.3814 21.8527 12.5925 21.8726 13.564 21.299L12.5471 19.5768C12.2232 19.768 11.8195 19.7614 11.5021 19.5597L10.4292 21.2475ZM1.39226 6.27784C0.416118 6.85956 0.416123 8.2732 1.39226 8.85492L2.41612 7.13686C2.7415 7.33077 2.7415 7.80198 2.41612 7.99589L1.39226 6.27784ZM12.0001 12.8483L12.0001 12.8483L10.9762 14.5664C11.6071 14.9423 12.3931 14.9423 13.024 14.5664L12.0001 12.8483ZM21.5841 7.99589C21.2587 7.80199 21.2587 7.33077 21.5841 7.13686L22.6079 8.85492C23.5841 8.2732 23.5841 6.85956 22.6079 6.27784L21.5841 7.99589ZM4.55413 16.4144C4.55413 17.0986 4.90384 17.7353 5.48123 18.1023L6.55413 16.4144V16.4144H4.55413ZM13.024 0.566368C12.3931 0.190444 11.6071 0.190442 10.9762 0.566367L12.0001 2.28442L12.0001 2.28442L13.024 0.566368ZM21.2001 7.54973V12.9497H23.2001V7.54973H21.2001Z"
                fill="currentColor"
              />
            </svg>
          </Link>{' '}
          with our question generator,{' '}
          <Link
            href="#feature-classrooms"
            style={{ '--animation-duration': '3s' } as CSSProperties}
            className="hover-text-shimmer inline-flex items-center gap-2 text-green-900"
          >
            create and manage <UsersProfiles03Icon className="inline-block size-9 text-current" />
          </Link>{' '}
          classrooms, and{' '}
          <Link
            href="#feature-assign"
            style={{ '--animation-duration': '2s' } as CSSProperties}
            className="hover-text-shimmer text-maroon-900 inline-flex items-center gap-2"
          >
            assign <FileReturn02Icon className="inline-block size-9 text-current" />
          </Link>{' '}
          tasks and homework. <br />
          <span className="text-neutralgrey-1000/85 mt-2 inline-block">All in one, easy to use platform.</span>
        </p>
      </section>

      <section
        id="companies"
        className="border-neutralgrey-400 bg-neutralgrey-200 flex w-full flex-col items-center justify-center border-t py-5 pt-10"
      >
        <div className="container flex w-full items-center justify-between">
          <p className="text-neutralgrey-1200 text-lg font-medium">Trusted by educators at</p>
          <BlurImage
            src={JFSLogo}
            alt="JFS Logo"
            className="h-14 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            width={100}
            height={100}
          />
          <BlurImage
            src={YavnehCollegeLogo}
            alt="Yavneh College Logo"
            className="h-14 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            width={100}
            height={100}
          />
          <BlurImage
            src={JCoSSLogo}
            alt="JCoSS Logo"
            className="h-14 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            width={100}
            height={100}
          />
          <BlurImage
            src={ImmanuelCollegeLogo}
            alt="Immanuel College Logo"
            className="h-14 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            width={100}
            height={100}
          />
          <BlurImage
            src={HasmoLogo}
            alt="Hasmonean Logo"
            className="h-14 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            width={100}
            height={100}
          />
        </div>
      </section>

      <FeatureSimulate />
      <FeatureQuestions />
      {/* <Container mt="mt-0" className="">
        <Features />
      </Container>
      Get Started for Free */}

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
            <kbd className="ml-2 rounded-[3px] bg-white/10 px-1 py-px font-mono text-xs transition">N</kbd>
          </Link>
        </div>
      </section>
    </>
  )
}
