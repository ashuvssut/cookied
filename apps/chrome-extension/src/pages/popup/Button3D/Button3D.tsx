import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import "./button-3d.scss";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: (e: any) => void;
  children?: ReactNode;
}
export const Button3D: FC<Props> = ({ children, onClick, ...props }) => {
  return (
    <span className={`${props.className} table_center`} {...props}>
      <button onClick={onClick}>{children}</button>
    </span>
  );
};
