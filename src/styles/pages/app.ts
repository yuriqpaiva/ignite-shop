import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
});

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  button: {
    backgroundColor: '$gray800',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '0.75rem',
    cursor: 'pointer',
    height: 48,

    svg: {
      fill: '$gray400',
    },

    '&:hover': {
      svg: {
        fill: '$white',
      },
    },
  },
});
