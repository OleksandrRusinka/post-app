import { useTranslations } from 'next-intl'

export const useFaqsListQuestion = () => {
  const t = useTranslations()

  return [
    { id: 1, question: t('home_page_faq_question_1'), answer: t('home_page_faq_answer_2') },
    { id: 2, question: t('home_page_faq_question_2'), answer: t('home_page_faq_answer_3') },
    { id: 3, question: t('home_page_faq_question_3'), answer: t('home_page_faq_answer_4') },
    { id: 4, question: t('home_page_faq_question_4'), answer: t('home_page_faq_answer_5') },
    { id: 5, question: t('home_page_faq_question_5'), answer: t('home_page_faq_answer_6') },
  ]
}
