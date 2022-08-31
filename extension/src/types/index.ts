export type Note = {
  [key: string]: NoteProperty;
};

export type NoteProperty = {
  content: string;
  created_at: number;
  modified_at: number;
};
