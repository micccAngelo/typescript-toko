import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  variant?: string;
}

const Loadings: React.FC<Props> = ({ variant = 'primary' }) => {
  return (
    <div className="text-center">
      <Spinner animation="border" variant={variant} />
    </div>
  );
};

export default Loadings;
