import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { getNoteList } from "../_utils/getNoteList";

const Sidebar = ({
  noteList,
  handler,
  noteKey,
  setNoteKey,
  setNoteList,
}: {
  noteList: {
    key: string;
    content: any;
  }[];
  handler: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    key: string
  ) => void;
  noteKey: string;
  setNoteKey: Dispatch<SetStateAction<string>>;
  setNoteList: (
    value: SetStateAction<
      {
        key: string;
        content: any;
      }[]
    >
  ) => void;
}) => {
  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newNoteKey = uuidv4();

    // localStorage.setItem(newNoteKey, "");
    chrome.storage.sync.set({ newNoteKey: "" });
    setNoteKey(newNoteKey);

    const notes = getNoteList();
    setNoteList(notes);
  };

  const handleDelete = (noteKey: string) => {
    if (!window.confirm("Do you really want to delete the note?")) return;

    localStorage.removeItem(noteKey);

    const notes = getNoteList();
    setNoteList(notes);
  };

  return (
    <aside className="w-[230px] overflow-auto relative">
      <button
        onClick={(e) => handleCreate(e)}
        className="flex items-center justify-center gap-x-2 w-full h-[50px] p-3 bg-white/60 backdrop-blur-sm hover:bg-slate-200 sticky top-0 left-0 border-b border-slate-200"
      >
        <IoCreateOutline />
        Create
      </button>
      {noteList.length > 0 ? (
        <ul>
          {noteList.map((note) => {
            return (
              <li
                key={note.key}
                onClick={(e) => handler(e, note.key)}
                className={`flex items-center justify-between gap-x-2 w-full h-[50px] p-3 mb-3 box-border cursor-pointer note-list-item ${
                  noteKey === note.key
                    ? "bg-slate-200 hover:bg-slate-200"
                    : "hover:bg-slate-100"
                }`}
              >
                {note.content.slice(0, 10) || "No Title"}
                <IoTrashOutline
                  className="hidden"
                  onClick={(e) => {
                    e.preventDefault();

                    handleDelete(note.key);
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="font-light text-slate-500 w-full h-[50px] p-3 text-center">
          No Note Yet
        </div>
      )}
    </aside>
  );
};

export default memo(Sidebar);
