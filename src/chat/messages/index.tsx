import React from "react";
import { Message } from "../types";
import styles from "./Messages.module.css";

const ChatMessage: React.FC<{
  message: Message;
  isAuthorMessage?: boolean;
}> = ({ message, isAuthorMessage = false }) => {
  return (
    <div className={`${styles.bubble}`}>
      <div
        className={`${styles.content} ${
          isAuthorMessage ? styles.right : styles.left
        }`}
      >
        {!isAuthorMessage ? <div>{message.author}</div> : null}
        <p>{message.message}</p>
        <div>{message?.timestamp}</div>
      </div>
    </div>
  );
};

interface MessagesProps {
  messages: Message[];
  author: string;
}

const ChatMessages = React.forwardRef<HTMLDivElement, MessagesProps>(
  ({ messages, author }, ref) => {
    const sortMessages = React.useMemo(() => {
      return messages.sort((a, b) => {
        const aTimestamp = a.timestamp || 0;
        const bTimestamp = b.timestamp || 0;

        if (aTimestamp > bTimestamp) {
          return 1;
        }
        if (aTimestamp < bTimestamp) {
          return -1;
        }
        return 0;
      });
    }, [messages]);

    return (
      <div ref={ref} className={styles.wrapper}>
        {sortMessages.map((message, index) => (
          <ChatMessage
            key={`${index}-${message?._id || "new"}`}
            message={message}
            isAuthorMessage={author === message.author}
          />
        ))}
      </div>
    );
  }
);

export default ChatMessages;
