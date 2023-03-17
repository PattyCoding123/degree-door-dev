import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface GeneralLoadingIndicatorProps {
  size: "small" | "medium" | "large" | "extra-large";
}

// Provide set sizes from which the user can choose via
// the size prop.
const sizes = new Map<string, string>([
  ["small", "text-md"],
  ["medium", "text-xl"],
  ["large", "text-3xl"],
  ["extra-large", "text-5xl"],
]);

// A simple animated spinner component
const GeneralLoadingIndicator: React.FC<GeneralLoadingIndicatorProps> = ({
  size,
}) => {
  return (
    <AiOutlineLoading3Quarters
      className={`animate-spin font-bold ${sizes.get(size)}`}
    />
  );
};

export default GeneralLoadingIndicator;
