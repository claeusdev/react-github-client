import React from 'react';
const Button = ({
  children,
  className,
  color = 'black',
  type = 'button',
  ...props
}) => (
  <button
    className={`${className} btn btn-dark btn-sm`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

const ButtonUnobtrusive = ({
  children,
  className,
  type = 'button',
  ...props
}) => (
  <button
    className={`${className} Button_unobtrusive btn-sm`}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export { ButtonUnobtrusive };

export default Button;