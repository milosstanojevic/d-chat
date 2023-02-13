import React from "react";
import { Message } from "./types";
import ChatMessages from "./messages";
import ChatForm from "./form";
import styles from "./ChatPage.module.css";
import { getMessages, saveMessage } from "./api";
import Loading from "./loading";

const ChatPage: React.FC<{ author: string }> = ({ author }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetch = React.useRef(true);

  const handleSubmit = (message: string) => {
    setIsSaving(true);
    saveMessage({ message, author })
      .then((response) => {
        setMessages((prevState) => [...prevState, response]);
      })
      .finally(() => setIsSaving(false));
  };

  React.useEffect(() => {
    if (fetch.current) {
      setIsLoading(true);
      fetch.current = false;
      getMessages()
        .then((response) => {
          setMessages(response);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const intervalRef = React.useRef<number | null>(null);

  const newestMessage: Message | undefined = React.useMemo(() => {
    if (messages.length) {
      return messages.reduce(function (prev, current) {
        const prevTimestamp =
          typeof prev?.timestamp === "number"
            ? prev.timestamp
            : +prev.timestamp;
        const currentTimestamp =
          typeof current?.timestamp === "number"
            ? current.timestamp
            : +current.timestamp;
        return prevTimestamp > currentTimestamp ? prev : current;
      });
    }
    return undefined;
  }, [messages]);

  const startInterval = React.useCallback(() => {
    const since = newestMessage?.timestamp
      ? +newestMessage.timestamp
      : Date.now();

    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      getMessages({ since, limit: 10 }).then((response) => {
        setMessages((prevState) => [...prevState, ...response]);
      });
    }, 5000);
  }, [newestMessage]);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ChatMessages
          startInterval={startInterval}
          stopInterval={stopInterval}
          messages={messages}
          author={author}
        />
      )}
      <div className={styles.formWrapper}>
        <ChatForm onSubmit={handleSubmit} isSendDisabled={isSaving} />
      </div>
    </>
  );
};

export default ChatPage;
