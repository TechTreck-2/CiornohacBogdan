export const getDaysBetween = (date1?: string, date2?: string): number => {
  if (!date1 || !date2) {
    return 0;
  }

  const d1 = new Date(date1!);
  const d2 = new Date(date2!);

  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};
