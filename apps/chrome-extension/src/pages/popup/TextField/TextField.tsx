import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import "./text-field.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: ReactNode;
  label: string;
  error: boolean;
  errorText: string;
}
export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  p,
  ref
) {
  const { error = null, errorText = "", label, style, ...props } = p;

  return (
    <div className="inputRoot">
      {label && <label>{label}</label>}
      <input
        style={style}
        {...props}
        ref={ref}
        autoCorrect="off"
      />
      {error && <span className="errText">{errorText}</span>}
    </div>
  );
});
