import { useTranslations } from 'next-intl'

import {
  AvailableTestsBrainIcon,
  AvailableTestsCareerIcon,
  AvailableTestsLoveStyleIcon,
  AvailableTestsTypeIcon,
} from '@/shared/assets/icons/available-tests'

export const IAvailableTests = (t: ReturnType<typeof useTranslations>) => [
  {
    id: 1,
    icon: <AvailableTestsBrainIcon />,
    title: t('home_page_available_tests_title_1'),
    time: '15 хв',
    questions: '25 питань',

    buttonText: t('home_page_available_tests_button_text_1'),
    button: { isDisabled: false },
  },

  {
    id: 2,
    icon: <AvailableTestsTypeIcon />,
    title: t('home_page_available_tests_title_2'),
    time: '20 хв',
    questions: '90 питань',

    buttonText: t('home_page_available_tests_button_text_2'),
    button: { isDisabled: false },
  },

  {
    id: 3,
    icon: <AvailableTestsLoveStyleIcon />,
    title: t('home_page_available_tests_title_4'),
    time: '30 хв',
    questions: '120 питань',

    buttonText: t('home_page_available_tests_button_text_4'),
    button: { isDisabled: false },
  },
  {
    id: 4,
    icon: <AvailableTestsCareerIcon />,
    title: t('home_page_available_tests_title_3'),
    time: '25 хв',
    questions: '35 питань',

    buttonText: t('home_page_available_tests_button_text_3'),
    button: { isDisabled: true },
  },
]
