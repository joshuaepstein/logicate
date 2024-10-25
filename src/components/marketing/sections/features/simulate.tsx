'use client'

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas'
import { useInView } from 'framer-motion'
import { redirect } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useWindowScroll } from 'react-use'

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
    <section id="feature-simulate" className="bg-neutralgrey-200 flex min-h-[25dvh] w-full scroll-mt-16 items-center justify-center py-12">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-2xs scale-100 select-none font-mono font-medium text-indigo-800 transition hover:scale-105">SIMULATE</p>
        <h4 className="text-neutralgrey-1200 mt-2 text-center text-2xl font-medium">Build and simulate circuits</h4>
        <p className="text-neutralgrey-1000/85 mt-2 max-w-lg text-center">
          Using our modern and easy to use canvas, you can build, test, and simulate logic circuits.
        </p>

        {/* <div className="bg-neutralgrey-100 mt-8 aspect-video w-2/3 rounded-lg"></div> */}
        <CanvasDemo className="aspect-video h-full max-h-[286px] w-full max-w-[582px]" />

        <button
          ref={buttonRef}
          className="shadow-hard-2xs rounded-md border border-indigo-900/50 bg-indigo-800 px-3 py-1.5 text-sm text-white transition hover:scale-105 hover:border-indigo-900"
        >
          Create Your First Canvas
          <kbd className="ml-2 rounded-[3px] bg-white/10 px-1 py-px font-mono text-xs transition">C</kbd>
        </button>
      </div>
    </section>
  )
}
