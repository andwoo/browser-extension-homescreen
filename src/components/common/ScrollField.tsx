import * as React from 'react';

export default function ScrollField(
  props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>,
): JSX.Element {
  return (
    <div data-simplebar style={{ overflow: 'auto' }} {...props}>
      {props.children}{' '}
    </div>
  );
}
