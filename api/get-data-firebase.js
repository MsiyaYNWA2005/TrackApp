import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';


if (!getApps().length) {
    initializeApp({
        credential: cert(JSON.parse(Buffer.from(process.env.FIREBASE_KEY_BASE64, 'base64').toString('utf8')))
    });
}

const db = getFirestore();



export default async function handler(req, res) {

    if (req.method !== "GET") return res.status(405).end();

    const{name , surname }  = req.query;

    try {
        const snapshot = await db.collection('Student')
            .where('name', '==', name)
            .where('surname', '==', surname)
            .get();

        const students = snapshot.docs.map(doc => doc.data());
        return res.status(200).json(students);
        
    } catch(error) {
       console.error(error);
       return res.status(500).json({ error: error.message });
    }
};


