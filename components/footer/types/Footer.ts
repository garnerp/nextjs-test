/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Footer
// ====================================================

export interface Footer_globalFooter_allProductLinks {
  __typename: "LinkRecord";
  external: any | null;
  title: string | null;
  url: string | null;
}

export interface Footer_globalFooter_companyLinks {
  __typename: "LinkRecord";
  external: any | null;
  title: string | null;
  url: string | null;
}

export interface Footer_globalFooter_disclaimerLinks {
  __typename: "LinkRecord";
  external: any | null;
  title: string | null;
  url: string | null;
}

export interface Footer_globalFooter_partnerLinks {
  __typename: "LinkRecord";
  external: any | null;
  title: string | null;
  url: string | null;
}

export interface Footer_globalFooter_resourcesLinks {
  __typename: "LinkRecord";
  external: any | null;
  title: string | null;
  url: string | null;
}

export interface Footer_globalFooter_primaryLogo {
  __typename: "FileField";
  alt: string | null;
  url: string | null;
}

export interface Footer_globalFooter_socialLinks_network_icon {
  __typename: "FileField";
  alt: string | null;
  url: string | null;
}

export interface Footer_globalFooter_socialLinks_network {
  __typename: "SocialNetworkIconRecord";
  icon: Footer_globalFooter_socialLinks_network_icon | null;
  name: string | null;
}

export interface Footer_globalFooter_socialLinks {
  __typename: "SocialNetworkRecord";
  network: Footer_globalFooter_socialLinks_network | null;
  url: string | null;
}

export interface Footer_globalFooter {
  __typename: "GlobalFooterRecord";
  allProductLinks: (Footer_globalFooter_allProductLinks | null)[] | null;
  companyLinks: (Footer_globalFooter_companyLinks | null)[] | null;
  disclaimerLinks: (Footer_globalFooter_disclaimerLinks | null)[] | null;
  partnerLinks: (Footer_globalFooter_partnerLinks | null)[] | null;
  resourcesLinks: (Footer_globalFooter_resourcesLinks | null)[] | null;
  primaryLogo: Footer_globalFooter_primaryLogo | null;
  socialLinks: (Footer_globalFooter_socialLinks | null)[] | null;
}

export interface Footer {
  /**
   * Returns the single instance record
   */
  globalFooter: Footer_globalFooter | null;
}
