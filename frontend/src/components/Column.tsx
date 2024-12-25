import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    id: string;
    className: string;
    style: React.CSSProperties;
}

export default ({children, id, className, style}: Props) => {
  return (
    <div 
        id={id}
        className={className}
        style={{ ...style, display: 'flex', flexDirection: 'column' }}
    >
        {children}
    </div>
  )
}