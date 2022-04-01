import type { NormalComponents } from 'react-markdown/lib/complex-types';
import type { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Components = Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>;

type Props = {
  children: string;
  components?: Components;
};

const Markdown = ({ children, components }: Props) => {
  const codeComponent: Components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      if (inline || !match)
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );

      return (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
  };

  const mergedComponents = Object.assign(codeComponent, components);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={mergedComponents}
      linkTarget="_blank"
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
