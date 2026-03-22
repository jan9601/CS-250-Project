function Select({options, value, onChange}) {
  return (
    <select
      onChange={onChange}
      className="cursor-pointer px-3 py-3 text-sm font-medium border border-border rounded-md bg-surface  shadow-sm text-text-secondary"
      value={value}
    >
      {options?.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default Select;
