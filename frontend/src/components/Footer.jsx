import React from 'react';

const Footer = ({ completedTasksCount = 2, activeTasksCount = 3 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Well done! You have completed {completedTasksCount} tasks
                {activeTasksCount > 0 &&
                  `, continue working on ${activeTasksCount} remaining tasks.`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>You have {activeTasksCount} tasks remaining, keep going!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
