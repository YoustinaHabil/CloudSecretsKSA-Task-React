import React from 'react';
import './DeleteConfirmation.css';
import { useTranslation } from 'react-i18next';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation();
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{t('common.confirm')}</h2>
        <p>{t('postDetails.confirmDelete')}</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            {t('postDetails.yes')}
          </button>
          <button className="cancel-button" onClick={onCancel}>
            {t('postDetails.no')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation; 