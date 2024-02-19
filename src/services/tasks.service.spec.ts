import { TasksService } from './tasks.service';
import { tasks } from '../../data/db.json';

describe('Tasks Service', () => {
  it('should return the tasks list empty', async () => {
    jest.spyOn(TasksService, 'getAllTasks').mockResolvedValue(tasks);
    const response = await TasksService.getAllTasks();
    expect(response).toEqual(tasks);
  });

  it('should return the single task with details', async () => {
    jest.spyOn(TasksService, 'getTask').mockResolvedValue(tasks[0]);
    const response = await TasksService.getTask(tasks[0].id);
    expect(response).toEqual(tasks[0]);
  });

  it('should update a single task and return with updated details', async () => {
    let updatedTask = {...tasks[0], title: "New Title!"}
    jest.spyOn(TasksService, 'updateTask').mockResolvedValue(updatedTask);
    const response = await TasksService.updateTask(updatedTask);
    expect(response).toEqual(updatedTask);
  });

  it('should delete a task given and id', async () => {
    jest.spyOn(TasksService, 'deleteTask').mockResolvedValue();
    let poppedTask = tasks.shift()
    jest.spyOn(TasksService, 'getAllTasks').mockResolvedValue(tasks);
    await TasksService.deleteTask(poppedTask);
    expect(tasks.filter(x => x.id == poppedTask.id).length).toEqual(0);
  });

  
});
