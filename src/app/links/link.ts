export interface Link {
  id?: string;
  url: string;
  visibility: Visibility | string;
  tags?: string[];
}

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private'
}
