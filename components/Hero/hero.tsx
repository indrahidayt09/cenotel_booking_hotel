import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-1/2 text-white gap-5">
      <div className="w-full h-screen relative">
        <Image
          src="/images/hero2.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
        />
        <div className="absolute w-full h-full bg-black opacity-60"></div>
        <h1 className="absolute w-full font-semibold text-center text-5xl md:text-7xl xl:text-8xl leading-15 md:leading-25 shadow-md  capitalize z-10 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          Find Your Perfect <br /> Stay in Seconds
        </h1>
        <Link
          href="/room"
          className="absolute uppercase font-semibold right-0 bottom-0 text-white hover:underline cursor-pointer p-5 text-sm rounded-sm"
        >
          Explore Nows
        </Link>

      </div>
    </div>
  );
};

export default Hero;
