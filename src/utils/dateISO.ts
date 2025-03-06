export function getCurrentDateTime(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Получаем текущий часовой пояс в формате UTC+X:XX
  const timezoneOffset = -date.getTimezoneOffset(); // В минутах
  const timezoneSign = timezoneOffset >= 0 ? "+" : "-";
  const timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60)
    .toString()
    .padStart(2, "0");
  const timezoneMinutes = (Math.abs(timezoneOffset) % 60)
    .toString()
    .padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${timezoneHours}${timezoneMinutes}`;
}
