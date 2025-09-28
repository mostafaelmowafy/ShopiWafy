function Logo() {
  return (
    <div className="flex justify-center align-center">
      <button className="px-4 py-2 text-6xl text-slate-800 dark:text-slate-100 font-bold rounded-full backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 transition-transform duration-300 ease-in-out cursor-default">
        <div className="text-animation">
          <span>S</span>
          <span>h</span>
          <span>o</span>
          <span>p</span>
          <span>i</span>
          <span>W</span>
          <span>a</span>
          <span>f</span>
          <span>y</span>
        </div>
      </button>
    </div>
  );
}

export default Logo;
