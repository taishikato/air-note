import type { Note, NoteList } from "../types";

const isProd = import.meta.env.PROD;

export const getNoteList = isProd
  ? async (): Promise<NoteList[]> => {
      const notes: Note = await chrome.storage.sync.get(null);
      return Object.keys(notes)
        .map((key) => ({
          key,
          content: notes[key].content,
          created_at: notes[key].created_at,
          modified_at: notes[key].modified_at,
        }))
        .sort((a, b) => b.modified_at - a.modified_at);
    }
  : (): NoteList[] => {
      if (Object.keys(localStorage).length === 0) return [];

      return Object.keys(localStorage)
        .map((noteKey) => {
          return {
            key: noteKey,
            content: JSON.parse(localStorage[noteKey] ?? "").content,
            created_at: JSON.parse(localStorage[noteKey] ?? "").created_at,
            modified_at: JSON.parse(localStorage[noteKey] ?? "").modified_at,
          };
        })
        .sort((a, b) => b.modified_at - a.modified_at);
    };
