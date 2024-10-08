import tailwindTypography from '@tailwindcss/typography'
import tailwindScrollbar from 'tailwind-scrollbar'
import { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [
    tailwindTypography,
    tailwindScrollbar,
    tailwindAnimate,
    addVariablesForColors,
    require('tailwind-scrollbar-hide'),
    require('@igorkowalczyk/is-browser'),
    require('tailwindcss-inner-border'),
    require('@tailwindcss/forms'),
    require('tailwindcss-motion'),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    boxShadow: {
      'hard-2xs': '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 2px 7px 0px rgba(10, 9, 11, 0.05), 0px 2px 5px -2px rgba(10, 9, 11, 0.06)',
      'hard-xs': '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 2px 2px -1px rgba(10, 9, 11, 0.04), 0px 2px 12px -1px rgba(10, 9, 11, 0.10)',
      'hard-sm': '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 6px 16px 0px rgba(10, 9, 11, 0.08)',
      'hard-md': '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 0px 3px -1px rgba(10, 9, 11, 0.04), 0px 16px 24px -6px rgba(10, 9, 11, 0.08)',
      'hard-lg': '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 0px 3px -1px rgba(10, 9, 11, 0.04), 0px 27px 30px -15px rgba(10, 9, 11, 0.13)',

      'soft-2xs': '0px 1.5px 4px -1px #0A090B12',
      'soft-xs': '0px 2px 4px -1px #0A090B05, 0px 5px 13px -5px #0A090B0D',
      'soft-sm': '0px 10px 18px -2px #0A090B12',
      'soft-md': '0px 0px 3px -1px #0A090B0A, 0px 11px 24px -9px #0A090B24',
      'soft-lg': '0px 0px 3px -1px #0A090B0A, 0px 32px 33px -15px #0A090B2B',

      // hard-soft should have the border which comes with the hard shadow but a soft shadow underneath it
      'hard-soft-2xs':
        '0px 0px 0px 1px rgba(10, 0, 11, 0.05), 0px 2px 5px 0px rgba(10, 9, 11, 0.025), 0px 2px 5px -2px rgba(10, 9, 11, 0.01)',

      button:
        '0px 0px 0px 1px rgba(10, 9, 11, 0.05), 0px 2px 2px -1px rgba(10, 9, 11, 0.04), 0px 2px 12px -1px rgba(10, 9, 11, 0.10), 0 0 14px 0 hsla(0,0%,100%,.19), inset 0 -2px 2px 0 rgba(0,0,0,.2), inset 0 2px 2px 0 #ffffff50',

      'checkbox-default': '0px 0px 0px 1px #17253829, 0px 1.5px 2px 0px #17253829',

      none: 'none',
    },
    fontSize: {
      '3xs': [
        '10px',
        {
          lineHeight: '12px',
        },
      ],
      '2xs': [
        '12px',
        {
          lineHeight: '18px',
        },
      ],
      xs: [
        '13px',
        {
          lineHeight: '18px',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: '20px',
          letterSpacing: '-0.05px',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '-0.18px',
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '24px',
          letterSpacing: '-0.26px',
        },
      ],
      xl: [
        '20px',
        {
          lineHeight: '28px',
          letterSpacing: '-2%',
        },
      ],
      '2xl': [
        '24px',
        {
          lineHeight: '32px',
          letterSpacing: '-3%',
        },
      ],
      '3xl': [
        '32px',
        {
          lineHeight: '40px',
          letterSpacing: '-3%',
        },
      ],
      '4xl': [
        '36px',
        {
          lineHeight: '44px',
          letterSpacing: '-3%',
        },
      ],
      '5xl': [
        '48px',
        {
          lineHeight: '72px',
          letterSpacing: '-3%',
        },
      ],
      '6xl': [
        '60px',
        {
          lineHeight: '90px',
          letterSpacing: '-3%',
        },
      ],
      '7xl': [
        '72px',
        {
          lineHeight: '108px',
          letterSpacing: '-3%',
        },
      ],
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      base: {
        white: '#FFFFFF',
        background: '#F9F9F9',
      },
      neutralgrey: {
        100: '#FDFDFD',
        200: '#F8F8F8',
        300: '#F1F1F1',
        400: '#ECECEC',
        500: '#E6E6E6',
        600: '#DCDCDC',
        700: '#C9C9CC',
        800: '#ADACB0',
        900: '#A3A2A6',
        1000: '#4F4D55',
        1100: '#2D2B32',
        1200: '#1D1C20',
        1300: '#0A090B',
      },
      coolgrey: {
        100: '#FAFBFC',
        200: '#EFF0F2',
        300: '#DCDEE3',
        400: '#C7CAD1',
        500: '#AEB2BC',
        600: '#9499A5',
        700: '#7F8493',
        800: '#6B7180',
        900: '#595E6A',
        1000: '#474B55',
        1100: '#363840',
        1200: '#24262B',
        1300: '#121315',
      },
      flatgrey: {
        100: '#FCFCFC',
        200: '#F5F5F5',
        300: '#EFEFEF',
        400: '#E1E1E1',
        500: '#CCCCCC',
        600: '#B3B3B3',
        700: '#9E9E9E',
        800: '#959595',
        900: '#656565',
        1000: '#383838',
        1100: '#1D1D1D',
        1200: '#101010',
        1300: '#040404',
      },
      brightgrey: {
        100: '#FDFDFD',
        200: '#F9F9F9',
        300: '#EFEFEF',
        400: '#DBDBD9',
        500: '#C2C2BF',
        600: '#B3B3B3',
        700: '#9E9E9E',
        800: '#959595',
        900: '#656565',
        1000: '#383838',
        1100: '#1D1D1D',
        1200: '#101010',
        1300: '#040404',
      },

      blue: {
        100: '#FDFDFF',
        200: '#FAFBFE',
        300: '#EBF0FB',
        400: '#d6e0f7',
        500: '#b8caf2',
        600: '#94b0ec',
        700: '#6c92e4',
        800: '#4272dd',
        900: '#1751D0',
        1000: '#113B98',
        1100: '#0C296A',
        1200: '#081b45',
        1300: '#051029',
      },
      indigo: {
        100: '#F3FAFF',
        200: '#DEF1FF',
        300: '#BEE4FF',
        400: '#98D4FF',
        500: '#74C4FF',
        600: '#48AFFA',
        700: '#0A8FEF',
        800: '#0279CF',
        900: '#0063AA',
        1000: '#00538E',
        1100: '#003D69',
        1200: '#04385C',
        1300: '#022035',
      },
      teal: {
        100: '#F3FAFC',
        200: '#DFF1F7',
        300: '#B8DEE9',
        400: '#93CBDC',
        500: '#6CB6CD',
        600: '#45A2BE',
        700: '#1383A5',
        800: '#007092',
        900: '#005D7A',
        1000: '#004B61',
        1100: '#003849',
        1200: '#002531',
        1300: '#000C10',
      },
      poolBlue: {
        100: '#F1FAF9',
        200: '#E9F7F5',
        300: '#D2EEEB',
        400: '#BCE6E1',
        500: '#A6DED8',
        600: '#8FD5CE',
        700: '#79CDC4',
        800: '#66BAB0',
        900: '#559B93',
        1000: '#447C76',
        1100: '#335D58',
        1200: '#223E3B',
        1300: '#051311',
      },
      green: {
        100: '#EBFBF1',
        200: '#E1FAEA',
        300: '#C1F4D4',
        400: '#91DDAD',
        500: '#63C888',
        600: '#3BBA6A',
        700: '#14AD4D',
        800: '#019939',
        900: '#018030',
        1000: '#016626',
        1100: '#004D1D',
        1200: '#102A19',
        1300: '#001A0A',
      },
      forest: {
        100: '#F5FBF1',
        200: '#E9F3E3',
        300: '#D3E7C8',
        400: '#BDDBAC',
        500: '#A7CE91',
        600: '#91C275',
        700: '#7BB65A',
        800: '#67A346',
        900: '#56883B',
        1000: '#456C2F',
        1100: '#345123',
        1200: '#223617',
        1300: '#111B0C',
      },
      squash: {
        100: '#FFF6E7',
        200: '#FFF1DA',
        300: '#FFE9BA',
        400: '#FFD58F',
        500: '#FFC76A',
        600: '#FFB945',
        700: '#FFAB1F',
        800: '#EC980C',
        900: '#C47E0A',
        1000: '#9D6508',
        1100: '#764C06',
        1200: '#4F3304',
        1300: '#271902',
      },
      orange: {
        100: '#FFF2ED',
        200: '#FFEBE2',
        300: '#FFD3C1',
        400: '#FFBA9F',
        500: '#FFA07C',
        600: '#FF8659',
        700: '#FF6B34',
        800: '#F25219',
        900: '#C44518',
        1000: '#9D3713',
        1100: '#762A0E',
        1200: '#4F1C0A',
        1300: '#270E05',
      },
      red: {
        100: '#FEEBEB',
        200: '#FFE3E3',
        300: '#FFC9C9',
        400: '#FAA4A4',
        500: '#FF7F7F',
        600: '#F75656',
        700: '#F53535',
        800: '#E12121',
        900: '#BC1C1C',
        1000: '#961616',
        1100: '#711111',
        1200: '#4B0B0B',
        1300: '#260606',
      },
      maroon: {
        100: '#FAE9EF',
        200: '#F7DDE6',
        300: '#EFBCCD',
        400: '#E79AB4',
        500: '#E0789B',
        600: '#D85681',
        700: '#D85681',
        800: '#D03568',
        900: '#BC2155',
        1000: '#9D1C47',
        1100: '#7E1639',
        1200: '#5E112B',
        1300: '#3F0B1C',
      },
      magenta: {
        100: '#F9E9F3',
        200: '#F5DDED',
        300: '#EBBBDB',
        400: '#E199C9',
        500: '#D777B8',
        600: '#CD55A6',
        700: '#C33394',
        800: '#B01F80',
        900: '#921A6B',
        1000: '#751556',
        1100: '#581040',
        1200: '#3B0A2B',
        1300: '#1D0515',
      },
      purple: {
        100: '#FEF2FF',
        200: '#F0DFF4',
        300: '#E2BFE9',
        400: '#D39EDE',
        500: '#C47ED3',
        600: '#B65EC8',
        700: '#A73EBC',
        800: '#942BA9',
        900: '#7B238D',
        1000: '#631C71',
        1100: '#4A1555',
        1200: '#310E38',
        1300: '#19071C',
      },
      violet: {
        100: '#F1E9FB',
        200: '#EADEF9',
        300: '#D5BCF3',
        400: '#C09BED',
        500: '#AB79E8',
        600: '#9658E2',
        700: '#8136DC',
        800: '#6E23C9',
        900: '#5C1DA7',
        1000: '#491786',
        1100: '#371264',
        1200: '#250C43',
        1300: '#120621',
      },
      ultramarine: {
        100: '#F1ECFF',
        200: '#E6DFFF',
        300: '#CABCFF',
        400: '#A994F9',
        500: '#876AF2',
        600: '#633FE8',
        700: '#4318E3',
        800: '#3005D0',
        900: '#2804AD',
        1000: '#20038B',
        1100: '#180268',
        1200: '#100245',
        1300: '#080123',
      },

      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
        foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },

      celeste: {
        DEFAULT: '#aeecef',
        100: '#0e4245',
        200: '#1b848a',
        300: '#29c7cf',
        400: '#69dbe1',
        500: '#aeecef',
        600: '#bef0f2',
        700: '#cef3f5',
        800: '#dff7f9',
        900: '#effbfc',
      },
      non_photo_blue: {
        DEFAULT: '#86ced6',
        100: '#123034',
        200: '#236167',
        300: '#35919b',
        400: '#52b8c4',
        500: '#86ced6',
        600: '#9ed7de',
        700: '#b6e1e6',
        800: '#ceebee',
        900: '#e7f5f7',
      },
      moonstone: {
        DEFAULT: '#5db0bc',
        100: '#112428',
        200: '#21494f',
        300: '#326d77',
        400: '#42929e',
        500: '#5db0bc',
        600: '#7ebfc9',
        700: '#9ecfd6',
        800: '#bedfe4',
        900: '#dfeff1',
      },
      'blue_(munsell)': {
        DEFAULT: '#3592a3',
        100: '#0a1d20',
        200: '#153a41',
        300: '#1f5761',
        400: '#2a7481',
        500: '#3592a3',
        600: '#4cb3c5',
        700: '#79c6d4',
        800: '#a6d9e2',
        900: '#d2ecf1',
      },
      cerulean: {
        DEFAULT: '#0c7489',
        100: '#02171b',
        200: '#052e36',
        300: '#074552',
        400: '#095c6d',
        500: '#0c7489',
        600: '#12accb',
        700: '#37cfee',
        800: '#7adff3',
        900: '#bceff9',
      },
      midnight_green: {
        DEFAULT: '#095b69',
        100: '#021215',
        200: '#042429',
        300: '#05353e',
        400: '#074753',
        500: '#095b69',
        600: '#0f98b0',
        700: '#23ceec',
        800: '#6ddef2',
        900: '#b6eff9',
      },
      midnight_green2: {
        DEFAULT: '#064249',
        100: '#010d0e',
        200: '#021a1c',
        300: '#03272a',
        400: '#053339',
        500: '#064249',
        600: '#0c8997',
        700: '#13d2e7',
        800: '#5fe3f2',
        900: '#aff1f8',
      },
      night: {
        DEFAULT: '#000f08',
        100: '#000302',
        200: '#000603',
        300: '#000905',
        400: '#000c07',
        500: '#000f08',
        600: '#00723d',
        700: '#00d572',
        800: '#39ffa3',
        900: '#9cffd1',
      },
    },
    extend: {
      fontFamily: {
        default: [
          '-apple-system',
          'var(--font-geist-sans)',
          'system-ui',
          'sans-serif',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },

      keyframes: {
        strokedashoffset: {
          // 60 180 = 240
          // '0%': { 'stroke-dashoffset': '0' },
          // '100%': { 'stroke-dashoffset': '240' },
          '0%': {
            'stroke-dashoffset': '0',
          },
          '99%': {
            'stroke-dashoffset': '240',
          },
          '100%': {
            'stroke-dashoffset': '240',
          },
        },
        'spin-magic-i-star': {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Navigation menu
        'enter-from-right': {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'enter-from-left': {
          '0%': { transform: 'translateX(-200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'exit-to-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(200px)', opacity: '0' },
        },
        'exit-to-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-200px)', opacity: '0' },
        },
        'scale-in-content': {
          '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
        },
        'scale-out-content': {
          '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        // Custom wiggle animation
        wiggle: {
          '0%, 100%': {
            transform: 'translateX(0%)',
            transformOrigin: '50% 50%',
          },
          '15%': { transform: 'translateX(-4px) rotate(-4deg)' },
          '30%': { transform: 'translateX(6px) rotate(4deg)' },
          '45%': { transform: 'translateX(-6px) rotate(-2.4deg)' },
          '60%': { transform: 'translateX(2px) rotate(1.6deg)' },
          '75%': { transform: 'translateX(-1px) rotate(-0.8deg)' },
        },
        'slide-down-left-fade': {
          // should fade in from the top right corner
          '0%': {
            opacity: '0',
            transform: 'translate(2px, -2px) rotate(10deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(0, 0) rotate(0deg)',
          },
        },
        'slide-down-out-fade': {
          '0%': {
            opacity: '1',
            transform: 'translate(0, 0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-2px)',
          },
        },
        'change-object-location': {
          '0%': {
            'object-position': 'top',
          },
          '50%': {
            'object-position': 'bottom',
          },
          '100%': {
            'object-position': 'top',
          },
        },
        'change-object-to-top': {
          '0%': {},
          '100%': {
            'object-position': 'top',
          },
        },
        gauge_fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        gauge_fill: {
          from: { 'stroke-dashoffset': '332' },
          to: {},
        },
        gauge_fillWithOpacity: {
          from: { 'stroke-dashoffset': '332', opacity: '0' },
          to: { opacity: '1' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },

        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        slideRight: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        moveFromRight: {
          from: { right: '%100' },
          to: { right: '0%' },
        },
        moveToRight: {
          from: { right: '0%' },
          to: { right: '100%' },
        },
        smallZoomIn: {
          from: { transform: 'scale(0.98)', opacity: '0', filter: 'blur(2.5px) saturate(0)' },
          to: { transform: 'scale(1)', opacity: '1', filter: 'blur(0px) saturate(1)' },
        },
      },

      animation: {
        // strokedashoffset: 'strokedashoffset 1s linear infinite', <-- make go the other way
        strokedashoffset: 'strokedashoffset 1s linear infinite 0s reverse',
        'spin-magic-i-star': 'spin-magic-i-star 10s linear infinite',
        'spin-once': 'spin 0.6s ease-out 1',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        // Navigation menu
        'enter-from-right': 'enter-from-right 0.25s ease',
        'enter-from-left': 'enter-from-left 0.25s ease',
        'exit-to-right': 'exit-to-right 0.25s ease',
        'exit-to-left': 'exit-to-left 0.25s ease',
        'scale-in-content': 'scale-in-content 0.2s ease',
        'scale-out-content': 'scale-out-content 0.2s ease',
        'fade-in': 'fade-in 0.2s ease',
        'fade-out': 'fade-out 0.2s ease',
        // Custom wiggle animation
        wiggle: 'wiggle 0.75s infinite',
        'slide-down-left-fade': 'slide-down-left-fade 0.4s ease',
        'object-location': 'change-object-location 5s ease infinite',
        // hold object to top
        'object-to-top': 'change-object-to-top 0.4s ease',
        gauge_fadeIn: 'gauge_fadeIn 1s ease forwards',
        gauge_fill: 'gauge_fill 1s ease forwards',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',

        moveFromRight: 'moveFromRight 1000ms linear alternate infinite',
        moveToRight: 'moveToRight 1000ms linear alternate infinite',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        overlayShow: 'overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRight: 'slideRight 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        smallZoomIn: 'smallZoomIn 0.2s ease',
      },

      screens: {
        xs: '320px',

        desktop: '1440px',
        'desktop-sm': '1280px',
        tablet: '1024px',
        'tablet-sm': '428px',
      },

      // @ts-ignore type theme blah blah blah
      typography: ({ theme }) => ({
        neutralgrey: {
          css: {
            '--tw-prose-body': theme('colors.neutralgrey[1000]'),
            '--tw-prose-headings': theme('colors.neutralgrey[1100]'),
            '--tw-prose-lead': theme('colors.neutralgrey[900]'),
            '--tw-prose-links': theme('colors.neutralgrey[1000]'),
            '--tw-prose-bold': theme('colors.neutralgrey[1000]'),
            '--tw-prose-counters': theme('colors.neutralgrey[800]'),

            '--tw-prose-bullets': theme('colors.neutralgrey[600]'),
            '--tw-prose-hr': theme('colors.neutralgrey[500]'),
            '--tw-prose-quotes': theme('colors.neutralgrey[1100]'),
            '--tw-prose-quote-borders': theme('colors.neutralgrey[500]'),
            '--tw-prose-captions': theme('colors.neutralgrey[900]'),
            '--tw-prose-code': theme('colors.neutralgrey[1100]'),
            '--tw-prose-pre-code': theme('colors.neutralgrey[300]'),
            '--tw-prose-pre-bg': theme('colors.neutralgrey[1100]'),
            '--tw-prose-th-borders': theme('colors.neutralgrey[500]'),
            '--tw-prose-td-borders': theme('colors.neutralgrey[400]'),
            '--tw-prose-invert-body': theme('colors.neutralgrey[400]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.neutralgrey[500]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.neutralgrey[600]'),
            '--tw-prose-invert-bullets': theme('colors.neutralgrey[800]'),
            '--tw-prose-invert-hr': theme('colors.neutralgrey[900]'),
            '--tw-prose-invert-quotes': theme('colors.neutralgrey[300]'),
            '--tw-prose-invert-quote-borders': theme('colors.neutralgrey[900]'),
            '--tw-prose-invert-captions': theme('colors.neutralgrey[600]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.neutralgrey[500]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.neutralgrey[800]'),
            '--tw-prose-invert-td-borders': theme('colors.neutralgrey[900]'),
          },
        },
      }),
    },
  },
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}

export default config
