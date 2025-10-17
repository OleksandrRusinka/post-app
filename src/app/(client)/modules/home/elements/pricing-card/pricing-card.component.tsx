'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'

import { CheckIcon } from '@/shared/ui/check-icon'

import { IPlan } from './interface'

// interfaces
interface IProps {
  plan: IPlan
}

// component
const PricingCardComponent: FC<Readonly<IProps>> = (props) => {
  const { plan } = props

  const t = useTranslations()

  // return
  return (
    <Card className='max-w-[362px] border border-gray-100 p-6 transition-all duration-300 hover:scale-105' shadow='md'>

      <CardHeader className='flex flex-col items-start gap-2 pb-4'>
        <h2 className='text-large font-medium'>{plan.title}</h2>

      </CardHeader>

      <Divider />

      <CardBody className='gap-6 py-4'>
        <div className='flex items-baseline gap-1'>
          <span className='text-foreground inline text-4xl leading-7 font-semibold'>{plan.price}</span>

          <span className='text-default-400 text-small font-medium'>/{plan.period}</span>
        </div>

        <ul className='flex flex-col gap-3'>
          {plan.features.map((feature, index) => (
            <li key={index} className='flex items-start gap-2'>

              <CheckIcon width={24} className='text-blue-600' />

              <span className='text-default-600 text-sm'>{feature}</span>

            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter>
        
        <Button onPress={() => {}} className='text-medium bg-primary h-[42px] w-full gap-3 text-white'>
          Почати
        </Button>

      </CardFooter>
    </Card>
  )
}

export default PricingCardComponent
