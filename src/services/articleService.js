import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase.js';

export const fetchArticleByCategory = async (category) => {
    const ref = collection(db, 'cachedArticles');
    const q = query(ref, where('category', '==', category));
    const snapshot = await getDocs(q);
    const techArticles = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
    return techArticles;
}