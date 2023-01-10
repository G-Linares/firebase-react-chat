import React, { useState, useRef } from 'react';
import Auth from '~/components/Auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(cookies.get('auth-token'));
    const [room, setRoom] = useState<string | null>(null);

    const roomInputRef = useRef<HTMLInputElement>(null);

    // if there is not  a cookie under auth-token them Auth will be displayed
    if (!isAuth) {
        return (
            <div className="">
                <Auth setIsAuth={setIsAuth} />
            </div>
        );
    }

    const handleSubmitRoom = () => {
        if (roomInputRef.current !== null) setRoom(roomInputRef.current.value);
    };
    return (
        <div>
            {room ? (
                <div> Chat </div>
            ) : (
                <div className="flex flex-col gap-2 items-center">
                    <label className="border-b-2 text-3xl">
                        Enter Room Name
                    </label>
                    <input
                        className="border-slate-500 border-2 rounded-md min-w-[200px]"
                        ref={roomInputRef}
                    />
                    <button
                        className="auth-button mt-5"
                        onClick={handleSubmitRoom}
                    >
                        Enter Chat
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
