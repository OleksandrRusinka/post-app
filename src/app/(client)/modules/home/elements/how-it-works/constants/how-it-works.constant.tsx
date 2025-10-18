import { useTranslations } from 'next-intl'

import { RocketIcon, TaskIcon, ZvitIcon } from '@/shared/assets/icons/how-it-works'

export const IHowItWorksCards = (t: ReturnType<typeof useTranslations>) => {
  return [
    {
      icon: <TaskIcon />,
      title: t('how_it_works_cards_title_1'),
      description: t('how_it_works_cards_description_1'),

      id: 1,
    },
    {
      icon: <ZvitIcon />,
      title: t('how_it_works_cards_title_2'),
      description: t('how_it_works_cards_description_2'),

      id: 2,
    },
    {
      icon: <RocketIcon />,
      title: t('how_it_works_cards_title_3'),
      description: t('how_it_works_cards_description_3'),

      id: 3,
    },
  ]
}
