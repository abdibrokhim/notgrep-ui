import React from "react";
import ReactMarkdown from 'react-markdown';

interface MarkdownHelperProps {
    children: string;
}

function MarkdownHelper({ children }: MarkdownHelperProps) {
  return (
    <div>
      <ReactMarkdown>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownHelper;