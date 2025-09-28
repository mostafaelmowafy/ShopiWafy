function Heading({ children, size }) {
  const sizes = {
    big: "text-4xl md:text-5xl mt-[5vh] mb-[8vh] md:my-[8vh]  ",
    medium: "text-3xl md:my-[5vh]",
    small: "text-2xl my-[3vh]",
    default: "text-xl my-[2vh]",
  };
  const selectedSize = sizes[size] || sizes.default;

  return (
    <h2
      className={`font-bold text-center flex justify-center items-end gap-2 text-blue-300 dark:text-purple-300 ${selectedSize}`}
    >
      {children}
    </h2>
  );
}

export default Heading;
