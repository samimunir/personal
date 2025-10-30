export type PostModule = {
  default: React.ComponentType<any>;
  meta?: {
    title?: string;
    date?: string; // yyyy-mm-dd
    excerpt?: string;
    tags?: string[];
    hero?: string;
    readingTime?: string; // e.g., "6 min"
    featured?: boolean;
  };
};

export const postModules = import.meta.glob<PostModule>(
  "../content/posts/*.mdx",
  { eager: true }
);

export type PostEntry = {
  slug: string;
  meta: NonNullable<PostModule["meta"]>;
  Component: React.ComponentType<any>;
};

function normalize(
  meta: PostModule["meta"] = {}
): NonNullable<PostModule["meta"]> {
  return {
    title: meta.title || "Untitled",
    date: meta.date || "1970-01-01",
    excerpt: meta.excerpt || "",
    tags: meta.tags || [],
    hero: meta.hero,
    readingTime: meta.readingTime,
    featured: !!meta.featured,
  };
}

export const posts: PostEntry[] = Object.entries(postModules)
  .map(([path, mod]) => {
    const slug = path
      .split("/")
      .pop()!
      .replace(/\.mdx$/, "");
    return { slug, meta: normalize(mod.meta), Component: mod.default };
  })
  .sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPrevNext(slug: string) {
  const idx = posts.findIndex((p) => p.slug === slug);
  return { prev: posts[idx - 1], next: posts[idx + 1] };
}

export function getAllTags() {
  const set = new Set<string>();
  posts.forEach((p) => p.meta.tags?.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
