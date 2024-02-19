export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dateCreated: Date;
  completed: boolean;
  isSetReminder: boolean;
  date: Date;
}
