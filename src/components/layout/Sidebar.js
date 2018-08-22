import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <Link to="/client/add" className="btn text-white btn-block" id="add-btn">
        <i className="fas fa-plus"> New</i>
      </Link>
    </div>
  )
}
