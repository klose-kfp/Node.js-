import React, { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Selectbar.css";
import { MainContext } from "@src/components/top/Main";

const types = ["", "シーケンス図", "Van Henry"];

function Selectbar() {
  const context = useContext(MainContext);
  return (
    <div className="selectbox flex">
      <FormControl
        sx={{
          height: "100%",
          width: "100%",
          paddingTop: "2vh",
        }}
      >
        <InputLabel
          sx={{
            m: 0.2,
            marginLeft: "2%",
            top: "17%",
            fontSize: "0.7rem",
            color: "black",
          }}
          id="demo-multiple-checkbox-label"
        >
          図の種類
        </InputLabel>
        <Select
          sx={{
            m: "1",
            height: "90%",
            marginTop: "0",
            marginLeft: "5px",
            marginRight: "5px",
          }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={context.type.SelectType}
          onChange={(e: SelectChangeEvent) =>
            context.selectTypeChange(e.target.value)
          }
        >
          {types.map((type) => (
            <MenuItem sx={{ width: "100%" }} key={type} value={type}>
              <Checkbox
                sx={{ height: "90%", margin: "0" }}
                checked={context.type.SelectType.indexOf(type) > -1}
              />
              <ListItemText
                sx={{ m: 1, fontSize: "30px!important" }}
                primary={type}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default Selectbar;
