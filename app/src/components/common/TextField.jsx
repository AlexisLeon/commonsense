import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField as MUITextField } from '@material-ui/core';

export default class TextField extends Component {
  render () {
    const {
      input,
      label,
      placeholder,
      value,
      onChange,
      meta: { touched, error },
    } = this.props;

    return (
        <MUITextField
          name={this.props.name}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={(touched && error) && !!error}
          helperText={(touched && error) && error}
          {...input}
        />
    );
  }
}

TextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
};