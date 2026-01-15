import Image from "next/image";

export default function Hero2() {
  return (
    <>
      <div className="relative h-screen overflow-x-clip w-screen flex items-center justify-end ">
        <div className="absolute inset-0">
          <Image
            src="/images/1768148192084.jpg"
            alt="Cuisine Detail"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="">
          <h1 className="font-heading text-[11vw] md:text-[8.5vw] lg:text-[8.5vw] font-extrabold leading-[0.85]  tracking-tightest -translate-x-10 font-heading  text-bgBlack">
            Umar <br /> Abdullah
          </h1>
          <p className="text-xl  md:text-2xl font-semibold absolute right-25 text-bgBlack/90  leading-relaxed">
            Full-Stack Developer
          </p>
        </div>
      </div>
    </>
  );
}
