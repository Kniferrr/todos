export interface TaskInterface {
  task: string;
  completed: boolean;
  index: string;
}

export interface errorFetchInterface {
  fetchFunction: string;
  taskinfo: TaskInterface;
}
