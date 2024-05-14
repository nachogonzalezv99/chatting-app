import { useEffect, useRef, useState } from "react";
import { socket } from "./utils/socket";

function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState<{ name: string; isActive: boolean }[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const ref = useRef<string | null>(user)

  const onSubmit = (event: any) => {
    event.preventDefault();
    socket.timeout(5000).emit("chat-message", event.target.message.value);
  };

  // useEffect(()=>{
  //   ref.current = user
  // }, [user])

  useEffect(() => {
    const messageEvent = (value: string) => {
      setMessages((prev) => [...prev, value]);
    };
    const connectEvent = (value: string) => {
      setUsers((prev) => [...prev, { name: value, isActive: true }]);
    };
    const disconnectEvent = (value: string) => {
      setUsers((prev) =>
        prev.map((u) => (u.name === value ? { ...u, isActive: false } : u))
      );
    };

    socket.on("chat-message", messageEvent);
    socket.on("connected", connectEvent);
    socket.on("disconnected", disconnectEvent);

    return () => {
      console.log(ref.current)
      socket.timeout(5000).emit("disconnected", ref.current);
      socket.off("chat-message", messageEvent);
      socket.off("connected", connectEvent);
      socket.off("disconnected", disconnectEvent);
    };
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col pb-20">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          setUser(e.target.name.value)
          socket.timeout(5000).emit("connected", e.target.name.value);
        }}
      >
        <input
          name="name"
          className="w-full border border-gray-300 py-1 px-2"
        />
        <button>Set user</button>
      </form>

      <div className="flex items-center gap-5">
        {users.map((user) => (
          <div key={user.name} className="flex gap-1 items-center">
            {user.name}
            <div
              className="w-2 aspect-square rounded-full"
              style={{ backgroundColor: user.isActive ? "lightgreen" : "red" }}
            />
          </div>
        ))}
      </div>
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
