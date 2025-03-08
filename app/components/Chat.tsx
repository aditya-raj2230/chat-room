import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function Chat() {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket = io("http://localhost:3000"); // Replace with your actual server URL

        socket.on("message", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit("message", message); // Send message to server
        setMessages((prev) => [...prev, message]); // Add your message to the chat
        setMessage(""); // Clear input field
    };

    return (
        <div>
            <h1>Real-Time Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>)

}
