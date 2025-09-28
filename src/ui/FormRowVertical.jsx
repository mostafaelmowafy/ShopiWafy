function FormRowVertical({ children, label, error }) {
  return (
    <div className=" flex flex-col gap-3 py-5">
      {label && (
        <label
          className=" font-medium dark:text-gray-200"
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

export default FormRowVertical;
