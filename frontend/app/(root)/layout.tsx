import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p className="text-red-600">(root)</p>
      {children}
    </div>
  );
};

export default layout;
