import { useEffect } from 'react';

export default function Modal({ title, onClose, children }) {
  // Close with the Esc key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div id="careSyncModal">
      {/* Clicking the dark overlay (outside the box) closes the modal */}
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-box">
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>

          <h2>{title}</h2>

          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
