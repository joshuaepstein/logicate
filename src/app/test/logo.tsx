'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getFromCache, LOGO_DATA_KEY, getLogoUrlFromDB, fetchImageAsDataUrl, setInCache } from './cache-utils'
import LoadingCircle from '@/components/ui/icons/loading-circle'

export default function Logo() {
  const [loading, setLoading] = useState(true)
  const [logoData, setLogoData] = useState<string | null>(null)

  useEffect(() => {
    async function loadLogo() {
      setLoading(true)
      const cachedData = await getFromCache(LOGO_DATA_KEY)
      setLogoData(cachedData)
      setLoading(false)
      const cachedUrl = await getFromCache('logo-url')
      const logoUrl = await getLogoUrlFromDB()
      if (cachedData) {
        if (cachedUrl === logoUrl) {
          setLogoData(cachedData)
          setLoading(false)
          return
        } else {
          setLogoData(cachedData)
        }
        // If cached data doesn't match, continue to fetch new data
      }

      try {
        setLoading(true)
        const dataUrl = await fetchImageAsDataUrl(logoUrl)
        setLogoData(dataUrl)
        await setInCache(LOGO_DATA_KEY, dataUrl)
        await setInCache('logo-url', logoUrl)
      } catch (error) {
        console.error('Failed to fetch or cache logo:', error)
        setLogoData(null) // Fallback to initial URL if everything fails
      } finally {
        setLoading(false)
      }
    }

    loadLogo()
  }, [])

  return (
    <div className="logo-container">
      {(logoData && !loading && <Image src={logoData} alt="Logo" width={200} height={100} className="aspect-auto w-full" />) ||
        (loading && !logoData && <LoadingCircle />)}
    </div>
  )
}
