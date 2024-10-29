interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export const ErrorPopup = ({
  isOpen,
  onClose,
  title = "KONFIRMASI PIN KEMBALI",
  message = "PIN yang kamu masukkan\nTIDAK SESUAI",
  buttonText = "Konfirmasi",
}: ErrorPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative z-10">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-black">{title}</h3>
          <p className="text-lg whitespace-pre-line text-black">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-xl mt-6 text-lg font-medium"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
