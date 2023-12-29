import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import LoadingButton from "@mui/lab/LoadingButton";
import "./Guidance.css";
import { MainContext } from "@src/components/top/Main";
import { Button } from "@mui/material";

const steps = [
  "図の種類を選ぼう",
  "テキストを作成しGo！",
  "気に入れば画像を保存しよう！",
];

function Guidance() {
  const context = useContext(MainContext);

  let activeStep: any = 0;
  if (context.type.SelectType != "" && context.type.LastPush == "図の種類") {
    activeStep = 1;
  } else if (context.type.SelectType != "" && context.type.LastPush == "Go") {
    activeStep = 2;
  } else if (context.type.SelectType != "" && context.type.LastPush == "初期") {
    activeStep = 0;
  }

  function nextClick() {
    if (context.type.LastPush == "初期") {
      context.pushImageType();
    } else if (context.type.LastPush == "図の種類") {
      goClick();
    }
  }
  function goClick() {
    context.handleLoadingChange(true);
    context.pushGo(context.textForm);
  }

  return (
    <div className="h-full w-full flex items-end relative">
      <Button
        // className="save-btn btns"
        variant="contained"
        disabled={context.type.LastPush == "初期"}
        startIcon={<SkipPreviousIcon />}
        sx={{
          height: "50%",
          width: "14%",
          left: "8%",
          //  position: "absolute", left: "0.25rem"
        }}
        onClick={() => context.pushBack("初期")}
      >
        {context.type.LastPush === "Go" ? "最初へ戻る" : "BACK"}
      </Button>
      <LoadingButton
        size="small"
        disabled={
          context.type.SelectType === "" ||
          (context.type.LastPush === "図の種類" && context.textForm === "") ||
          context.type.LastPush === "Go"
        }
        onClick={nextClick}
        endIcon={<SkipNextIcon />}
        loading={context.type.loading}
        loadingPosition="end"
        sx={{
          height: "50%",
          width: "14%",
          left: "10%",
        }}
        variant="contained"
      >
        <span>
          {context.type.LastPush == "初期"
            ? "NEXT"
            : context.type.LastPush == "Go"
            ? "SAVE？"
            : context.textForm != ""
            ? context.type.SelectType + "をGo!!"
            : "テキストを入力"}
        </span>
      </LoadingButton>

      <Box
        sx={{
          position: "absolute",
          width: "50%",
          height: "100%",
          right: "10%",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ height: "90%", marginTop: "0.5%" }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                className={
                  activeStep == index ? "steplabel nowstep" : "steplabel"
                }
                sx={{ width: "100%" }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}
// import { DisplayType } from "@src/components/top/Main";
// import React from "react";

// type GuidanceProps = {
//   LastPush: string;
//   displayType: DisplayType;
// };

// function Guidance({ LastPush, displayType }: GuidanceProps) {
//   if (LastPush === "Go" && displayType === "form") {
//     return (
//       <div>
//         図を気に入れば、タイトルをつけて保存！！
//         <br />
//         不合格なら「やり直す」を押そう！！
//       </div>
//     );
//   } else if (LastPush === "保存" && displayType === "form") {
//     return (
//       <div>
//         保存完了！！左側にある「SVG」をクリックすると、
//         <br />
//         図を確認出来るぞ！！！
//       </div>
//     );
//   } else if (LastPush === "初期" && displayType === "form") {
//     return (
//       <div>
//         図の種類を選択し、テンプレテキストを参考に
//         <br />
//         テキストを作成しよう！！！
//       </div>
//     );
//   } else if (displayType === "past") {
//     return (
//       <div>
//         図をクリックすると、
//         <br />
//         右側に情報が表示されるよ！！！
//       </div>
//     );
//   }
// }

export default Guidance;
