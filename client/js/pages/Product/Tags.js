import React from 'react';

export default class Tags extends React.Component {
	render(){
		return(
			<div className="ingrdnt_options">
				{this.props.allIngredients.map(function(item, i){
            return <span key={i} className="ingrdnt_name">{item.name}<button className="close_ingrdnt">X</button></span>;
          })}
			</div>
		)
	}
}