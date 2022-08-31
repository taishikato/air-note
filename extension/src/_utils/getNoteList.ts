// export const getNoteList = () =>
//   Object.keys(localStorage).map((noteKey) => {
//     return { key: noteKey, content: localStorage[noteKey] };
//   });

export const getNoteList = async () => {
  const notes = await chrome.storage.sync.get(null);
  return Object.keys(notes).map((key) => ({ key, content: notes[key] }));
};
