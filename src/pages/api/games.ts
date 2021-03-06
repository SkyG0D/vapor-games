import { NextApiRequest, NextApiResponse } from 'next';

import * as rawg from 'services/rawg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params = req.query as Record<string, string>;

  try {
    const games = await rawg.searchGames(params);
    res.send(games);
  } catch {
    res.status(404).send({});
  }
}
