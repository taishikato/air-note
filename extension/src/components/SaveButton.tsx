import { memo } from "react";

const SaveButton = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className="text-sm px-6 py-3 font-medium z-50 text-white rounded-full bg-slate-700 hover:bg-slate-900 shadow-button bg-transition"
      onClick={handler}
    >
      Save
    </button>
  );
};

export default memo(SaveButton);
