import Image from "next/image";

const PageWrapper = ({ children, bottom }) => {
  return (
    <div className="bg-grid bg-cover flex justify-center min-h-screen h-full w-full">
      <div className="relative flex flex-col  m-[100px] py-[90px] px-[60px] min-w-[660px] max-w-[800px] bg-capuccino rounded-lg justify-center items-center self-center bg-opacity-90">
        <Image
          alt="Smartrental"
          className="absolute top-0"
          src="/Logo.svg"
          width="250"
          height="85"
        />
        {children}
        {bottom && (
          <div className="w-full h-[80px] bg-fairGreen absolute bottom-0 rounded-b-lg flex justify-end items-center">
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
