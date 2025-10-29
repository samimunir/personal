import { MDXProvider as BaseProvider } from "@mdx-js/react";
import CodeBlock from "./blocks/CodeBlock";
import Callout from "./blocks/Callout";

export const mdxComponents = {
  code: (props: any) => (
    <code
      className="px-1.5 py-0.5 rounded bg-white/10 text-[#22D3EE]"
      {...props}
    />
  ),
  pre: (props: any) => (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 bg-white/4"
      {...props}
    />
  ),
  CodeBlock,
  Callout,
  h1: (p: any) => (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" {...p} />
  ),
  h2: (p: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-3" {...p} />
  ),
  h3: (p: any) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-2" {...p} />
  ),
  p: (p: any) => <p className="text-white/80 leading-relaxed mb-4" {...p} />,
  ul: (p: any) => (
    <ul className="list-disc list-inside space-y-1 text-white/80 mb-4" {...p} />
  ),
  ol: (p: any) => (
    <ol
      className="list-decimal list-inside space-y-1 text-white/80 mb-4"
      {...p}
    />
  ),
  a: (p: any) => (
    <a
      className="text-[#22D3EE] underline decoration-white/20 hover:decoration-[#22D3EE]"
      {...p}
    />
  ),
};

export default function MDXProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseProvider components={mdxComponents as any}>{children}</BaseProvider>
  );
}
