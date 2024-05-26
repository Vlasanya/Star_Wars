'use client';

import './globals.css';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClipboard,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from 'react-icons/fi';
import ThemeRegistry from './ThemeRegistry';
import ClientLayout from '../components/ClientLayout';
import { metadata } from './metadata';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

const LINKS = [
  { text: 'Home', href: '/', icon: FiHome },
  { text: 'Starred', href: '/starred', icon: FiStar },
  { text: 'Tasks', href: '/tasks', icon: FiClipboard },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: FiSettings },
  { text: 'Support', icon: FiHelpCircle },
  { text: 'Logout', icon: FiLogOut },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry options={{ key: 'chakra' }}>
          <ClientLayout>
            <Navbar />
            <Box as="main" p={4}>
              {children}
            </Box>
          </ClientLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as="nav" bg="gray.800" color="white" p={4} align="center">
        <IconButton
          icon={<FiMenu />}
          variant="outline"
          aria-label="Open Menu"
          onClick={onOpen}
        />
        <Text ml={4} fontSize="xl" fontWeight="bold">
          Star Wars Data
        </Text>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
          Star Wars Data
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <Button
                  as={Link}
                  href={href}
                  leftIcon={<Icon />}
                  variant="ghost"
                  justifyContent="flex-start"
                  w="100%"
                  key={href}
                >
                  {text}
                </Button>
              ))}
              <Divider />
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <Button
                  leftIcon={<Icon />}
                  variant="ghost"
                  justifyContent="flex-start"
                  w="100%"
                  key={text}
                >
                  {text}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
