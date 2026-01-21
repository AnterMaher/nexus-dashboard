import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.common.white, // Ensure text/icon is white when selected for better contrast
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
const CustomToggleButtonGroup = ({
  value,
  onChange,
  options,
  exclusive = true,
  ...props
}) => {
  const handleAlignment = (event, newAlignment) => {
    // Prevent unselecting if it's required (optional logic, but common for view switchers)
    if (newAlignment !== null) {
      onChange(event, newAlignment);
    }
  };
  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={handleAlignment}
      aria-label="text alignment"
      {...props}
    >
      {options.map((option) => (
        <StyledToggleButton
          key={option.value}
          value={option.value}
          aria-label={option.label}
        >
          {option.icon}
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};
CustomToggleButtonGroup.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  exclusive: PropTypes.bool,
};
export default CustomToggleButtonGroup;
