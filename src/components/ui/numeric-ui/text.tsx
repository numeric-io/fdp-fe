interface TextProps {
  children: string;
}

export const Text = ({ children }: TextProps) => {
  return <div className="text-sm">{children}</div>;
};
