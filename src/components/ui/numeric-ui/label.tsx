export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: string
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="text-sm font-medium" {...props}>
      {children}
    </label>
  )
}
