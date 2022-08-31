import { memo, useEffect, useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import SaveButton from "./components/SaveButton";
import Sidebar from "./components/Sidebar";
import { v4 as uuidv4 } from "uuid";
import { getNoteList } from "./_utils/getNoteList";
import TogglePreviewButton from "./components/TogglePreviewButton";
import getUnixTime from "./_utils/getUnixTime";

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

  const handleCreate = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();

    const newNoteKey = uuidv4();
    const timestamp = getUnixTime();

    if (import.meta.env.PROD) {
      await chrome.storage.sync.set({
        [newNoteKey]: { content: "", created_at: timestamp },
      });
    } else {
      localStorage.setItem(
        newNoteKey,
        JSON.stringify({ content: "", created_at: timestamp })
      );
    }

    setNoteKey(newNoteKey);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNoteList();

      if (notes.length === 0) {
        handleCreate();
        const notes = await getNoteList();
        setNoteList(notes);
        setContent(notes[0].content);
        return;
      }

      setNoteList(notes);
      setNoteKey(notes[0].key);
      setContent(notes[0].content);
    };

    fetchNotes();
  }, []);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      setContent(e.currentTarget.value);
    },
    [setContent]
  );

  const handleSave = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (import.meta.env.PROD) {
        const note = await chrome.storage.sync.get(noteKey);
        await chrome.storage.sync.set({
          [noteKey]: { content, created_at: note[noteKey].created_at },
        });
      } else {
        const note = localStorage.getItem(noteKey);
        const jsonNote = JSON.parse(note ?? "");
        localStorage.setItem(
          noteKey,
          JSON.stringify({
            content,
            created_at: jsonNote.created_at,
          })
        );
      }

      const notes = await getNoteList();

      setNoteList(notes);
    },
    [noteKey, content, setNoteList]
  );

  const showPastNote = useCallback(
    async (e: React.MouseEvent<HTMLLIElement, MouseEvent>, key: string) => {
      e.preventDefault();

      let content;
      if (import.meta.env.PROD) {
        const keyValue = await chrome.storage.sync.get(key);
        content = keyValue[key];
      } else {
        content = localStorage.getItem(key);
      }
      setContent(content ?? "");
      setNoteKey(key);
    },
    [setContent, setNoteKey]
  );

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-screen text-base">
      <TogglePreviewButton showPre={showPre} setShowPre={setShowPre} />
      <div className="flex w-full h-screen">
        <Sidebar
          noteList={noteList}
          handler={showPastNote}
          noteKey={noteKey}
          setNoteKey={setNoteKey}
          setContent={setContent}
          setNoteList={setNoteList}
        />
        <main className="flex flex-1 rounded z-10 shadow-border-l">
          <div className="flex-1 bg-slate-200">
            <textarea
              className="block w-full h-full p-3 focus:outline-none"
              onChange={(e) => handleOnChange(e)}
              placeholder="jot down whatever you want..."
              value={content}
            />
          </div>
          <div
            className={`flex-1 ${showPre ? "block" : "hidden"}`}
            ref={previewRef}
          >
            <div
              id="preview"
              className="h-full p-3 overflow-auto border-l border-slate-200"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </main>
      </div>
      <div className="absolute flex justify-end mt-6 bottom-6 right-6">
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
