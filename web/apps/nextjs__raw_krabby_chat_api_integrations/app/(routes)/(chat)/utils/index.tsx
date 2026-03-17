export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatTime = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return '' + mins + ':' + secs.toString().padStart(2, '0');
};
