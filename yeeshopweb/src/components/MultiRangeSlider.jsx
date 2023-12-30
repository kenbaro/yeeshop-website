import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; // Import the default styles
import '../css/MultiRangeSlider.css'
class MultiRangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        min: 0,
        max: 99000000,
      },
    };
  }

  handleSliderChange = (values) => {
    this.setState({ values });
    this.props.onChange({values});
  };

  render() {
    const { values } = this.state;

    return (
      <div className="multi-range-slider w-100">
        <InputRange
          draggableTrack
          maxValue={99000000}
          minValue={0}
          step={100000}
          formatLabel={(value) => `${value}`}
          value={values}
          onChange={this.handleSliderChange}
        />
        {/* <div className="slider-values">
          <span>Min: {values.min}</span>
          <span>Max: {values.max}</span>
        </div> */}
      </div>
    );
  }
}

export default MultiRangeSlider;