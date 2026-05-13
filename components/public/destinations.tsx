"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

type DestinationsContent = HomePageContent["destinations"]

export function Destinations({ content }: { content?: DestinationsContent }) {
  const destinations = content?.items ?? homeDefaultContent.destinations.items
  const eyebrow = content?.eyebrow ?? homeDefaultContent.destinations.eyebrow
  const title = content?.title ?? homeDefaultContent.destinations.title
  const viewAllLabel = content?.viewAllLabel ?? homeDefaultContent.destinations.viewAllLabel
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: destinations.length > 3 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return

    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    updateCarouselState()
    emblaApi.on("select", updateCarouselState)
    emblaApi.on("reInit", updateCarouselState)

    return () => {
      emblaApi.off("select", updateCarouselState)
      emblaApi.off("reInit", updateCarouselState)
    }
  }, [emblaApi, updateCarouselState])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-blue-950"
            >
              {title}
            </motion.h2>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Show previous destinations"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Show next destinations"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-blue-950 text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {destinations.map((destination, index) => (
              <div key={destination.name} className="min-w-0 flex-[0_0_88%] pl-6 sm:flex-[0_0_48%] lg:flex-[0_0_31%] xl:flex-[0_0_24%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[400px] overflow-hidden rounded-3xl shadow-lg"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 88vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold">{destination.name}</h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Show destination slide ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index ? "w-8 bg-blue-950" : "w-2 bg-blue-100 hover:bg-blue-200"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/destinations" className="text-blue-600 font-bold hover:underline">
            {viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
