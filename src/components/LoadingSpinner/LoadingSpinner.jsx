import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{t('common.loading')}</p>
    </div>
  );
}; 