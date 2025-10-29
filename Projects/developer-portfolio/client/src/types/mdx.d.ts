/// <reference types="react" />

declare module "*.mdx" {
  import * as React from "react";

  // Props supported by MDX runtime (we only need `components`)
  type MDXProps = {
    components?: Record<string, React.ComponentType<any>>;
    [key: string]: any;
  };

  const MDXComponent: React.FC<MDXProps>;
  export default MDXComponent;

  // Optional metadata export we use in the index
  export const meta: any;
}
