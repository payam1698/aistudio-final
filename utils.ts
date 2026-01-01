
export const toPersianDigits = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return 'تماس بگیرید';
  if (price === 0) return 'رایگان';
  return toPersianDigits(price.toLocaleString());
};

export const formatDuration = (hours: number | undefined, sessions: number | undefined): string => {
    if (!hours && !sessions) return '';
    return `${toPersianDigits(hours || 0)} ساعت${sessions ? ` (${toPersianDigits(sessions)} جلسه)` : ''}`;
};
