import { BlurImage } from '@/components/ui/blur-image'

import {
  default as HasmoLogo,
  default as ImmanuelCollegeLogo,
  default as JCoSSLogo,
  default as JFSLogo,
  default as YavnehCollegeLogo,
} from '~/_static/brands/joshuaepstein.png'

export default function Educators() {
  return (
    <>
      <section
        id="companies"
        className="border-neutralgrey-400 bg-neutralgrey-200 hidden w-full flex-col items-center justify-center border-t py-5 pt-10 md:flex"
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
      <section
        id="companies"
        className="border-neutralgrey-400 bg-neutralgrey-200 flex w-full flex-col items-center justify-center border-t py-5 pt-10 md:hidden"
      >
        <p className="text-neutralgrey-1200 text-lg font-medium">Trusted by educators at</p>
        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-8 px-8 sm:grid sm:grid-cols-5 sm:gap-4">
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
    </>
  )
}
