import Image from 'next/image'
import React, { FC } from 'react'

import { cn } from '@heroui/react'

import { StarIconComponent } from '@/shared/ui/star-icon'

import { IPeopleReviewsAvatars } from './constants/people-reviews.constant'

// interface
interface IProps {}

// component
const PeopleReviewsComponent: FC<IProps> = () => {
  // return
  return (
    <div className='mt-[11px] flex items-center md:mt-4'>
      <div className='relative mr-6 flex md:mr-12'>

        {IPeopleReviewsAvatars.map((avatar, index) => (
          <div
            key={index}
            className={cn(
              'relative h-10 w-10 overflow-hidden rounded-full border-3 border-white md:h-[50px] md:w-[50px] md:border-4',
              index > 0 && '-ml-5 md:-ml-6',
              index === 3 && 'max-md:hidden',
            )}
          >

            <Image
              src={avatar.icon}
              alt='people-reviews'
              fill
              className='pointer-events-none object-cover'
              sizes='40px'
            />
          </div>
        ))}
      </div>

      <div className='text-base-dark -ml-4 flex flex-col text-[14px] md:-ml-8 md:text-[16px]'>
        <div className='flex flex-wrap max-md:flex-col md:items-center md:gap-1'>
          <p>Відмінні відгуки користувачів</p>

          <div className='flex max-md:mt-1'>
            <StarIconComponent />
            <StarIconComponent />
            <StarIconComponent />
            <StarIconComponent />
            <StarIconComponent />
          </div>
        </div>

        <p>
          <span className='font-semibold'>12024</span> IQ тестів пройдено сьогодні!
        </p>
      </div>
    </div>
  )
}

export default PeopleReviewsComponent
