import React, { useContext, useState } from "react";
import "./Form.css";
import { Button, TextField } from "@mui/material";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { MainContext } from "@src/components/top/Main";
import TypeSelectButton from "./TypeSelectButton";
import BasicTabs from "@src/function/CustomTabPanel";

type FormState = {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
};

function Form() {
  const context = useContext(MainContext);
  const [state, setState] = useState<FormState>({
    text1: "",
    text2: "",
    text3: "",
    text4: "",
  });
  const List = [
    { selectTypeList: "シーケンス図", ImageList: "sikensuzu" },
    { selectTypeList: "aaa", ImageList: "sikensuzu" },
    { selectTypeList: "aaa", ImageList: "sikensuzu" },
  ];

  function textAdd() {
    if (state.text1 && state.text2 && state.text3) {
      const addText = state.text1 + "-->" + state.text2 + " : " + state.text3;
      context.formAdd(addText);
      setState({ ...state, text1: "", text2: "", text3: "" });
    }
  }
  function ifTextAdd() {
    if (state.text4) {
      const addIfText = state.text4 + "の場合";
      context.formAdd(addIfText);
      setState({ ...state, text4: "" });
    }
  }

  if (context.type.LastPush == "初期") {
    return (
      <div className="w-full">
        <div className="flex justify-evenly w-full h-9/10">
          {List.map((type: { selectTypeList: string; ImageList: string }) => (
            <TypeSelectButton
              type={type.selectTypeList}
              imagetype={type.ImageList}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        {context.type.LastPush == "図の種類" ? (
          <div className="form-zone">
            <div className="addtext relative flex justify-center">
              <BasicTabs
                textAdd={textAdd}
                ifTextAdd={ifTextAdd}
                text1={state.text1}
                text2={state.text2}
                text3={state.text3}
                text4={state.text4}
                onChange1={(newValue: string) =>
                  setState({ ...state, text1: newValue })
                }
                onChange2={(newValue: string) =>
                  setState({ ...state, text2: newValue })
                }
                onChange3={(newValue: string) =>
                  setState({ ...state, text3: newValue })
                }
                onChange4={(newValue: string) =>
                  setState({ ...state, text4: newValue })
                }
              />
            </div>
            <div className="form mt-2">
              <TextField
                // error
                id="standard-multiline-static"
                // label="テキストを入力"
                placeholder="テキストを入力してください"
                multiline
                // rows={30}
                value={context.textForm}
                variant="standard"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => context.onChangeForm(e.target.value, "textForm")}
                sx={{
                  width: "80%",
                  height: "100%",
                  padding: "2% 2% 2% 2%",
                  border: "1px solid #333",
                  whiteSpace: "pre-line",
                  overflowY: "scroll",
                  backgroundColor: "aliceblue",
                  "&::-webkit-scrollbar": {
                    backgroundColor: "aliceblue",
                  },
                  "& .MuiInputBase-root": {
                    backgroundColor: "aliceblue",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="form-zone-save">
            <div className="form-zone-save-contents">
              <div className="form-zone-save-contents-title">
                <TextField
                  // className="TextField"
                  // error
                  // label="タイトルを入力してください"
                  placeholder="タイトルを入力してください"
                  multiline
                  rows={2}
                  value={context.titleForm}
                  variant="standard"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => context.onChangeForm(e.target.value, "titleForm")}
                  style={{
                    backgroundColor: "white",
                    width: "70%",
                  }}
                />
              </div>
              <div className="form-zone-save-contents-btn">
                <Button
                  disabled={context.titleForm == ""}
                  className="save-btn btns"
                  variant="contained"
                  endIcon={<VerticalAlignBottomIcon />}
                  sx={{ height: "70%" }}
                  onClick={context.localSaveClick}
                >
                  サイト内保存
                </Button>
                <Button
                  disabled={context.titleForm == ""}
                  // className="w-full"
                  variant="contained"
                  startIcon={<VerticalAlignBottomIcon />}
                  sx={{ height: "70%", fontSize: "0.8rem", marginLeft: "2%" }}
                  onClick={context.svgDLSavePage}
                >
                  PDF
                </Button>

                <Button
                  className="re-btn btns"
                  variant="contained"
                  sx={{ height: "70%", marginLeft: "2%" }}
                  onClick={() => context.pushBack("図の種類")}
                >
                  やり直す
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Form;
