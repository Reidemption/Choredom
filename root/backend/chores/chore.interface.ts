export interface BaseChore {
  name: string;
  due_date: string;
  description: string;
  repeated: boolean;
  frequency: string | null;
  room_area: string;
  completed: boolean;
}

export interface Chore extends BaseChore {
  id: number;
}
