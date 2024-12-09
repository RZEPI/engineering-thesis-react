export default function GridConfigButton({
  name,
  handleClick,
  style,
}: {
  name: string;
  handleClick: () => void;
  style?: object;
}) {
  return (
    <button onClick={handleClick} style={style}>
      {name}
    </button>
  );
}
