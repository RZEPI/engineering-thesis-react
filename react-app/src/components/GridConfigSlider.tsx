export function GridConfigSlider({
  name,
  handleOnChange,
  defaultValue,
}: {
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}) {
  return (
    <>
      <label>{name}</label>
      <input
        type="range"
        min="1"
        max="300"
        name={name}
        defaultValue={defaultValue}
        onChange={handleOnChange}
      ></input>
    </>
  );
}
