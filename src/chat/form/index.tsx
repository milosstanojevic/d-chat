import React from "react";
import styles from "./Form.module.css";

interface ChatFormProps {
  onSubmit: (message: string) => void;
  isSendDisabled?: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({
  onSubmit,
  isSendDisabled = false,
}) => {
  const [message, setMessage] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setMessage(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.input}>
        <input
          value={message}
          name="message"
          type="text"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={message.length === 0 || isSendDisabled}
        className={styles.btn}
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
