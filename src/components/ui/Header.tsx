import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header = ({
  title,
  showBackButton = true,
  onBackClick,
}: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 rounded-b-lg shadow-lg">
      <div className="flex items-center h-14 px-4">
        {showBackButton && (
          <button onClick={onBackClick} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="text-lg font-medium text-black">{title}</h1>
      </div>
    </header>
  );
};
