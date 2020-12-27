import React from 'react';

interface LoadingProps {
  loading: boolean;
  success: boolean;
}
const Loading = ({loading, success}: LoadingProps): JSX.Element => {
  const icon = ((l, s): string => {
    if(l) {
      return 'fad fa-spinner-third';
    } else {
      return s ? '' : 'fas fa-exclamation'
    }
  })(loading, success);
  if(!icon || icon === '') {
    return null;
  }
  return (
    <div className={`loadingIcon ${loading ? 'loadingIconProgress' : ''}`}>
      <i className={icon}/>
    </div>
  );
}

export default Loading;

