export type PostModule = {
  default: React.ComponentType;
  meta?: {
    title?: string;
    date?: string;
    excerpt?: string;
    tags?: string[];
    hero?: string;
  };
};

export const postModules = import.meta.glob<PostModule>(
  "../content/posts/*.mdx",
  { eager: true }
);

export const posts = Object.entries(postModules)
  .map(([path, mod]) => {
    const slug = path
      .split("/")
      .pop()!
      .replace(/\.mdx$/, "");
    return { slug, module: mod, meta: mod.meta || {}, Component: mod.default };
  })
  .sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
