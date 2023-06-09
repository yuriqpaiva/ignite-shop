import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,

  '.arrowButton': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    background:
      'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
    width: 100,
    border: 0,
    svg: {
      rotate: '180deg',
      color: '$white',
    },

    button: {
      cursor: 'pointer',
      marginRight: '1rem',
      backgroundColor: 'transparent',
      border: 0,
    },
  },

  '.right': {
    right: 0,
    transform: 'none',
  },
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    strong: {
      marginBottom: '0.25rem',
      color: '$gray100',
      fontSize: '$lg',
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 1,
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    button: {
      lineHeight: 0,
      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '0.75rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
});
