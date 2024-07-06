export function IntroContainer({
  onClose,
  children,
}: {
  onClose: () => void;
  children: any;
}) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="intro-container">
      <div className="info">{children}</div>
      <button className="close-button" onClick={handleCloseClick}>
        ×
      </button>
    </div>
  );
}
