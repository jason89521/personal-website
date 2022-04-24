import type { NextApiRequest, NextApiResponse } from 'next';

import { firestore } from 'firebase/server';
import { getAllPosts } from 'lib/post';

type Data = {
  views: number;
};

type Error = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const method = (req.method || 'GET').toUpperCase();
  const id = req.query.id as string;
  const docRef = firestore.collection('posts').doc(id);
  const doc = await docRef.get();
  const views = doc.get('views') || 0;
  if (!doc.exists) {
    const allPosts = getAllPosts();
    if (!allPosts.includes(id)) {
      res.status(400).json({ message: 'This post does not exist.' });
      return;
    }
    await docRef.create({ views });
  }

  if (method === 'POST') {
    docRef.update({ views: views + 1 });
  }
  res.status(200).json({ views });
}
