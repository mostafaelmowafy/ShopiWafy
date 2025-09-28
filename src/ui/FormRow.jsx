function FormRow({ children, label, error }) {
  return (
    <div className=" lg:space-y-4 grid items-center lg:gap-9 lg:grid-cols-[24rem_1fr_1.2fr]">
      {label && (
        <label
          className=" mt-4 mb-2 lg:my-0 font-medium dark:text-gray-200"
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className=" size-6 text-red-700">{error}</p>}
    </div>
  );
}

export default FormRow;
