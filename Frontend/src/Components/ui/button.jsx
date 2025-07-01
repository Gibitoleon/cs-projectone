// Minimal Button component
export function Button({ children, onClick, className, variant }) {
  let base = "px-4 py-2 rounded shadow focus:outline-none transition-all ";
  if (variant === "outline") {
    base += "bg-white border ";
  } else {
    base += "bg-blue-600 text-white ";
  }
  return (
    <button onClick={onClick} className={base + (className || "")}>{children}</button>
  );
}
