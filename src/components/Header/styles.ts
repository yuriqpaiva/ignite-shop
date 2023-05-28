import { styled } from '@/styles';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  '.fullCart': {
    svg: {
      color: '$white',
    },
  },

  '.emptyCart': {
    svg: {
      color: '$gray400',
    },
  },

  button: {
    position: 'relative',
    backgroundColor: '$gray800',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '0.75rem',
    cursor: 'pointer',
    height: 48,

    span: {
      position: 'absolute',
      boxSizing: 'content-box',
      top: -12,
      right: -12,
      border: '3px solid $gray900',
      fontWeight: 'bold',
      height: 24,
      width: 24,
      borderRadius: '100%',
      backgroundColor: '$green500',
      fontSize: '0.875rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '&:hover': {
      svg: {
        fill: '$white',
      },
    },
  },
});
