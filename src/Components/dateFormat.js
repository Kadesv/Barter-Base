export function dateFormat(rawValue) {
  const date = new Date(rawValue);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight as 12

  const paddedHours = hours.toString().padStart(2, '0');

  return `${month}/${day}/${year} ${paddedHours}:${minutes}${ampm}`;
}