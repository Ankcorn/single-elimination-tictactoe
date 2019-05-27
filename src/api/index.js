export default async function aiMove(url, board) {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data.index;
}
