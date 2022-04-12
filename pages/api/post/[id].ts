import type { NextApiRequest, NextApiResponse } from 'next';

import { firestore } from 'firebase/server';

type Data = {
  views: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  const doc = await firestore.collection('posts').doc(id.toString()).get();
  const views = doc.exists ? doc.get('views') : 0;
  res.status(200).json({ views });
}
