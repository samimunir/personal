import { useEffect } from "react";

export default function Meta({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
      }
      m.content = description;
    }
  }, [title, description]);
  return null;
}
