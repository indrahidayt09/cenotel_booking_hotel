import Image from "next/image";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <header className="relative h-60 text-slate-200 overflow-hidden">
        <div className="absolute inset-0">
            <Image src="/images/hero.jpg" alt="header image" fill className="object-cover object-center w-full h-full" />
            <div className="absolute inset-0 bg-slate-900 opacity-70"></div>
        </div>
        <div className="relative flex flex-col pt-14 text-center h-60 justify-center items-center">
            <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
            <h4 className="text-xl text-slate-300">{subtitle}</h4>
        </div>
    </header>
  )
};

export default Header;
