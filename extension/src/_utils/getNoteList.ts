export const getNoteList = () =>
  Object.keys(localStorage).map((noteKey) => {
    return { key: noteKey, content: localStorage[noteKey] };
  });
