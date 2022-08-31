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
  setContent,
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
  setContent: Dispatch<SetStateAction<string>>;
  setNoteList: (
    value: SetStateAction<
      {
        key: string;
        content: any;
      }[]
    >
  ) => void;
}) => {
  const handleCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newNoteKey = uuidv4();

    if (import.meta.env.PROD) {
      await chrome.storage.sync.set({ [newNoteKey]: "" });
    } else {
      localStorage.setItem(newNoteKey, "");
    }

    setNoteKey(newNoteKey);

    const notes = await getNoteList();
    setNoteList(notes);
    setContent("");
  };

  const handleDelete = async (noteKey: string) => {
    if (!window.confirm("Do you really want to delete the note?")) return;

    if (import.meta.env.PROD) {
      await chrome.storage.sync.remove(noteKey);
    } else {
      localStorage.removeItem(noteKey);
    }

    const notes = await getNoteList();
    setNoteList(notes);
  };

  return (
    <aside className="w-[290px] overflow-auto relative bg-slate-50 text-slate-400 font-medium">
      <button
        onClick={(e) => handleCreate(e)}
        className="font-semibold text-slate-500 flex items-center justify-center gap-x-2 w-full h-[80px] p-3 bg-white/60 backdrop-blur-sm hover:bg-slate-200 sticky top-0 left-0 border-b border-slate-200"
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
                className={`flex items-center justify-between gap-x-2 w-full h-[80px] p-3 mb-1 box-border cursor-pointer note-list-item ${
                  noteKey === note.key
                    ? "text-slate-500 bg-slate-200 hover:bg-slate-200"
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
