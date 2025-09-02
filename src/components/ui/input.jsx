export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-2xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}
