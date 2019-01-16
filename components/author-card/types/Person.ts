/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Person
// ====================================================

export interface Person_person_photo {
  __typename: "FileField";
  url: string | null;
}

export interface Person_person {
  __typename: "PersonRecord";
  id: any;
  name: string | null;
  photo: Person_person_photo | null;
}

export interface Person {
  /**
   * Returns a specific record
   */
  person: Person_person | null;
}

export interface PersonVariables {
  id: any;
}
