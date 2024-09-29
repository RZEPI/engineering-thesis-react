export type NumericFilterInputProps = {
  className: string;
  value: number | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};