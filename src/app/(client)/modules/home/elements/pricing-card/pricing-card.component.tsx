'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'

// interfaces
interface IProps {
  plan: {
    id: number
    title: string
    price: string
    period: string
    features: string[]
  }
}

// component
const PricingCardComponent: FC<Readonly<IProps>> = ({ plan }) => {
  const t = useTranslations()

  // return
  return (
    <Card
      className='max-w-[362px] border border-gray-100 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg'
      shadow='md'
    >

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

              <Check className='text-primary mt-0.5 shrink-0' width={18} />

              <span className='text-default-600 text-sm'>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter>
        <Button
          fullWidth
          onPress={() => {}}
          className='text-medium h-[42px] w-full gap-3 bg-[#0D766E] text-white'
          size='md'
          radius='sm'
          variant='shadow'
        >
          Почати
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PricingCardComponent
