import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Home() {
  return (
    <div>
      <section className=" overflow-hidden pb-9 px-4 md:px-8 ">
        <section className="relative flex flex-col-reverse md:flex-row mx-auto justify-between items-center gap-9 md:gap-4 max-w-[1300px] py-4  my-12">
          <svg
            width="736"
            height="423"
            className="absolute top-[50px] sm:top-[200px] sm:right-[-150px]"
            viewBox="0 0 736 423"
            fill="none"
          >
            <path
              d="M738.5 4.5C491.667 -7.66666 -0.900015 58.9 3.49999 422.5"
              stroke="url(#paint0_linear_16_172)"
              strokeWidth="6"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_16_172"
                x1="700.5"
                y1="-3.99998"
                x2="14.5"
                y2="361"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#343045"></stop>
                <stop offset="0.213542" stopColor="#C0B7E8"></stop>
                <stop offset="0.71875" stopColor="#8176AF"></stop>
                <stop offset="1" stopColor="#343045"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="absolute sm:right-28 md:right-6"
            width="383"
            height="846"
            viewBox="0 0 383 846"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.19293 0C-0.0879101 140.127 37.2087 433.314 212.642 485.053C388.075 536.792 391.776 746.576 371.697 845"
              stroke="url(#paint0_linear_16_173)"
              strokeWidth="6"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_16_173"
                x1="16.5"
                y1="39.5"
                x2="363"
                y2="814"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0104167" stopColor="#343045"></stop>
                <stop offset="0.229167" stopColor="#C0B7E8"></stop>
                <stop offset="0.776042" stopColor="#8176AF"></stop>
                <stop offset="1" stopColor="#343045"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="absolute -top-14 sm:right-7"
            width="416"
            height="675"
            viewBox="0 0 416 675"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M415 3C325.774 17.8434 155.913 102.224 190.271 320.998C224.63 539.772 78.4065 646.155 1 672"
              stroke="url(#paint0_linear_16_171)"
              strokeWidth="6"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_16_171"
                x1="365.5"
                y1="28"
                x2="110"
                y2="594"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#343045"></stop>
                <stop offset="0.276042" stopColor="#8176AF"></stop>
                <stop offset="0.739583" stopColor="#C0B7E8"></stop>
                <stop offset="1" stopColor="#343045"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="md:w-[520px]  z-20">
            <h1 className="text-3xl md:text-[36px] lg:text-[46px] leading-[56px] dark:text-white text-black font-bold">
              Welcome to
              <span className="dark:text-purple-300 text-blue-500">
                {" "}
                ShopiWafy{" "}
              </span>
            </h1>
            <p className="text-base text-black dark:text-white mt-4 md:mt-9 mb-10 md:mb-16">
              We specialize in{" "}
              <span className="dark:text-purple-300 text-blue-500">
                {" "}
                sportswear{" "}
              </span>
              for{" "}
              <span className="dark:text-purple-300 text-blue-500">
                {" "}
                men
              </span>{" "}
              and{" "}
              <span className="dark:text-purple-300 text-blue-500">
                {" "}
                children
              </span>
              . We hope you have a pleasant experience with our online store.
            </p>
            <div className="flex gap-6 sm:gap-10 items-center">
              <Link
                to="/products"
                className="uppercase font-bold text-xs rounded-[40px] py-2 lg:py-4 px-4 lg:px-9 text-slate-950 bg-gradient-to-r from-blue-400 to-blue-200 hover:from-blue-500 hover:to-blue-300 dark:from-purple-400 dark:to-purple-200 dark:hover:from-purple-500 dark:hover:to-purple-300"
              >
                Shoping Now
              </Link>
              <FaArrowRightLong className=" text-5xl dark:text-purple-300 text-blue-500" />
            </div>
          </div>
          <div className="p-4 z-20 bg-blue-400 dark:bg-purple-400 rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] bg-opacity-10 dark:bg-opacity-10 overflow-hidden">
            <img
              className="max-w-[490px] w-full rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] hover:scale-110 duration-500"
              src="./Fashion.jpg"
              alt=""
            />
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
