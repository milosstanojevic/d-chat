import "./App.css";
import ChatPage from "./chat";
import React from "react";
import Author from "./chat/author";

function App() {
  const [author, setAuthor] = React.useState<string>("");
  return author.length === 0 ? (
    <Author onSubmit={setAuthor} />
  ) : (
    <ChatPage author={author} />
  );
}

export default App;
