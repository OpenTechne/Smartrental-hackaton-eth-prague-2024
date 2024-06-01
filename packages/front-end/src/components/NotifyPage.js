import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Button, Input } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";

const NotifyPage = ({ contractDeployData, onClick, setView }) => {
  const [tenantEmail, setTenantEmail] = useState("");
  const buttons = (
    <div className="mr-4">
      <Button
        className="m-[10px]"
        onClick={() => {
          setTenantEmail("");
          setView("UPLOAD");
        }}
        fontFamily="mulish"
      >
        Cancel
      </Button>
      <Button
        className="text-white bg-darkGreen hover:bg-opacity-80 transition ease-in-out duration-500 "
        colorScheme="black"
        disabled={!tenantEmail}
        onClick={onClick}
      >
        Notify
      </Button>
    </div>
  );

  const body = (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-[20px]">
        <p>Congratulations, your contract has been deployed!</p>
      </div>

      <Link href={contractDeployData.contractLink} isExternal>
        {contractDeployData.contractAddress}
        <ExternalLinkIcon mx="2px" />
      </Link>
      <p className="text-center mt-[15px]">
        You now may add the tenant’s email and notify them.
      </p>
      <Input
        placeholder="Enter your tenant’s email here..."
        size="lg"
        type="email"
        className="text-center my-[20px] border-black"
        width="350px"
        bg="white"
        value={tenantEmail}
        onChange={(e) => setTenantEmail(e.target.value)}
      />
    </div>
  );

  return <PageWrapper bottom={buttons}>{body}</PageWrapper>;
};

export default NotifyPage;
