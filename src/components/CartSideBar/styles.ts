import { styled } from '@/styles';

export const CartSideBarContainer = styled('aside', {
  position: 'fixed',
  right: 0,
  top: 0,
  height: '100vh',
  width: 480,
  backgroundColor: '$gray800',
  zIndex: 999,
  transform: 'translateX(100%)',
  transition: 'transform 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem 1.5rem 3rem 3rem',
  boxShadow: 'box-shadow: -4px 0px 30px rgba(0, 0, 0, 0.8)',

  '&.showCart': {
    transform: 'translateX(0)',
  },

  button: {
    marginLeft: 'auto',
    svg: {
      fill: '$gray400',
    },
  },

  h3: {
    marginTop: '1.5rem',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$gray100',
  },

  ul: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',

    li: {
      display: 'flex',
      gap: '1.25rem',
      height: 94,

      img: {
        width: 102,
        height: 93,
        borderRadius: 8,
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      },

      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        span: {
          color: '$gray300',
          fontSize: '$md',
          display: 'block',
          marginBottom: '0.125rem',
        },
        strong: {
          color: '$gray100',
          fontWeight: 'bold',
          fontSize: '$md',
          display: 'block',
          marginBottom: '0.5rem',
        },
        button: {
          height: 26,
          padding: 0,
          fontWeight: 'bold',
          color: '$green500',
          backgroundColor: 'transparent',

          '&:hover': {
            color: '$green300',
          },
        },
      },
    },
  },
});

export const CartSummary = styled('div', {
  marginTop: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '.quantityContainer': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',

    span: {
      color: '$gray100',
    },

    strong: {
      color: '$gray300',
      fontSize: '$md',
    },
  },

  '.totalValueContainer': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',

    span: {
      color: '$gray100',
      fontSize: '$md',
      fontWeight: 'bold',
    },

    strong: {
      color: '$gray100',
      fontSize: '$xl',
      fontWeight: 'bold',
    },
  },

  button: {
    marginTop: '3.5rem',
    width: '100%',
    padding: '1.25rem',
    height: 69,
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
});
