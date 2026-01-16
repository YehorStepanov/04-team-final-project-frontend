import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export const getFormattedDate = (date: string) => {
  return format(date, 'd MMMM yyyy', { locale: uk });
};
