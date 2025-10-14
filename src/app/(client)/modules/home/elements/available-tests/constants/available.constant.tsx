import { useTranslations } from 'next-intl'

export const availableTestsCards = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: '/images/availableTest-Brain.svg',
    title: t('home_page_available_tests_title_1'),
    id: 1,
    buttonText: t('home_page_available_tests_button_text_1'),
  },
  {
    icon: '/images/availableTest-type.svg',
    title: t('home_page_available_tests_title_2'),

    id: 2,
    buttonText: t('home_page_available_tests_button_text_2'),
  },
  {
    icon: '/images/availbletest-loveStyle.svg',
    title: t('home_page_available_tests_title_4'),

    id: 4,
    buttonText: t('home_page_available_tests_button_text_4'),
  },
  {
    icon: '/images/availbleTest-Career.svg',
    title: t('home_page_available_tests_title_3'),

    id: 3,
    buttonText: t('home_page_available_tests_button_text_3'),
  },
]
