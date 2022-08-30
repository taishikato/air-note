const SaveButton = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className="px-8 py-3 text-white rounded-full bg-slate-700 hover:bg-slate-900"
      onClick={handler}
    >
      Save
    </button>
  );
};

export default SaveButton;
