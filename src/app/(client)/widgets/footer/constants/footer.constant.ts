export const FOOTER_LEGAL_LINKS = [
  'Політика конфіденційності',
  'Умови та положення',
  'Політика щодо файлів cookie',
  'Політика відшкодування',
] as const

export const FOOTER_ABOUT_LINKS = ['Довідковий центр', 'Блог', 'Відгуки', 'Ціни'] as const

export const FOOTER_PAYMENT_METHODS = [
  { src: '/images/payment-methods/visa-card.svg', alt: 'Visa card' },
  { src: '/images/payment-methods/master-card.svg', alt: 'Mastercard' },
  { src: '/images/payment-methods/paypal.svg', alt: 'PayPal' },
  { src: '/images/payment-methods/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/images/payment-methods/google-pay.svg', alt: 'Google Pay' },
] as const

export const FOOTER_SECTIONS = {
  support: {
    title: 'Служба підтримки',
    cancelSubscription: 'Як скасувати підписку',
    support247: 'Служба підтримки',
    availability: '24/7/365',
  },
  legal: {
    title: 'Юридичні',
  },
  about: {
    title: 'Про нас',
  },
  copyright:
    'Авторське право © 2024-2025 myIQ™. Усі права захищено. Усі торгові марки, згадані тут, є власністю їхніх відповідних власників.',
} as const
