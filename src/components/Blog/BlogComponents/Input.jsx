export function Input({ type = "text", className, ...props }) {
    return (
      <input
        type={type}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-600 ${className}`}
        {...props}
      />
    );
  }
  