import React from "react";
import { Message } from "./types";
import ChatMessages from "./messages";
import ChatForm from "./form";
import styles from "./ChatPage.module.css";

const ChatPage: React.FC<{ author: string }> = ({ author }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const container = React.useRef<HTMLDivElement>(null);

  const handleSubmit = (message: string) => {
    const newMessage = { message, author, timestamp: Date.now() };
    setMessages((prevState) => [...prevState, newMessage]);
  };

  React.useEffect(() => {
    const { scrollHeight = 0 } = container.current ?? {};

    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 200;

    if (messages.length && currentScroll + modifier >= scrollHeight) {
      window.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  React.useEffect(() => {
    const { scrollHeight = 0 } = container.current ?? {};
    window.scrollTo({ top: scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <>
      <ChatMessages ref={container} messages={messages} author={author} />
      <div className={styles.formWrapper}>
        <ChatForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default ChatPage;
