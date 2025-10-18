import {
  ApplePayIcon,
  GooglePayIcon,
  MasterCardIcon,
  PayPalIcon,
  VisaCardIcon,
} from '@/shared/assets/icons/payment-methods'

export const FOOTER_LEGAL_LINKS = [
  'Політика конфіденційності',
  'Умови та положення',
  'Політика щодо файлів cookie',
  'Політика відшкодування',
] as const

export const FOOTER_ABOUT_LINKS = ['Довідковий центр', 'Блог', 'Відгуки', 'Ціни'] as const

export const FOOTER_PAYMENT_METHODS = [
  { icon: <VisaCardIcon />, alt: 'Visa card' },
  { icon: <MasterCardIcon />, alt: 'Mastercard' },
  { icon: <PayPalIcon />, alt: 'PayPal' },
  { icon: <ApplePayIcon />, alt: 'Apple Pay' },
  { icon: <GooglePayIcon />, alt: 'Google Pay' },
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
