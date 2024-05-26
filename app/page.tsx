'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, Grid, Heading, Text, Container, VStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const links = [

  {
    title: 'Characters',
    href: '/characters',
    description: [],
    buttonText: 'View',
    buttonVariant: 'solid',
  },
  {
    title: 'Episodes',
    href: '/episodes',
    description: [],
    buttonText: 'View',
    buttonVariant: 'solid',
  },
  {
    title: 'Starships',
    href: '/starships',
    description: [],
    buttonText: 'View',
    buttonVariant: 'outline',
  },
];

export default function Page() {
  const router = useRouter();
  return (
    <Box>
      <Container maxW="container.sm" py={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={4}>
          Links
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={6}>
          Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default Chakra UI components with little
          customization.
        </Text>
      </Container>
      <Container maxW="container.md">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {links.map((link) => (
            <Box
              key={link.title}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              backgroundColor="gray.100"
            >
              <VStack spacing={4} align="center">
                <Heading as="h3" size="md">
                  {link.title}
                </Heading>
                <Text>{link.subheader}</Text>
                <VStack align="center">
                  {link.description.map((line) => (
                    <Text key={line} fontSize="sm" textAlign="center">
                      {line}
                    </Text>
                  ))}
                </VStack>
                <Button
                  width="full"
                  variant={link.buttonVariant}
                  onClick={() => {
                    router.push(link.href);
                  }}
                >
                  {link.buttonText}
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
