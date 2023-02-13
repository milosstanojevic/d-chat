import React from "react";

interface AuthorProps {
  onSubmit: (author: string) => void;
}

const Author: React.FC<AuthorProps> = ({ onSubmit }) => {
  const [author, setAuthor] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setAuthor(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(author);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        Hello, before start this awesome chat, please provide some name or
        nickname
      </h3>
      <input
        placeholder="Example Johny Cage"
        name="author"
        value={author}
        onChange={handleChange}
      />
      <button type="submit" disabled={author.length === 0}>
        Rock On
      </button>
    </form>
  );
};

export default Author;
