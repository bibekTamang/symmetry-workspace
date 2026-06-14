interface CheckBoxProps {
  label: string;
}

const CheckBox = ({ label }: CheckBoxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" />
      <label htmlFor="" className="text-xs text-brand-muted">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
