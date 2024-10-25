import { ArrowRightSmIcon } from '@jfstech/icons-react/24/outline'
import { headers } from 'next/headers'
import Image from 'next/image'

import Image404 from '~/_static/404.png'

export default async function NotFound() {
  const headersList = await headers()
  const pathname = headersList.get('x-url')

  return (
    <>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center py-16">
        <div className="flex w-full flex-col items-center justify-center">
          <Image src={Image404} alt="404 Image" width={2000} height={2000} className="max-w-[500px]" />

          <div className="flex flex-col">
            <p className="text-neutralgrey-900 w-max text-left text-sm font-medium">
              <span className="text-neutralgrey-1000">A</span> <ArrowRightSmIcon className="-mt-0.5 inline-block size-4" />{' '}
              {decodeURIComponent(pathname || '').replaceAll('%20', ' ')}
            </p>
            <p className="text-neutralgrey-900 w-max text-left text-sm font-medium">
              <span className="text-neutralgrey-1000">B</span> <ArrowRightSmIcon className="-mt-0.5 inline-block size-4" /> Page Found?
            </p>
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold">Page not found</p>

        <p className="text-neutralgrey-800 mt-2 text-sm">The page you are looking for does not exist.</p>
      </div>
    </>
  )
}
