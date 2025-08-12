import Marquee from "react-fast-marquee";

const MarqueeBanner = () => {
  return (
    <div className="w-full fixed top-0 left-0 right-0 bg-[#FDD08D] text-headerText py-1 z-50">
      <Marquee gradient={false} speed={50} pauseOnHover={true} className="text-headerText">
        <span className="mx-20 text-red-700 font-bold">
          ⚠ This website is a personal project – orders placed here are not real.
        </span>
      </Marquee>
    </div>
  );
};

export default MarqueeBanner;