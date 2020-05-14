export type Story = {
  type: 'story',
  id: number,
  title: string,
  descendants: number,
  by: string,
  time: number,
  kids: number[],
  score: number,
  url: string,
}