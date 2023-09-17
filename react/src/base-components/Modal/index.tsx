// Modal.js
import React from 'react';
import PropTypes from 'prop-types';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed mt-44 inset-0 flex items-center justify-center z-50 mr-40">
      <div className="modal-overlay"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          {children}
          <div className="mt-4 text-center">
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
