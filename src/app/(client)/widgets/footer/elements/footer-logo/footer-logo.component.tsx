'use client'

import { type FC } from 'react'

import { MainLogoIcon } from '@/shared/assets/icons'
import { ISocialNetworks } from '@/shared/constants'

// interface
interface IProps {}

// component
export const FooterLogoComponent: FC<Readonly<IProps>> = () => {
  //return
  return (
    <div className='flex flex-col justify-start gap-6'>
      <MainLogoIcon className='brightness-0 invert' />

      <ul className='flex gap-4'>
        {ISocialNetworks.map((social, index) => (

          <li key={index}>
            <a href={social.link} target='_blank' aria-label={` ${social.name}`} className='text-white'>

              <div className='size-[24px]'>{social.icon}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLogoComponent
