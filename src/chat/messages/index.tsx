import React from "react";
import { Message } from "../types";
import { formatDate } from "../utils/date";
import styles from "./Messages.module.css";

const ChatMessage: React.FC<{
  message: Message;
  isAuthorMessage?: boolean;
}> = ({ message, isAuthorMessage = false }) => {
  const formattedDate = React.useMemo(() => {
    if (message?.timestamp) {
      const timestamp =
        typeof message.timestamp === "number"
          ? message.timestamp
          : +message.timestamp;

      return formatDate(new Date(timestamp));
    }
    return "-";
  }, [message]);
  return (
    <div className={`${styles.bubble}`}>
      <div
        className={`${styles.content} ${
          isAuthorMessage ? styles.right : styles.left
        }`}
      >
        {!isAuthorMessage ? <div>{message.author}</div> : null}
        <p>{message.message}</p>
        <div>{formattedDate}</div>
      </div>
    </div>
  );
};

interface MessagesProps {
  messages: Message[];
  author: string;
  startInterval: () => void;
  stopInterval: () => void;
}

const ChatMessages: React.FC<MessagesProps> = ({
  messages,
  author,
  startInterval,
  stopInterval,
}) => {
  const container = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    startInterval();

    return () => {
      stopInterval();
    };
  }, [startInterval, stopInterval]);

  return (
    <div ref={container} className={styles.wrapper}>
      {sortMessages.map((message, index) => (
        <ChatMessage
          key={`${index}-${message?._id || "new"}`}
          message={message}
          isAuthorMessage={author === message.author}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
