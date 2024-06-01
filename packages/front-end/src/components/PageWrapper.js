import Image from "next/image";

const PageWrapper = ({ children, bottom }) => {
  return (
    <div className=" relative flex flex-col mb-[100px] mr-[100px] ml-[100px] mt-[100px] pr-[60px] pl-[60px] pt-[90px] pb-[90px] min-w-[660px] max-w-[800px] bg-capuccino rounded-3xl justify-center items-center self-center">
      <Image
        alt="Smartrental"
        className="absolute top-0"
        src="/Logo.svg"
        width="250"
        height="85"
      />
      {children}
      <div className="w-full h-[80px] bg-fairGreen absolute bottom-0 rounded-b-3xl flex justify-end items-center">
        {bottom}
      </div>
    </div>
  );
};

export default PageWrapper;
