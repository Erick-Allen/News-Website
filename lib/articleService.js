import { db } from './firebase.js';

export const fetchArticleByCategory = async (category) => {
    const ref = db.collection('cachedArticles'.where('category', '==', category));
    const snapshot = await ref.get();
    const Articles = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
    return Articles;
}