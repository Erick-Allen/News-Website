import { db } from './firebase.js';
import {collection, addDoc, getDocs, deleteDoc, doc, Timestamp} from 'firebase/firestore';

const COLLECTION = 'cachedArticles';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAndCacheArticles = async () => {
    const categories = ['general', 'business', 'technology'];
    const allArticles = [];

    for (const category of categories) {
        const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=1&topic=${category}&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        const ref = collection(db, COLLECTION);

        for (const article of data.articles) {
            await addDoc(ref, {...article, category, cachedAt: Timestamp.now() })
        }
    }

    return allArticles;
};

export const loadCachedArticles = async () => {
    const ref = collection(db, COLLECTION);
    const snapshot = await getDocs(ref);

    if (snapshot.empty) return await fetchAndCacheArticles();

    const cachedAt = snapshot.docs[0].data().cachedAt.toDate();
    const hoursOld = (Date.now() - cachedAt.getTime()) / 1000 / 60 / 60;

    if (hoursOld > 24) {
        for (const docSnap of snapshot.docs) {
            await deleteDoc(doc (db, COLLECTION, docSnap.id));
        }
        return await fetchAndCacheArticles();
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
}