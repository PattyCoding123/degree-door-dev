

interface ButtonProps 
extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
};

export function Button(props: ButtonProps) {
  const activeButton = "inline-block px-6 py-2.5 bg-rose-400 text-white font-medium cursor-pointer " +
  "text-sm leading-tight uppercase rounded shadow-md hover:opacity-80 hover:shadow-lg hover:scale-90 "+
  "duration-200 ease-in-out";

  const disabledButton = "inline-block px-6 py-2.5 bg-rose-400 text-white font-medium " +
  "text-sm leading-tight uppercase rounded shadow-md opacity-50";

  const { specialProp, className, disabled, ...rest } = props;
  return <button
    className={(disabled ? disabledButton : activeButton) + " " + className}
    disabled={disabled}
    { ...rest } />;
}

