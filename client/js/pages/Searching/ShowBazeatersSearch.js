import React from 'react';
import LazyLoad from 'react-lazy-load';

export default class ShowBazeatersSearch extends React.Component {

  render() {
    return (
      <div>
        {this.props.allBazeaters.map((userslist, index) => {
          return (
            <LazyLoad key={index} height={100}>
              <span className="prd_name" key={index}>{userslist.full_name}</span>
            </LazyLoad>
          );
        })}
      </div>
    );
  }
}
