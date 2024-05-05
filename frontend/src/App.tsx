import { useEffect, useState } from "react";
import { socket } from "./utils/socket";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const onSubmit = (event: any) => {
    event.preventDefault();

    socket.timeout(5000).emit("chat-message", event.target.message.value);
  };

  useEffect(() => {
    const messageEvent = (value: string) => {
      setMessages((prev) => [...prev, value]);
    };
    socket.on("chat-message", messageEvent);

    return () => {
      socket.off("chat-message", messageEvent);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col pb-20">
      <div className="flex-1 flex-col">
        {messages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex w-80 bg-red-200 mx-auto">
        <input
          name="message"
          className="w-full border border-gray-300 py-1 px-2"
        />
        <button className="bg-gray-300 border px-2 py-1">Send</button>
      </form>
    </div>
  );
}

export default App;
