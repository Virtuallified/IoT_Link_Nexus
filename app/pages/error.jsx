"use client";

import React from "react";

const error = ({ error, reset }) => {
  return (
    <div>
      {error.message}
      <button onClick={reset}></button>
    </div>
  );
};

export default error;
