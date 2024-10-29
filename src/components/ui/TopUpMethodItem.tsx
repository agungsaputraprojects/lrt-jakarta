import { ChevronRight } from "lucide-react";

interface TopUpMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const TopUpMethodItem = ({
  icon,
  title,
  description,
  onClick,
}: TopUpMethodProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <ChevronRight className="text-gray-400" />
    </button>
  );
};
