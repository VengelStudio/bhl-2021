import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export const ControlPanel: React.FC = () => {
  const [value, setValue] = useState(); //tu dać pobraną z backendu

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <div className="control-panel">
      <h2>Control panel</h2>
      <div className="control-panel__switches">
        <FormControl component="fieldset">
          <RadioGroup name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel
              value="mode1"
              control={<Radio />}
              label="Mode one"
            />
            <FormControlLabel
              value="mode2"
              control={<Radio />}
              label="Mode two"
            />
            <FormControlLabel
              value="mode3"
              control={<Radio />}
              label="Mode three"
            />
            <FormControlLabel
              value="mode4"
              control={<Radio />}
              label="Mode four"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
