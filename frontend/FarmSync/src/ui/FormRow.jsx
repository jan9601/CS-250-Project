function FormRow({label, error = null, children}) {
  return (
    <div className="form-row">
      {label && (
        <label htmlFor={children.props.id} className="font-semibold">
          {label}
        </label>
      )}
      {children}
      <span className="text-sm text-error">{error}</span>
    </div>
  );
}

export default FormRow;
