import * as React from "react";
import "./CustomTabPanel.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TextField } from "@mui/material";

type FromFormProps = {
  textAdd: () => void;
  ifTextAdd: () => void;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  onChange1: (newValue: string) => void;
  onChange2: (newValue: string) => void;
  onChange3: (newValue: string) => void;
  onChange4: (newValue: string) => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  text1,
  text2,
  text3,
  text4,
  onChange1,
  onChange2,
  onChange3,
  onChange4,
  textAdd,
  ifTextAdd,
}: FromFormProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "85%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="通常時" {...a11yProps(0)} />
          <Tab label="特定条件下" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="helptext flex">
          <div className="helptext-text">
            <div className="helptext-text-A flex items-center mb-2 ml-1">
              <TextField
                size="small"
                sx={{ height: "60%", width: "40%", marginRight: "2%" }}
                placeholder="送信元 -src"
                value={text1}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => onChange1(e.target.value)}
              />
              から
              <TextField
                size="small"
                sx={{ height: "60%", width: "40%", marginLeft: "2%" }}
                placeholder="宛先 -dist"
                value={text2}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => onChange2(e.target.value)}
              />
            </div>
            <div className="helptext-text-B flex items-center">
              :
              <TextField
                placeholder="What to send"
                size="small"
                sx={{ height: "60%", width: "50%", marginLeft: "2%" }}
                value={text3}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => onChange3(e.target.value)}
              />
              <AddCircleOutlineIcon
                className={
                  text1 != "" && text2 != "" && text3 != ""
                    ? "addicon-help addicon-animation cursor-pointer"
                    : "addicon-help"
                }
                sx={{ marginLeft: "4%" }}
                onClick={textAdd}
              />
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="iftext flex items-center ml-1">
          <TextField
            size="small"
            sx={{ height: "80%", width: "40%" }}
            placeholder="specific conditions"
            value={text4}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => onChange4(e.target.value)}
          />
          の場合
          <AddCircleOutlineIcon
            className={
              text4 != ""
                ? "addicon-if addicon-animation cursor-pointer"
                : "addicon-if"
            }
            sx={{ marginLeft: "3%" }}
            onClick={ifTextAdd}
          />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
