import type { NextApiRequest, NextApiResponse } from 'next';

import { firestore } from 'firebase/server';

type Data = {
  views: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const method = (req.method || 'GET').toUpperCase();
  const { id } = req.query;
  const docRef = firestore.collection('posts').doc(id.toString());
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(400);
    return;
  }

  const views = doc.get('views');
  if (method === 'POST') {
    docRef.update({ views: views + 1 });
  }
  res.status(200).json({ views });
}
