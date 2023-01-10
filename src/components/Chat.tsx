import React, { ReactElement, useState, useEffect } from 'react';
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
} from 'firebase/firestore';
import { db, auth } from '~/config/firebase';
import { Message } from '~/types';

interface ChatProps {
    room: string;
}

export default function Chat({ room }: ChatProps): ReactElement {
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const messagesRef = collection(db, 'messages');

    // this functions as sockets, the snapchot return a call back when info is changed
    useEffect(() => {
        // this query will birng the mesasges that have the same room and will order them
        // https://firebase.google.com/docs/firestore/query-data/queries
        const queryMessages = query(
            messagesRef,
            where('room', '==', room),
            // para poder ocupar el orderBy Created at necesitas crear un index
            // https://console.firebase.google.com/project/chatapp-32961/firestore/indexes?create_composite=Ck5wcm9qZWN0cy9jaGF0YXBwLTMyOTYxL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9tZXNzYWdlcy9pbmRleGVzL18QARoICgRyb29tEAEaDQoJY3JlYXRlZEF0EAEaDAoIX19uYW1lX18QAQ
            orderBy('createdAt')
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages: any[] = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    // this will check if the message is empty, if it is end the function
    // it will add new document to firestore with the structure provided
    //reset the message to blank
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (newMessage === '') return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room,
        });
        setNewMessage('');
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1> Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message: Message) => {
                    return (
                        <div className="message" key={message.id}>
                            <span className="user">{message.user}</span>
                            {message.text}
                        </div>
                    );
                })}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input
                    className="new-message-input"
                    placeholder="Type your message here"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button className="send-button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}
