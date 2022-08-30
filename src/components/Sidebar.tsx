import { memo } from "react";

const Sidebar = ({
  noteList,
  handler,
  noteId,
}: {
  noteList: {
    key: string;
    content: any;
  }[];
  handler: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    key: string
  ) => void;
  noteId: string;
}) => {
  return (
    <aside className="w-[230px] overflow-auto relative">
      <button className="w-full h-[50px] p-3 bg-white/30 backdrop-blur-sm hover:bg-slate-200 sticky top-0 left-0 border-b border-slate-200">
        Create
      </button>
      {noteList.length > 0 ? (
        <ul>
          {noteList.map((note) => {
            return (
              <li
                key={note.key}
                className={`w-full h-[50px] p-3 mb-3 rounded-md box-border cursor-pointer ${
                  noteId === note.key
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
        <div className="font-light text-slate-500">No Item yet</div>
      )}
    </aside>
  );
};

export default memo(Sidebar);
