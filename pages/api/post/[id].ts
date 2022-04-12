import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  views: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  res.json({ views: 10 });
}
