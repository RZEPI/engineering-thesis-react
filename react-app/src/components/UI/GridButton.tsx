export default function GridConfigButton({
  name,
  handleClick,
}: {
  name: string;
  handleClick: () => void;
}) {
  return <button onClick={handleClick}>{name}</button>;
}
