import * as yup from 'yup';
import i18next from 'i18next';

export const postSchema = yup.object({
  title: yup
    .string()
    .required(i18next.t('forms.required'))
    .max(100, i18next.t('forms.maxLength', { count: 100 })),
  body: yup
    .string()
    .required(i18next.t('forms.required'))
    .max(500, i18next.t('forms.maxLength', { count: 500 }))
}); 