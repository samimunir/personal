export default function CodeBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <figure className="my-6">
      {title && (
        <figcaption className="text-xs text-white/60 mb-2">{title}</figcaption>
      )}
      <pre className="text-sm leading-relaxed p-4 overflow-x-auto">
        {children}
      </pre>
    </figure>
  );
}
