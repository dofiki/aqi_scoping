import Link from "next/link";

const page = () => {
  return (
    <div>
      <p>Welcome to dashboard</p>
      <ul>
        <li>
          <Link href="dashboard/user" className="underline text-blue-600">
            user
          </Link>
        </li>
        <li>
          <Link href="dashboard/analytics" className="underline text-blue-600">
            analytics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
