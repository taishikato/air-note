import { memo, useEffect, useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SaveButton from "./components/SaveButton";
import Sidebar from "./components/Sidebar";
import { v4 as uuidv4 } from "uuid";
import { getNoteList } from "./_utils/getNoteList";

function App() {
  const [content, setContent] = useState("");
  const [noteKey, setNoteKey] = useState("");
  const [noteList, setNoteList] = useState<
    {
      key: string;
      content: any;
    }[]
  >([]);

  const [showPre, setShowPre] = useState(true);

  const previewRef = useRef<any>(null);

  const handleCreate = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();

    const newNoteKey = uuidv4();

    localStorage.setItem(newNoteKey, "");
    setNoteKey(newNoteKey);
  };

  useEffect(() => {
    const notes = getNoteList();

    if (notes.length === 0) {
      handleCreate();
      const notes = getNoteList();
      setNoteList(notes);
      return;
    }

    setNoteList(notes);
    setNoteKey(notes[0].key);
  }, []);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      setContent(e.currentTarget.value);
    },
    [setContent]
  );

  const handleSave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      localStorage.setItem(noteKey, content);
      const notes = getNoteList();

      setNoteList(notes);
    },
    [noteKey, content, setNoteList]
  );

  const showPastNote = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, key: string) => {
      e.preventDefault();

      const content = localStorage.getItem(key);
      setContent(content ?? "");
      setNoteKey(key);
    },
    [setContent, setNoteKey]
  );

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-screen">
      <button
        className="absolute px-4 py-2 text-xs font-medium border rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 top-4 right-6 shadow-button"
        onClick={(e) => {
          e.preventDefault();

          setShowPre(!showPre);
        }}
      >
        {showPre ? "Hide Preview" : "Show Preview"}
      </button>
      <div className="flex w-full h-screen">
        <Sidebar
          noteList={noteList}
          handler={showPastNote}
          noteKey={noteKey}
          setNoteKey={setNoteKey}
          setNoteList={setNoteList}
        />
        <main className="flex items-stretch flex-1 rounded">
          <div className="flex-1 bg-slate-200">
            <textarea
              className="block w-full h-full p-3 text-white bg-slate-800 focus:outline-none"
              onChange={(e) => handleOnChange(e)}
              placeholder="jot down whatever you want..."
              value={content}
            />
          </div>
          <div
            className={`flex-1 ${showPre ? "block" : "hidden"}`}
            ref={previewRef}
          >
            <div id="preview" className="h-full p-3 overflow-auto rounded-r-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </main>
      </div>
      <div className="absolute flex justify-end mt-6 bottom-4 right-6">
        <SaveButton
          handler={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleSave(e)
          }
        />
      </div>
    </div>
  );
}

export default memo(App);
