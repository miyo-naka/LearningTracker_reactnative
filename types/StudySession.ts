export type StudySession = {
  id: number;
  start_time: string;
  end_time: string | null;
  category: string;
  content?: string;
};
