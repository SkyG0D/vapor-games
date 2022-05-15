import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';
import NextLink from 'next/link';

import { GameCard } from 'components/GameCard';

import { actionGames } from './fakeActionGames';

export type GenresType = 'action';

type GenreListProps = {
  title: string;
  genre: GenresType;
};

export function GenreList({ title, genre }: GenreListProps) {
  return (
    <Box w="100%" mb={50}>
      <Flex mb={2} px={2} justify="space-between" align="center">
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>

        <NextLink href={`/games?genre=${genre}`} passHref>
          <Link
            fontSize="2xl"
            _focus={{
              textDecor: 'underline',
            }}
          >
            Ver mais
          </Link>
        </NextLink>
      </Flex>

      <HStack spacing={8} overflow="auto" py={4} px={2} as={ScrollContainer}>
        {actionGames.results.map((game) => {
          return <GameCard key={game.slug} {...game} />;
        })}
      </HStack>
    </Box>
  );
}