export function calculateSizeFile(size: number | undefined): string {
  if (!size) return "0 Б";
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 512) return `${(size / 1024).toFixed(2)} КБ`;
  return `${(size / 1024 ** 2).toFixed(2)} МБ`;
}
