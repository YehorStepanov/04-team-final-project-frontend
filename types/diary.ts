export interface Emotion {
  _id: string;
  title: string;
}

export interface Diary {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: Emotion[];
}
