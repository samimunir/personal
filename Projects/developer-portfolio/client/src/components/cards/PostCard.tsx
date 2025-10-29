export type Post = {
  title: string;
  excerpt: string;
  date: string;
  read: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <a
      className="block rounded-2xl border border-white/10 bg-white/[.05] p-5 hover:bg-white/[.07] transition-colors"
      href="#"
    >
      <div className="flex items-center justify-between mb-2 text-xs text-white/60">
        <span>{post.date}</span>
        <span>{post.read}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-white/70">{post.excerpt}</p>
    </a>
  );
}
