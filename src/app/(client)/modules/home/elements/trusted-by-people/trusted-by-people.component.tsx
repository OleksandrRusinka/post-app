'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useRef, useState } from 'react'

import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'

import { trustedByPeopleCards } from './constants/trusted-by-people.constant'

// interface
interface IProps {}

// component
const TrustedByPeopleComponent: FC<IProps> = () => {
  const t = useTranslations()

  const cards = trustedByPeopleCards()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [showNavigation, setShowNavigation] = useState(false)

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current
        setShowNavigation(scrollWidth > clientWidth)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)

    return () => window.removeEventListener('resize', checkScrollable)
  }, [cards.length])

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300
      const gap = 16
      scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300
      const gap = 16
      scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' })
    }
  }

  // return
  return (
    <section id='trusted-by-people' className='relative py-6 md:py-10'>
      <h3 className='text-center text-[28px] font-semibold text-[#2C3345] lg:text-[39px]'>
        {t('home_page_trusted_by_people_header')}
      </h3>

      <div className='relative mt-6'>
        {showNavigation && (
          <>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              onClick={scrollLeft}
              className='absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white shadow-md lg:left-4'
            >
              <ChevronLeft className='size-4 text-[#2C3345] sm:size-5' />
            </Button>

            <Button
              isIconOnly
              size='sm'
              variant='light'
              onClick={scrollRight}
              className='absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white shadow-md lg:right-4'
            >
              <ChevronRight className='size-4 text-[#2C3345] sm:size-5' />
            </Button>
          </>
        )}

        <div
          ref={scrollRef}
          className='scrollbar-hide flex w-full gap-3 overflow-x-auto scroll-smooth px-3 pb-4 sm:gap-4 sm:px-4 lg:px-14'
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className='scroll-snap-align-start w-[85vw] flex-shrink-0 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]'
            >
              <Card
                shadow='sm'
                className='flex h-full flex-col border border-[#E2E8F0] p-2 transition-all hover:shadow-md sm:p-3'
              >
                <CardHeader className='flex flex-none flex-col items-start pb-1 sm:pb-2'>
                  <div className='flex justify-start gap-2'>
                    <p className='text-xs font-semibold sm:text-sm'>{card.name}</p>

                    <div className='flex items-center gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='size-3 fill-yellow-400 text-yellow-400 sm:size-4'
                          fill='currentColor'
                        />
                      ))}
                    </div>
                  </div>

                  <span className='text-[10px] text-gray-500 sm:text-xs'>{card.timeAgo}</span>
                </CardHeader>

                <CardBody className='flex-1 py-0'>
                  <p className='line-clamp-3 text-xs leading-relaxed text-[#2C3345] sm:text-sm'>{card.description}</p>
                </CardBody>

                <CardFooter className='flex flex-none justify-end px-1 pt-2 text-[10px] text-gray-500 sm:px-2 sm:pt-3 sm:text-xs'>
                  {card.location}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className='absolute right-0 -bottom-6 sm:-bottom-8 md:right-4 lg:right-8'>
          <Image
            src='/images/reviews-io.svg'
            alt='reviews-io'
            width={80}
            height={40}
            className='h-8 w-20 sm:h-10 sm:w-24 md:h-12 md:w-28 lg:h-14 lg:w-32'
          />
        </div>
      </div>
    </section>
  )
}

export default TrustedByPeopleComponent
