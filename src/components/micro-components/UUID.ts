export default function UUID(): string {
  const idLength = 6;
  let id = '';
  for (let i = 0; i < idLength; i++) {
    id += Math.floor(Math.random() * 10).toString();
  }
  return id;
}
