export function Button(props: React.ComponentPropsWithoutRef<"button">) {
  const activeButton =
    "inline-block px-6 py-2.5 text-white font-medium cursor-pointer " +
    "text-sm leading-tight uppercase rounded shadow-md hover:opacity-80 hover:shadow-lg active:scale-90 " +
    "duration-100 ease-in-out";

  const disabledButton =
    "inline-block px-6 py-2.5 text-white font-medium " +
    "text-sm leading-tight uppercase rounded shadow-md opacity-50";

  const { className, disabled, ...rest } = props;
  return (
    <button
      className={(disabled ? disabledButton : activeButton) + " " + className}
      disabled={disabled}
      {...rest}
    />
  );
}
