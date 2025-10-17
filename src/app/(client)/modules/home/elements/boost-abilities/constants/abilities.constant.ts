import { useTranslations } from 'next-intl'

export const IAbilities = (t: ReturnType<typeof useTranslations>) => {
  return [
    {
      id: 1,
      title: t('home_page_boost_abilities_title_1'),
      cases: [
        {
          text: t('home_page_boost_abilities_subtitle_1_1'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_1_2'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_1_3'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_1_4'),
        },
      ],
    },
    {
      id: 2,
      title: t('home_page_boost_abilities_title_2'),
      cases: [
        {
          text: t('home_page_boost_abilities_subtitle_2_1'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_2_2'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_2_3'),
        },
      ],
    },
    {
      id: 3,
      title: t('home_page_boost_abilities_title_3'),
      cases: [
        {
          text: t('home_page_boost_abilities_subtitle_3_1'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_3_2'),
        },
        {
          text: t('home_page_boost_abilities_subtitle_3_3'),
        },
      ],
    },
  ]
}
