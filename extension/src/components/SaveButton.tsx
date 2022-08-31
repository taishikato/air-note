const SaveButton = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className="text-sm px-5 py-2 font-medium z-50 text-white rounded-full bg-slate-700 hover:bg-slate-900 shadow-button bg-transition"
      onClick={handler}
    >
      Save
    </button>
  );
};

export default SaveButton;
