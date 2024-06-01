import React from "react";

import PageWrapper from "./PageWrapper";

const LoadingPage = () => {
  const body = (
    <div className="w-full h-[200px] flex flex-col justify-center items-center">
      <p>Wait a second please.</p>
      <p>Your smart contract is being generated.</p>
    </div>
  );

  return <PageWrapper>{body}</PageWrapper>;
};

export default LoadingPage;
