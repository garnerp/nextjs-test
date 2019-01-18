/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPost
// ====================================================

export interface BlogPost_blogPost_author {
  __typename: "PersonRecord";
  id: any;
}

export interface BlogPost_blogPost {
  __typename: "BlogPostRecord";
  id: any;
  slug: string | null;
  body: string | null;
  date: any | null;
  author: BlogPost_blogPost_author | null;
}

export interface BlogPost {
  /**
   * Returns a specific record
   */
  blogPost: BlogPost_blogPost | null;
}

export interface BlogPostVariables {
  slug: string;
}
