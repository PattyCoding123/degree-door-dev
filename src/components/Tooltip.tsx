interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 z-10 flex w-40 scale-0 rounded bg-gray-800 p-2 text-sm text-white transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
