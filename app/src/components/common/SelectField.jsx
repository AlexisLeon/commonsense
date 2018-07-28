import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectField extends Component {
  renderOptions = (option, index) => (
    <option value={option.value || option} key={index}>
      {option.label || option}
    </option>
  );

  render () {
    const { options } = this.props;
    const seen = new Set;
    const normalizedOptions = options.filter(function(item, index) {
      return options.indexOf(item.value) == index || options.indexOf(item.label) == index || options.indexOf(item) == index;
    });

    return (
      <label>
        {this.props.label}
        <select
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          required={this.props.required}
          maxLength={this.props.maxLength}
          {...this.props}
        >
          {normalizedOptions.map(this.renderOptions)}
        </select>
      </label>
    );
  }
}


SelectField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
};

SelectField.defaultProps = {
  options: []
};
