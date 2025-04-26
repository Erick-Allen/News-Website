import { db } from './firebase.js';
import {collection, addDoc, getDocs, deleteDoc, doc, Timestamp} from 'firebase/firestore';

const COLLECTION = 'cachedArticles';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAndCacheArticles = async () => {
    console.log("beginning fetch");
    const categories = ['general', 'business', 'technology'];
    const allArticles = [];

    for (const category of categories) {
        const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=1&topic=${category}&token=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log("got the url" + url);
        const ref = collection(db, COLLECTION);

        for (const article of data.articles) {
            const { title, description, url, image, publishedAt } = article;
            const sanitizedArticle = { title, description, url, image, publishedAt, category, cachedAt: Timestamp.now() };

            await addDoc(ref, sanitizedArticle);
            allArticles.push(sanitizedArticle);
        }
    }

    return allArticles;
};

export const loadCachedArticles = async () => {
    console.log("attempting to load articles");
    const ref = collection(db, COLLECTION);
    const snapshot = await getDocs(ref);

    if (snapshot.empty) return await fetchAndCacheArticles();

    const cachedAt = snapshot.docs[0].data().cachedAt.toDate();
    const hoursOld = (Date.now() - cachedAt.getTime()) / 1000 / 60 / 60;

    if (hoursOld > 24) {
        for (const docSnap of snapshot.docs) {
            await deleteDoc(doc(db, COLLECTION, docSnap.id));
        }
        return await fetchAndCacheArticles();
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
}