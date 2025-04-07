import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchMarkdownFile } from "../services/bitbucketApi";

export default function Home() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMarkdownFile("homepage.md")
      .then(setContent)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
