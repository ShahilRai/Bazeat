import React from 'react';
export default class CategoryMenu extends React.Component {
  render(){
   return(
    <div className="category_menu">
      <ul>
        <li className="active"><a href="javascript:void(0)">All categories</a></li>
        <li><a href="javascript:void(0)">Category 2</a></li>
        <li><a href="javascript:void(0)">Category 3</a></li>
        <li><a href="javascript:void(0)">Category 4</a></li>
        <li><a href="javascript:void(0)">Bread</a></li>
      </ul>
    </div>
    )
  }
}
