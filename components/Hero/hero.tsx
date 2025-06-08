import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen text-slate-300 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Image"
          fill
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900 opacity-70"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h1 className="font-extrabold text-7xl leading-20 mb-3 capitalize px-2">
          Find Your Perfect Stay in Seconds
        </h1>
        <p className="text-2xl font-light text-slate-300 mb-8 p-2 pb-4">
          Book trusted hotels easily, fast, and reliable hotel booking for every journey
        </p>
        <div className="flex gap-5">
          <Link
            href="/room"
            className="bg-blue-600 text-slate-300 hover:bg-blue-700 cursor-pointer px-5 md:px-8 text-xl py-2 shadow-lg rounded-sm"
          >
            Explore Nows?
          </Link>
          {/* <Link
            href="/contact"
            className="bg-blue-600 text-slate-300 hover:bg-blue-500 cursor-pointer px-5 md:px-8 text-lg py-2 shadow-md font-semibold"
          >
            Contact
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
