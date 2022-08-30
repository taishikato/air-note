import type { Dispatch } from "react";
import { memo } from "react";

const TogglePreviewButton = ({
  showPre,
  setShowPre,
}: {
  showPre: boolean;
  setShowPre: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="absolute px-4 py-2 text-xs font-medium border rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 top-4 right-6 shadow-button"
      onClick={(e) => {
        e.preventDefault();

        setShowPre((prev) => !prev);
      }}
    >
      {showPre ? "Hide Preview" : "Show Preview"}
    </button>
  );
};

export default memo(TogglePreviewButton);
