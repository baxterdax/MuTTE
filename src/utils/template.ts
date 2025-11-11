export function renderTemplate(input: string, vars?: Record<string, any>): string {
  if (!input) return '';
  if (!vars) return input;
  return input.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, key) => {
    const val = vars[key];
    return val === undefined || val === null ? '' : String(val);
  });
}
