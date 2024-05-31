import Image from "next/image";

const PageWrapper = ({ children, bottom }) => {
  return (
    <div className=" relative flex flex-col mr-[100px] ml-[100px]  pr-[30px] pl-[30px] min-w-[660px] min-h-[440px] bg-capuccino rounded-3xl relative justify-center items-center self-center">
      <Image
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
