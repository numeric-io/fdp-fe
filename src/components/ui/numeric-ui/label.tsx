export interface LabelProps {
  children: string;
}

export const Label = ({ children }: LabelProps) => {
  return <label className="text-sm font-medium">{children}</label>;
};
