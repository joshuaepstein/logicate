'use client'

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas'
import { useInView } from 'framer-motion'
import { redirect } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useWindowScroll } from 'react-use'
import { FeatureDescription, FeatureTag, FeatureTitle } from './components'
import FeatureWrapper from './feature-wrapper'

export default function FeatureSimulate() {
  const {
    rive,
    RiveComponent: CanvasDemo,
    canvas,
  } = useRive({
    src: '/_static/animation/canvas-demo.riv',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    // only play when the canvas is visible
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const windowScroll = useWindowScroll()
  const isVisible = useInView(buttonRef)

  useHotkeys('c', () => {
    if (buttonRef.current && isVisible) {
      redirect('/canvas/new')
    }
  })

  // Only animates when the canvas is visible
  useEffect(() => {
    if (!canvas) return
    if (!rive) return
    const canvasTop = canvas.getBoundingClientRect().top + windowScroll.y
    const canvasHeight = canvas.getBoundingClientRect().height
    const isFullyVisible = windowScroll.y + window.innerHeight > canvasTop + canvasHeight
    if (isFullyVisible && rive.isPaused) {
      rive.play()
    } else if (!isFullyVisible && !rive.isPaused) {
      rive.pause()
    }
  }, [windowScroll])

  return (
    <FeatureWrapper id="feature-simulate">
      <FeatureTag className="text-indigo-800">SIMULATE</FeatureTag>
      <FeatureTitle>Build and simulate circuits</FeatureTitle>
      <FeatureDescription>Using our modern and easy to use canvas, you can build, test, and simulate logic circuits.</FeatureDescription>

      {/* <div className="bg-neutralgrey-100 mt-8 aspect-video w-2/3 rounded-lg"></div> */}
      <CanvasDemo className="mb-6 aspect-[582/286] w-full max-w-[582px] sm:mb-0" />

      <button
        ref={buttonRef}
        className="shadow-hard-2xs rounded-md border border-indigo-900/50 bg-indigo-800 px-3 py-1.5 text-sm text-white transition hover:scale-105 hover:border-indigo-900"
      >
        Create Your First Canvas
        <kbd className="ml-2 hidden rounded-[3px] bg-white/10 px-1 py-px font-mono text-xs transition md:inline">C</kbd>
      </button>
    </FeatureWrapper>
  )
}
