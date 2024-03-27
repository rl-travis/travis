//тут переменная locale - это локаль (строка формата ru-RU или en-US)
export default function reformatDateChats(time: number, locale: string) {
  const currentDate = new Date();
  const targetDate = new Date(time * 1000);

  const diffTime = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) {
    return targetDate.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffDays < 7) {
    return targetDate.toLocaleDateString(locale, { weekday: "short" });
  } else {
    return targetDate.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
