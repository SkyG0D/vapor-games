import { extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

export const theme = extendTheme({
  colors: {
    action: {
      500: '#48b80f',
      600: '#235c07',
    },
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('#ffffff', '#121212')(props),
        transition: 'background 0.2s',
      },
    }),
  },
});
