import { memo, useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SaveButton from "./components/SaveButton";
import Sidebar from "./components/Sidebar";

const getNoteList = () =>
  Object.keys(localStorage)
    .sort()
    .map((noteKey) => {
      return { key: noteKey, content: localStorage[noteKey] };
    });

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

  useEffect(() => {
    if (noteKey.length > 0) return;

    const newId = uuidv4();
    setNoteKey(newId);

    // localStorage.clear();

    // localStorage.setItem(newId, content);
  }, []);

  useEffect(() => {
    const notes = getNoteList();

    setNoteList(notes);
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
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
      {/* <div className="flex justify-end mb-2">
          <button
            className="p-2 font-medium rounded-md text-slate-400 hover:bg-slate-200"
            onClick={(e) => {
              e.preventDefault();

              setShowPre(!showPre);
            }}
          >
            {showPre ? "Hide Preview" : "Show Preview"}
          </button>
        </div> */}
      <div className="flex w-full h-screen">
        <Sidebar noteList={noteList} handler={showPastNote} noteId={noteKey} />
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
      <div className="flex justify-end mt-6">
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
