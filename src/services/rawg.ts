import { GenresType } from 'components/GenreList';
import { rawgApi } from 'services/api';
import { chooseRandom } from 'utils/chooseRandom';
import queryString from 'query-string';

export type PlatformsType =
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'android'
  | 'mac'
  | 'linux';

export type PlatformType = { platform: { name: string; slug: PlatformsType } };

export type PublisherType = { name: string; slug: string };

export type DeveloperType = { name: string; slug: string };

export type GenreType = { name: string; slug: GenresType };

export type ScreenshotType = {
  id: number;
  image: string;
  height: number;
  width: number;
};

export type StoreType = {
  store_id: number;
  url: string;
};

export type PreviewGameType = {
  id: number;
  name: string;
  slug: string;
  background_image: string | null;
  rating: number;
  metacritc: number | null;
  genres: GenreType[];
};

export type GameType = {
  description_raw: string | null;
  background_image_additional: string | null;
  publishers: PublisherType[];
  developers: DeveloperType[];
  released: string;
  updated: string;
  series: PreviewGameType[];
  screenshots: ScreenshotType[];
  stores: StoreType[];
  website: string;
  parent_platforms: PlatformType[];
} & PreviewGameType;

type GameAdditionalInfoType = 'game-series' | 'screenshots' | 'stores';

const key = process.env.API_KEY;

export async function searchGames(params: Record<string, string>) {
  const stringParams = queryString.stringify(params);

  const { data } = await rawgApi.get<{ results: PreviewGameType[] }>(
    `/games?key=${key}&${stringParams}`,
  );

  return data.results;
}

export async function getGameAdditionalInfo<T>(
  type: GameAdditionalInfoType,
  slug: string,
) {
  try {
    const { data } = await rawgApi.get<{ results: T[] }>(
      `/games/${slug}/${type}?key=${key}`,
    );

    return data.results || [];
  } catch {
    return [];
  }
}

export async function getGameBySlug(slug: string): Promise<GameType> {
  const { data: game } = await rawgApi.get<GameType>(
    `/games/${slug}?key=${key}`,
  );

  const series = await getGameAdditionalInfo<PreviewGameType>(
    'game-series',
    slug,
  );

  const screenshots = await getGameAdditionalInfo<ScreenshotType>(
    'screenshots',
    slug,
  );

  const stores = await getGameAdditionalInfo<StoreType>('stores', slug);

  return {
    ...game,
    series,
    screenshots,
    stores,
  };
}

export async function getRandomGamesData() {
  const ordering = chooseRandom(['rating', 'metacritic', 'added', '']);

  const { data } = await rawgApi.get<{ results: PreviewGameType[] }>(
    `/games?key=${key}&page_size=100&ordering=${
      ordering ? '-' : ''
    }${ordering}`,
  );

  return data;
}

export async function getRandomGame() {
  const data = await getRandomGamesData();

  const game = chooseRandom(data.results);

  return getGameBySlug(game.slug);
}

export async function getRandomHeroGames(size = 3) {
  const data = await getRandomGamesData();
  const games: GameType[] = [];

  while (games.length < size) {
    const randomGame = chooseRandom(data.results);

    const containsGame = games.some((game) => game.slug === randomGame.slug);

    if (!containsGame) {
      const game = await getGameBySlug(randomGame.slug);
      games.push(game);
    }
  }

  return games;
}

export async function getGamesByGenres(genres: GenresType[], size = 10) {
  const { data } = await rawgApi.get<{ results: PreviewGameType[] }>(
    `/games?key=${key}&genres=${genres.join(',')}&page_size=${size}`,
  );

  return data.results;
}

export async function getMostPopularGames(size = 10) {
  const { data } = await rawgApi.get<{ results: PreviewGameType[] }>(
    `/games?key=${key}&page_size=${size}&ordering=-added`,
  );

  return data.results;
}
