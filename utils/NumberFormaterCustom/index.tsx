import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { ...other } = props;

  return (
    <NumberFormat
    {...other}
  />
  );
});

export default NumberFormatCustom;
