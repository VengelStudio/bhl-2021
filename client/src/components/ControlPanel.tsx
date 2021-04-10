import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export interface ControlPanelProps {
  value: "a" | "b" | "c" | "d";
  onChange: (mode: "a" | "b" | "c" | "d") => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  value,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<"a" | "b" | "c" | "d">(
    value
  );

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  function createData(
    value: "a" | "b" | "c" | "d",
    pv_panels: string,
    excess_power: string,
    insufficient_power: string,
    battery: string
  ) {
    return { value, pv_panels, excess_power, insufficient_power, battery };
  }

  const rows = [
    createData(
      "a",
      "primary energy source",
      "used to charge the battery",
      "drawn from the grid",
      "-"
    ),
    createData(
      "b",
      "primary energy source",
      "sent to the grid",
      "drawn from the grid",
      "not used"
    ),
    createData(
      "c",
      "primary energy source",
      "not used",
      "drawn from the grid",
      "charged from the grid as quickly as possible"
    ),
    createData("d", "primary energy source", "-", "drawn from the grid", "-"),
  ];

  return (
    <div>
      <FormControl style={{ marginTop: "16px" }} component="fieldset">
        <RadioGroup
          name="gender1"
          value={selectedOption}
          onChange={handleChange}
        >
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell align="right">PV panels</TableCell>
                  <TableCell align="right">Excess power</TableCell>
                  <TableCell align="right">Insufficient power</TableCell>
                  <TableCell align="right">Battery</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.value}>
                    <TableCell padding="checkbox" component="th" scope="row">
                      <Radio value={row.value} />
                    </TableCell>
                    <TableCell padding="checkbox" component="th" scope="row">
                      {row.value.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">{row.pv_panels}</TableCell>
                    <TableCell align="right">{row.excess_power}</TableCell>
                    <TableCell align="right">
                      {row.insufficient_power}
                    </TableCell>
                    <TableCell align="right">{row.battery}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </RadioGroup>
      </FormControl>
    </div>
  );
};
