export const rbilOfficialEmail = 'admin@rbil.in';

export function buildMailto(to: string, subject: string, lines: string[]) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
