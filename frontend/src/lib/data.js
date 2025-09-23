export const FilterType = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export const options = [
  { value: 'today', label: 'today' },
  { value: 'week', label: 'this week' },
  { value: 'month', label: 'this month' },
  { value: 'all', label: 'all' },
];

console.log('✅ data.js loaded!');

export const visibleTaskLimit = 4;
