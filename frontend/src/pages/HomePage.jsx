import AddTask from '@/components/AddTask';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import StatsAndFilters from '@/components/StatsAndFilters';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Logic
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks. Please try again later.');
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  // Variables
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  // UI
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Header Section*/}
          <Header />

          {/* Create Task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/*Stats and Filters*/}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/* Task List */}
          <TaskList
            filteredTasks={filteredTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/*Date time filter*/}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          {/* Footer */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
