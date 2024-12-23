import React, { useEffect } from "react";
import { marked } from "marked";

interface AIProps {
  searchKeyword: string;
  showArticle: boolean;
  articleContent: string; 
  displayedWords: string[];
  setDisplayedWords: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AI: React.FC<AIProps> = ({
  searchKeyword,
  showArticle,
  articleContent,
  displayedWords,
  setDisplayedWords,
  index,
  setIndex,
}) => {
  useEffect(() => {
    if (showArticle) {
      const words = articleContent.split(" ");
      if (index < words.length) {
        const interval = setInterval(() => {
          setDisplayedWords((prev) => [...prev, words[index]]);
          setIndex((prev) => prev + 1);
        }, 90);
        return () => clearInterval(interval);
      }
    }
  }, [showArticle, articleContent, index, setDisplayedWords, setIndex]);

  const parsedMarkdown = marked(displayedWords.join(" "));

  return (
    <div>
      {showArticle && (
        <div
          className="mt-6 p-4 bg-black-100 rounded-md shadow-md w-full max-w-4xl animate-fade-in"
          style={{ boxShadow: "0 0 15px rgba(75, 0, 130, 0.7)" }}
        >
          <h3 className="text-lg font-bold mb-2 text-indigo-600">
            Search Results Analysis:
          </h3>
        
          <div
            className="text-gray-900 text-base markdown-content"
            dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
          />
        </div>
      )}
    </div>
  );
};

export default AI;
