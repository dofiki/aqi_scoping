"use client";

import Design from "../component/ui/Design";
import LoginForm from "../component/LoginForm";

export default function Page() {
  return (
    <div className="h-[80vh] items-center pt-10">
      <div className="p-5 h-full flex justify-center pt-25 ">
        <div
          className="md:w-[800px] md:h-[500px] w-full flex flex-col md:flex-row
          shadow-lg shadow-black/40 rounded-lg "
        >
          <Design />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
