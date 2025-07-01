// Minimal Card component
export function Card({ children, className }) {
  return <div className={`rounded-lg border bg-white p-4 shadow ${className || ''}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-2 border-b pb-2">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <div className={`font-bold text-lg ${className || ''}`}>{children}</div>;
}
