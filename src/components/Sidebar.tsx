import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

const Sidebar = ({
  noteList,
  handler,
  noteKey,
  setNoteKey,
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
}) => {
  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newNoteKey = uuidv4();

    localStorage.setItem(newNoteKey, "");
    setNoteKey(newNoteKey);
  };

  return (
    <aside className="w-[230px] overflow-auto relative">
      <button
        onClick={(e) => handleCreate(e)}
        className="w-full h-[50px] p-3 bg-white/60 backdrop-blur-sm hover:bg-slate-200 sticky top-0 left-0 border-b border-slate-200"
      >
        Create
      </button>
      {noteList.length > 0 ? (
        <ul>
          {noteList.map((note) => {
            return (
              <li
                key={note.key}
                className={`w-full h-[50px] p-3 mb-3 rounded-md box-border cursor-pointer ${
                  noteKey === note.key
                    ? "bg-slate-200 hover:bg-slate-200"
                    : "hover:bg-slate-100"
                }`}
                onClick={(e) => handler(e, note.key)}
              >
                {note.content.slice(0, 10) || "Empty note"}
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
