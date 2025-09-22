import React from 'react';

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        My TodoX
      </h1>

      <p className="text-muted-foreground">
        A simple and efficient way to manage your tasks.
      </p>
    </div>
  );
};

export default Header;
