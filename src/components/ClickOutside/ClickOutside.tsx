import React, { useEffect, useCallback, ReactNode } from 'react';

interface IChildrenFunctionParams {
  innerRef: (node: HTMLDivElement) => void;
}

type IChildrenFunction = (props: IChildrenFunctionParams) => ReactNode;

interface IComponentProps {
  onClickOutside: (event: MouseEvent) => void;
  children: IChildrenFunction | ReactNode;
}

type TProps = IComponentProps;

const ClickOutside = ({ onClickOutside, children }: TProps) => {
  let nodeRef: HTMLElement | null = null;

  const onDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (nodeRef !== null && event.target instanceof Node && !nodeRef.contains(event.target)) {
        onClickOutside(event);
        event.stopPropagation();
      }
    },
    [onClickOutside, nodeRef],
  );

  useEffect(() => {
    document.addEventListener('click', onDocumentClick, true);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
    };
  }, [onDocumentClick]);

  if (typeof children === 'function') {
    return children({
      innerRef: (node: HTMLDivElement) => {
        nodeRef = node;
      },
    });
  }

  return (
    <div
      ref={node => {
        nodeRef = node;
      }}
    >
      {children}
    </div>
  );
};

export default ClickOutside;
