import type { NormalComponents } from 'react-markdown/lib/complex-types';
import type { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Components = Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>;

type Props = Omit<ReactMarkdownOptions, 'rehypePlugins' | 'remarkPlugins'>;

function Markdown({ children, ...rest }: Props) {
  const components: Components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      if (inline || !match)
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );

      return (
        <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
    a({ node, href, target, rel, ...props }) {
      const isInternal = href?.startsWith('/');
      target = isInternal ? '_self' : '_blank';
      rel = isInternal ? rel : 'noreferrer';

      return <a href={href} target={target} rel={rel} className="text-primary hover:opacity-75" {...props} />;
    },
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm, remarkToc]}
      components={components}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
