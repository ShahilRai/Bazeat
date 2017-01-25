import React from 'react';
export default class Rating extends React.Component {

  propTypes: {
    disabled: React.PropTypes.bool
  }

  constructor(props) {
      super(props);
      this.state = {
       rating: this.props.rating || null || this.props.rating1,
       temp_rating: null
      };
   }

  rate(rating) {
    this.setState({
      rating : rating,
      temp_rating: rating
    });
    this.props.get_rating(this.state.rating)
  }

  star_over(rating) {
    this.state.temp_rating = this.state.rating;
    this.state.rating = rating;
    this.setState({
      rating: this.state.rating,
      temp_rating: this.state.temp_rating
    });
  }

  star_out() {
    this.state.rating = this.state.temp_rating;
    this.setState({ rating: this.state.rating });
  }

  render() {
    const stars = [];
    for(let i = 1; i < 6; i++) {
      let klass = 'star-rating__star';
      if (this.state.rating >= i && this.state.rating != null) {
        klass += ' is-selected';
      }

      stars.push(
        <label
          className={klass}
          onClick={this.rate.bind(this, i)}
          onMouseOver={this.star_over.bind(this, i)}
          onMouseOut={this.star_out.bind(this, i)}>
          ★
        </label>
      );
    }

    return (
      <div className="star-rating">
        {stars}
      </div>
    );
  }
}
