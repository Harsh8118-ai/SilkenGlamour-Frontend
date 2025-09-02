import { User } from "lucide-react";

// Avatar wrapper
export const Avatar = ({ children, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div
      className={`rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ${sizeClasses[size]}`}
    >
      {children}
    </div>
  );
};

// Avatar image
export const AvatarImage = ({ src, alt = "User Avatar" }) => (
  <img src={src} alt={alt} className="object-cover w-full h-full" />
);

// Fallback when no image is available
export const AvatarFallback = () => (
  <User className="text-gray-500 w-full h-full p-2" />
);
