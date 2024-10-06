export function GridConfigSlider({
  name,
  handleOnChange,
}: {
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label>{name}</label>
      <input
        type="range"
        min="1"
        max="300"
        defaultValue="100"
        name={name}
        onChange={handleOnChange}
      ></input>
    </>
  );
}
