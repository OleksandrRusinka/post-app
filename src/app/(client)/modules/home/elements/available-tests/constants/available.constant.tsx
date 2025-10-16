import { useTranslations } from 'next-intl'

export const IAvailableTests = (t: ReturnType<typeof useTranslations>) => [
  {
    id: 1,
    icon: '/images/available-tests/availableTest-Brain.svg',
    title: t('home_page_available_tests_title_1'),

    buttonText: t('home_page_available_tests_button_text_1'),
  },
  {
    id: 2,
    icon: '/images/available-tests/availableTest-type.svg',
    title: t('home_page_available_tests_title_2'),

    buttonText: t('home_page_available_tests_button_text_2'),
  },

  {
    id: 3,
    icon: '/images/available-tests/availbletest-loveStyle.svg',
    title: t('home_page_available_tests_title_4'),

    buttonText: t('home_page_available_tests_button_text_4'),
  },
  {
    id: 4,
    icon: '/images/available-tests/availbleTest-Career.svg',
    title: t('home_page_available_tests_title_3'),

    buttonText: t('home_page_available_tests_button_text_3'),
  },
]
