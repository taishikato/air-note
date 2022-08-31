const isProd = import.meta.env.PROD;

export const getNoteList = isProd
  ? async () => {
      const notes = await chrome.storage.sync.get(null);
      return Object.keys(notes).map((key) => ({
        key,
        content: notes[key].content,
      }));
    }
  : () => {
      if (Object.keys(localStorage).length === 0) return [];

      return Object.keys(localStorage).map((noteKey) => {
        return {
          key: noteKey,
          content: JSON.parse(localStorage[noteKey] ?? "").content,
        };
      });
    };
