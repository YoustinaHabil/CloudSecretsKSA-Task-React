import { useTranslation } from 'react-i18next';

const ErrorFallback = () => {
  const { t } = useTranslation();
  
  return (
    <div className="error-container">
      <h2>{t('errors.something_went_wrong')}</h2>
      <button onClick={() => window.location.reload()}>
        {t('errors.try_again')}
      </button>
    </div>
  );
};

const LoadingSpinner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{t('common.loading')}</p>
    </div>
  );
}; 