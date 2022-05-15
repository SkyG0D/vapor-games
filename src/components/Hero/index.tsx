import {
  Box,
  Button,
  Flex,
  Heading,
  LightMode,
  Link,
  Text,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { ArrowRightIcon } from '@chakra-ui/icons';

import { Rating } from 'components/Rating';
import { GameTag } from 'components/GameTag';
import { GenrerType, PublisherType } from 'services/rawg';
import { Metacritic } from 'components/Metacritic';

export type HeroProps = {
  title: string;
  slug: string;
  publisher: PublisherType;
  bgImage: string;
  genres: GenrerType[];
  rating: number;
  metacritic?: number;
};

export function Hero({
  title,
  publisher,
  bgImage,
  genres,
  slug,
  rating,
  metacritic,
}: HeroProps) {
  return (
    <Box
      as="section"
      w="100%"
      pos="relative"
      h={{ base: '400px', md: '95vh' }}
      minH={{ base: '250px', md: '300px', lg: '550px' }}
      transition="ease-in-out 0.2s"
      sx={{
        '&::before': {
          content: "''",
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgImage,
          filter: 'brightness(0.5)',
          bgSize: 'cover',
          bgRepeat: 'no-repeat',
          bgPos: ['center', 'top'],
        },
      }}
    >
      <Flex
        w="100%"
        h="100%"
        pos="relative"
        flexDir="column"
        justifyContent="flex-end"
        boxShadow="dark-lg"
        py="1rem"
        px={{ base: '2rem', md: '4rem' }}
        color="white"
        bgGradient="linear(to bottom left, transparent 10%, rgba(0, 0, 0, 0.95) 80%)"
      >
        <LightMode>
          <Heading maxW="400px">{title}</Heading>

          <Text mb="1rem" maxW="400px">
            {publisher.name}
          </Text>

          <Flex gap="0.5rem" wrap="wrap" mb="1rem" width="100%">
            {genres.map(({ name, slug }) => (
              <NextLink key={slug} href={`/games?genre=${slug}`} passHref>
                <Link
                  _focus={{
                    outline: 'none',
                    ringColor: 'whiteAlpha.800',
                    ring: 1,
                    ringOffsetColor: 'rgba(0, 0, 0, 0.95)',
                    ringOffset: '0.2rem',
                  }}
                >
                  <GameTag text={name} />
                </Link>
              </NextLink>
            ))}
          </Flex>

          <Flex mb="1rem" gap="1rem">
            <Rating score={rating} iconSize="20px" />
            {metacritic !== undefined && metacritic !== null && (
              <Metacritic size="32px" value={metacritic} />
            )}
          </Flex>

          <NextLink href={`/games/${slug}`} passHref>
            <Link tabIndex={-1}>
              <Button
                colorScheme="whiteAlpha"
                rightIcon={<ArrowRightIcon />}
                width="100%"
                maxW="400px"
                _focus={{
                  outline: 'none',
                  ringColor: 'whiteAlpha.800',
                  ring: 1,
                  ringOffsetColor: 'rgba(0, 0, 0, 0.95)',
                  ringOffset: '0.2rem',
                }}
              >
                Details
              </Button>
            </Link>
          </NextLink>
        </LightMode>
      </Flex>
    </Box>
  );
}
