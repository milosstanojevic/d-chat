export interface Message {
  _id?: string;
  message: string;
  author: string;
  timestamp: number | string;
  token?: string;
}
