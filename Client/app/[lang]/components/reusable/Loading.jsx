import React from "react";
import { useRouter } from "next/navigation";
import { Chip, Spinner } from "@nextui-org/react";

export const Loading = () => {
  return (
    <Spinner
      label="Loading..."
      color="secondary"
      labelColor="secondary"
      className="flex justify-center items-center h-screen"
    />
  );
};

export const NotAuthenticated = () => {
  const router = useRouter();
  return (
    <>
      <Chip color="danger" variant="bordered">
        Not authenticated.
      </Chip>
      {setTimeout(() => router.push("/login"), 2000)}
    </>
  );
};
