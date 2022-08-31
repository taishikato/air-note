const isProd = import.meta.env.PROD;

export const getNoteList = isProd
  ? async () => {
      const notes = await chrome.storage.sync.get(null);
      return Object.keys(notes).map((key) => ({ key, content: notes[key] }));
    }
  : () =>
      Object.keys(localStorage).map((noteKey) => {
        return { key: noteKey, content: localStorage[noteKey] };
      });
