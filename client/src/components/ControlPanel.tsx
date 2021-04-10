import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

export interface ControlPanelProps {
  value: "a" | "b" | "c" | "d";
  onChange: (mode: "a" | "b" | "c" | "d") => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <div className="control-panel">
      <h2>Select mode</h2>
      <div className="control-panel__switches">
        <FormControl component="fieldset">
          <RadioGroup name="gender1" value={value} onChange={handleChange}>
            <div className="control-panel__cards">
              <Card>
                <CardContent>
                  <FormControlLabel
                    value="a"
                    control={<Radio />}
                    label="Mode A"
                  />

                  <Typography variant="body2" component="p">
                    • PV panels are the first-choice energy source
                  </Typography>
                  <Typography variant="body2" component="p">
                    • excess power is used to charge the battery
                  </Typography>
                  <Typography variant="body2" component="p">
                    • insufficient power is drawn from the grid
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <FormControlLabel
                    value="b"
                    control={<Radio />}
                    label="Mode B"
                  />

                  <Typography variant="body2" component="p">
                    • PV panels are the first-choice energy source
                  </Typography>
                  <Typography variant="body2" component="p">
                    • excess power is sent to the grid
                  </Typography>
                  <Typography variant="body2" component="p">
                    • insufficient power is drawn from the grid
                  </Typography>
                  <Typography variant="body2" component="p">
                    • battery is not used
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <FormControlLabel
                    value="c"
                    control={<Radio />}
                    label="Mode C"
                  />

                  <Typography variant="body2" component="p">
                    • PV panels are the first-choice energy source
                  </Typography>
                  <Typography variant="body2" component="p">
                    • insufficient power is drawn from the grid
                  </Typography>
                  <Typography variant="body2" component="p">
                    • excess power is not used
                  </Typography>
                  <Typography variant="body2" component="p">
                    • battery is charged from the grid as quickly as possible
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <FormControlLabel
                    value="d"
                    control={<Radio />}
                    label="Mode D"
                  />

                  <Typography variant="body2" component="p">
                    • PV panels and the battery are the first-choice energy
                    source
                  </Typography>
                  <Typography variant="body2" component="p">
                    • insufficient power is drawn from the grid
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
