import { EB_Garamond, Source_Sans_3, Montserrat } from 'next/font/google'

export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--sans',
  weight: ['300', '400', '600'],
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--label',
  weight: ['500', '600', '700'],
})
