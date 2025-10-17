'use client'

import Image from 'next/image'
import { type FC } from 'react'

import { socialsNetwork } from '@/shared/constants'

// interface
interface IProps {}

// component
export const FooterLogoComponent: FC<Readonly<IProps>> = () => {

  //return
  return (
    <div className='flex flex-col justify-start gap-6'>
      <Image src='/images/main-logo.svg' alt='Main logo' width={108} height={31} className='brightness-0 invert' />

      <ul className='flex gap-4'>
        {socialsNetwork.map((social) => (
          <li key={social.name}>
            <a
              href={social.link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Visit our ${social.name}`}
              className='text-white'
            >
              <Image src={social.src} alt={social.name} width={24} height={24} className='invert' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLogoComponent
