import { useTranslations } from 'next-intl'

export const DiiffText = (t: ReturnType<typeof useTranslations>) => [
  { id: 1, text: t('home_page_what_you_get_1') },
  { id: 2, text: t('home_page_what_you_get_2') },
  { id: 3, text: t('home_page_what_you_get_3') },
  { id: 4, text: t('home_page_what_you_get_4') },
  { id: 5, text: t('home_page_what_you_get_5') },
]
