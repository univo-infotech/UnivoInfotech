import { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data/siteData';
import { db } from '../firebase/config';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('codevia_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultData, ...parsed };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('codevia_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [firebaseConnected, setFirebaseConnected] = useState(false);

  // Listen to Firestore real-time updates for site content
  useEffect(() => {
    const siteDocRef = doc(db, 'content', 'site');
    const unsubscribe = onSnapshot(siteDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreData = docSnap.data();
        setData(prev => ({ ...defaultData, ...prev, ...firestoreData }));
        setFirebaseConnected(true);
      } else {
        // First time initialization: seed Firestore with default data
        setDoc(siteDocRef, data).catch(err => console.log('Firestore seed info:', err.message));
        setFirebaseConnected(true);
      }
    }, (error) => {
      console.log('Firebase Firestore info (using offline/local cache):', error.message);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore real-time updates for contact messages
  useEffect(() => {
    const messagesCollectionRef = collection(db, 'messages');
    const unsubscribe = onSnapshot(messagesCollectionRef, (querySnap) => {
      const msgs = [];
      querySnap.forEach((docSnap) => {
        msgs.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (msgs.length > 0) {
        // Sort newest first
        msgs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setMessages(msgs);
      }
    }, (error) => {
      console.log('Firebase messages info:', error.message);
    });

    return () => unsubscribe();
  }, []);

  // Sync state changes to localStorage as fallback
  useEffect(() => {
    localStorage.setItem('codevia_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('codevia_messages', JSON.stringify(messages));
  }, [messages]);

  // Helper to persist data updates to Firestore + local state
  const saveToFirestore = async (updatedData) => {
    try {
      const siteDocRef = doc(db, 'content', 'site');
      await setDoc(siteDocRef, updatedData, { merge: true });
    } catch (e) {
      console.warn('Firestore write warning (saved locally):', e.message);
    }
  };

  const updateSection = (sectionName, newData) => {
    const nextData = { ...data, [sectionName]: newData };
    setData(nextData);
    saveToFirestore({ [sectionName]: newData });
  };

  const addItem = (sectionName, item) => {
    const newItem = { ...item, id: Date.now().toString() };
    const currentList = Array.isArray(data[sectionName]) ? data[sectionName] : [];
    const updatedList = [...currentList, newItem];
    const nextData = { ...data, [sectionName]: updatedList };
    setData(nextData);
    saveToFirestore({ [sectionName]: updatedList });
  };

  const updateItem = (sectionName, itemId, updatedData) => {
    const currentList = Array.isArray(data[sectionName]) ? data[sectionName] : [];
    const updatedList = currentList.map(item => 
      (item.id === itemId || item.id?.toString() === itemId?.toString()) 
        ? { ...item, ...updatedData } 
        : item
    );
    const nextData = { ...data, [sectionName]: updatedList };
    setData(nextData);
    saveToFirestore({ [sectionName]: updatedList });
  };

  const deleteItem = (sectionName, itemId) => {
    const currentList = Array.isArray(data[sectionName]) ? data[sectionName] : [];
    const updatedList = currentList.filter(item => item.id !== itemId && item.id?.toString() !== itemId?.toString());
    const nextData = { ...data, [sectionName]: updatedList };
    setData(nextData);
    saveToFirestore({ [sectionName]: updatedList });
  };

  const addMessage = async (message) => {
    const newMsg = {
      ...message,
      date: new Date().toISOString(),
      status: 'new'
    };

    // Add to Firestore collection
    try {
      const messagesCollectionRef = collection(db, 'messages');
      const docRef = await addDoc(messagesCollectionRef, newMsg);
      const msgWithId = { ...newMsg, id: docRef.id };
      setMessages(prev => [msgWithId, ...prev]);
    } catch (e) {
      // Fallback local
      const msgWithId = { ...newMsg, id: Date.now().toString() };
      setMessages(prev => [msgWithId, ...prev]);
    }
  };

  const deleteMessage = async (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id && msg.id?.toString() !== id?.toString()));
    try {
      const msgDocRef = doc(db, 'messages', id.toString());
      await deleteDoc(msgDocRef);
    } catch (e) {
      console.warn('Firestore delete message info:', e.message);
    }
  };

  const updateMessage = async (id, updates) => {
    setMessages(prev => prev.map(msg => 
      (msg.id === id || msg.id?.toString() === id?.toString()) 
        ? { ...msg, ...updates } 
        : msg
    ));
    try {
      const msgDocRef = doc(db, 'messages', id.toString());
      await updateDoc(msgDocRef, updates);
    } catch (e) {
      console.warn('Firestore update message info:', e.message);
    }
  };

  const markMessageAsRead = (id) => {
    updateMessage(id, { status: 'read' });
  };

  return (
    <DataContext.Provider value={{
      data,
      messages,
      firebaseConnected,
      updateSection,
      addItem,
      updateItem,
      deleteItem,
      addMessage,
      deleteMessage,
      updateMessage,
      markMessageAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
