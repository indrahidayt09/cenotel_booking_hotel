import Header from "@/components/Header-/Header";
import Image from "next/image";
import { MdRemoveRedEye } from "react-icons/md";
import { IoIosLocate } from "react-icons/io";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are",
};

const AboutPage = () => {
  return (
    <div>
      <Header title="Inside Cenotel" subtitle="Redefining the Way You Stay" />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Image */}
          <Image
            src="/images/about.jpg"
            alt="about image"
            width={650}
            height={579}
            className="w-full h-auto rounded-sm shadow-md object-cover"
          />

          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Get to Know Us
            </h1>
            <p className="text-slate-600 leading-relaxed mb-6">
              <span className="text-blue-500 font-semibold">Cenotel</span> is a
              modern hotel solution for those seeking comfort, convenience, and
              a top-tier stay experience. We combine technology with quality
              service to deliver a new way of booking and enjoying hotels — all
              from the palm of your hand.
            </p>

            <ul className="space-y-6 pt-6">
              {/* Vision */}
              <li className="flex items-start gap-4">
                <MdRemoveRedEye className="text-slate-400 mt-1 size-9" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-1">
                    Our Vision
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To become the leading digital hotel platform in Southeast
                    Asia by delivering a modern, efficient, and reliable stay
                    experience for everyone.
                  </p>
                </div>
              </li>

              {/* Mission */}
              <li className="flex items-start gap-4">
                <IoIosLocate className="text-slate-400 mt-1 size-7" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-1">
                    Our Mission
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To make hotel stays easier, more comfortable, and reliable
                    through smart technology and trusted service.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
