// app/components/CodeSnippet.tsx

// Kita butuh 'any' di sini karena types library-nya mungkin kurang lengkap
// Ini adalah cara cepat untuk TypeScript
// @ts-ignore 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import CopyButton from './CopyButton';

// Tentukan tipe untuk props
interface CodeSnippetProps {
  title: string;
  language: string;
  code: string;
}

export default function CodeSnippet({ title, language, code }: CodeSnippetProps) {
  const cleanCode = code.trim();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      
      <div className="relative bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700">
        <CopyButton codeToCopy={cleanCode} />
        
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ 
            margin: 0, 
            padding: '20px', 
            paddingTop: '40px'
          }}
          codeTagProps={{
            style: { fontFamily: '"Fira Code", monospace' }
          }}
          showLineNumbers
        >
          {cleanCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}