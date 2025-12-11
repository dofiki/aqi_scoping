import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="text-4xl">users:</div>
      <ul>
        <li>
          <Link href="user/1">user 1</Link>
        </li>
        <li>
          <Link href="user/2">user 2</Link>
        </li>
        <li>
          <Link href="user/3">user 3</Link>
        </li>
      </ul>
    </main>
  );
};

export default page;
