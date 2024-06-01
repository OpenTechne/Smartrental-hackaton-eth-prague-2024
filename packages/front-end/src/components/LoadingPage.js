import React from "react";

import PageWrapper from "./PageWrapper";

import Image from "next/image";

const LoadingPage = () => {
  const body = (
    <div className="w-full h-[150px] flex flex-col justify-center items-center border-[1px] border-dashed border-black rounded-lg mt-8">
      {/* <p>Wait a second please.</p> */}
      <p>Your smart contract is being generated. This may take a while.</p>
      <Image
        src="/loading.svg"
        height={48}
        width={48}
        className="animate-spin mt-[25px]"
        alt="Loading spinner"
      />
    </div>
  );

  return <PageWrapper bottom={null}>{body}</PageWrapper>;
};

export default LoadingPage;
