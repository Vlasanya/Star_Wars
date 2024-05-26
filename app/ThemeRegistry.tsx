import { ChakraProvider } from '@chakra-ui/react';

const ThemeRegistry = ({ children, options }: { children: React.ReactNode, options?: any }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

export default ThemeRegistry;
