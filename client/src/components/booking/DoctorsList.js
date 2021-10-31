import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import countries from "./data";

const simpleCountrySelect = props => {
  return (
    <>
      <FormControl>
        <InputLabel id="countrySelectLabel">Country</InputLabel>
        <Select labelId="countrySelectLabel" id="countrySelect" value=''>
          {countries.map((code, name, index) => (
            <MenuItem key={index} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default simpleCountrySelect;