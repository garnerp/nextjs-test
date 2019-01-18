# NextJS Proof of Concept

This is an experimental repo to test out a few different app development patterns using nextjs.

### Markdown Page Generation

This repo contains a sample implementation of generated blog/docs-style pages using markdown. We implement this using mdx, via the mdx loader which can be found in the nextjs config. One of the goals with this portion was to load straight markdown documents into layouts along with front matter. This is achieved through a custom loader, `mdx-layout-loader`, in the lib folder.

### Component-Scoped Styling

One of our major goals was to keep css as close to spec-compliant css as possible, but still have it ship alongside components. We're not using any css-in-js library, but css is colocated with component code, paired with components through a webpack loader, and code split appropriately.

### Loading External Data

This experiment is set up to load from our CMS right now as its the primary data source. We have code in place that loads from the CMS via GraphQL, and generates dynamic routes with CMS data. GraphQL queries are also colocated alongside component code in `.graphql` files to make the divide between data and markup clean and clear.

### TypeScript

We're using typescript here along with apollo-codegen, which analyzes our components and graphql endpoint in order to automatically generate most of our types. To regenerate types, use `npm run apollo-codegen`, if you have made changes to the queries, variables, or data used.
