import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('Error fetching all tasks', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.error('Error deleting task', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
