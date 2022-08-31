const SaveButton = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className="px-5 py-3 z-50 text-white rounded-full bg-slate-700 hover:bg-slate-900 shadow-button"
      onClick={handler}
    >
      Save
    </button>
  );
};

export default SaveButton;
