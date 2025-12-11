import React from "react";

const userDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>user {id}</div>;
};

export default userDetail;
