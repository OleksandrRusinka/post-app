'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Accordion, AccordionItem } from '@heroui/accordion'

import { IFaqsListQuestion } from './constants'

// interface
interface IProps {}

// component
const FaqsQuestionsComponent: FC<IProps> = () => {
  const t = useTranslations()

  // return
  return (
    <div id='faqs-questions' className='relative z-0 w-full py-6 md:py-10'>

      <section className='relative mx-auto w-full gap-6 text-left lg:grid lg:grid-cols-[1fr_4fr] lg:gap-14'>

        <h2 className='text-[28px] font-semibold text-[#2B2D42] max-lg:text-center md:mb-8 md:text-[39px] lg:max-w-[200px]'>
          <span className='inline-block'>{t('home_page_faq_header')}</span>

        </h2>

        <Accordion
          fullWidth
          keepContentMounted
          className='px-0 pt-4 max-md:gap-0'
          itemClasses={{
            base: 'md:px-5 shadow-none bg-transparent border-b-1 border-[#E5EBFA] rounded-none',
            title: 'font-semibold',
            trigger: 'py-6',
            content: 'pt-0 pb-6 text-sm md:text-base text-[#444F69]',
            indicator: 'text-lg text-[#2B2D42]',
          }}
          items={IFaqsListQuestion()}
          selectionMode='multiple'
          variant='splitted'
        >

          {IFaqsListQuestion().map((item) => (
            <AccordionItem
              key={item.id}
              classNames={{
                title: 'font-medium text-[#2B2D42] md:text-lg',
                content: 'text-[#444F69] max-md:text-sm pt-0 pb-[18px]',
                trigger: 'py-[18px]',
              }}
              className='text-left'
              title={item.question}
            >
              <p>{item.answer}</p>

            </AccordionItem>
          ))}
        </Accordion>

      </section>

      <div className={'absolute top-0 -left-1/2 z-[-1] h-full w-[200vw] bg-[#F6FBFF]'} />
    </div>
  )
}

export default FaqsQuestionsComponent
