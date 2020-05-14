export type Comment = {
  type: 'comment',
  id: number,
  parent: number,
  text: string,
  by: string,
  kids?: number[],
  comments?: Comment[]
  time: number,
};