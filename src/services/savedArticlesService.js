import { db } from './firebase.js';
import {collection, addDoc, getDocs, deleteDoc, doc, Timestamp} from 'firebase/firestore';

const COLLECTION = 'cachedArticles';

export const fetchAndCacheArticles = async () => {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=1&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`)
    const data = await res.json();

    const ref = collection(db, COLLECTION);
        for(const article of data.articles) {
            await addDoc(ref, {...article, cachedAt: Timestamp.now()});
        }

    return data.articles;
};

export const loadCachedArticles = async () => {
    const ref = collection(db, COLLECTION);
    const snapshot = await getDocs(ref);

    if (snapshot.empty) return await fetchAndCacheArticles();

    const cachedAt = snapshot.docs[0].data().cachedAt.toDate();
    const hoursOld = (Date.now() - cachedAt.getTime() / 1000 / 60 / 60)

    if (hoursOld > 24) {
        for (const docSnap of snapshot.docs) {
            await deleteDoc(doc (db, COLLECTION, docSnap.id));
        }
        return await fetchAndCacheArticles();
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
}