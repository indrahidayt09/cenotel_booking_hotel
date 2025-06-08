import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 py-8 w-full md:py-14">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Link href="/" className="mb-7 block">
              <Image
                src="/images/logo.png"
                width={150}
                height={150}
                alt="Hotel logo"
              />
            </Link>
            <p className="text-slate-400 max-w-70 font-thin">
              Cenotel is a smart hotel booking platform that connects travelers
              with trusted accommodations, offering seamless booking, clear
              pricing, and real-time availability.
            </p>
          </div>
          <div>
            <div className="flex gap-7">
              <div className="flex-1 md:flex-none">
                <h4 className="mb-7 text-xl text-slate-300">Links</h4>
                <ul className="list-items text-slate-400 space-y-5">
                  <li>
                    <Link href="/" className="hover:text-slate-500">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-slate-500">
                      About Use
                    </Link>
                  </li>
                  <li>
                    <Link href="/room" className="hover:text-slate-500">
                      Room
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-slate-500">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 md:flex-none">
                <h4 className="mb-7 text-xl text-slate-300">Legal</h4>
                <ul className="list-items text-slate-400 space-y-5">
                  <li>
                    <Link href="#" className="hover:text-slate-500">
                      Legal
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-slate-500">
                      Term & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-slate-500">
                      Payment Method
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-slate-500">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb-7 font-semibold text-xl text-slate-300">
              Newsletter
            </h1>
            <p className="text-slate-400 font-thin">
              Join our newsletter to get the best hotel offers, travel tips, and
              latest updates straight to your inbox.
            </p>
            <form action="" className="mt-4">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full rounded-sm p-3 bg-slate-600 text-slate-300 outline-0"
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer font-semibold text-slate-300 p-2 w-full ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-slate-500 py-5 text-center text-base text-slate-500">
        &copy; Copyright | Indra Hidayat | All Right Reserved
      </div>
    </footer>
  );
};
