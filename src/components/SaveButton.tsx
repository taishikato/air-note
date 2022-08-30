const SaveButton = ({
  handler,
}: {
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className="px-5 py-3 text-white rounded-full bg-slate-700 hover:bg-slate-900"
      style={{
        boxShadow: "0px 0px 10px 4px rgba(30,41,59,0.19)",
        transition: "all 300ms",
      }}
      onClick={handler}
    >
      Save
    </button>
  );
};

export default SaveButton;
