import { useTranslations } from 'next-intl'

export const IHowItWorksCards = (t: ReturnType<typeof useTranslations>) => {
  return [
    {
      icon: '/icons/task.svg',
      title: t('how_it_works_cards_title_1'),
      description: t('how_it_works_cards_description_1'),

      id: 1,
    },
    {
      icon: '/icons/zvit.svg',
      title: t('how_it_works_cards_title_2'),
      description: t('how_it_works_cards_description_2'),

      id: 2,
    },
    {
      icon: '/icons/rocket.svg',
      title: t('how_it_works_cards_title_3'),
      description: t('how_it_works_cards_description_3'),

      id: 3,
    },
  ]
}
