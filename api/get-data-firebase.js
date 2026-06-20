import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';


if (!getApps().length) {
    initializeApp({
        credential: cert(JSON.parse(Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64').toString('utf8')))
    });
}

try {
    console.log(
        "FIREBASE_KEY_BASE64 exists:",
        !!process.env.FIREBASE_KEY_BASE64
    );

    if (process.env.FIREBASE_KEY_BASE64) {
        const decoded = Buffer.from(
            process.env.FIREBASE_KEY_BASE64,
            'base64'
        ).toString('utf8');

        console.log(
            "Decoded starts with:",
            decoded.substring(0, 50)
        );
    }

    if (!getApps().length) {
        initializeApp({
            credential: cert(
                JSON.parse(
                    Buffer.from(
                        process.env.FIREBASE_KEY_BASE64,
                        'base64'
                    ).toString('utf8')
                )
            )
        });
    }
} catch (error) {
    console.error(
        "Firebase initialization error:",
        error
    );
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


