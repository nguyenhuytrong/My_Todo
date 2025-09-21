import AddTask from '@/components/AddTask';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import StatsAndFilters from '@/components/StatsAndFilters';
import React from 'react';

const HomePage = () => {
  return (
    <div className="container pt-8 mx-auto">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Header Section*/}
        <Header />

        {/* Create Task */}
        <AddTask />

        {/*Stats and Filters*/}
        <StatsAndFilters />

        {/* Task List */}
        <TaskList />

        {/*Date time filter*/}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination />
          <DateTimeFilter />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
