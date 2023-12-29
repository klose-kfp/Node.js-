import React, { useContext } from "react";
import "./Contents.css";

import Header from "./header/Header";
import MainContent from "./maincontent/MainContent";
import { MainContext } from "../top/Main";
import { Snackbar } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function Contents() {
  const context = useContext(MainContext);

  return (
    <div className="content">
      <Header />
      <MainContent />
      <Snackbar
        open={context.type.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={60000}
        TransitionComponent={context.SlideTransition}
        message="保存が完了しました!! Good Job!!"
        onClose={context.handleClose}
        // action={<ClearIcon onClick={context.handleClose} />}
        sx={{
          backgroundColor: "black",
          "& .MuiPaper-root": {
            display: context.type.open == false ? "none" : "flex",
            backgroundColor: "black",
          },
          "& .MuiSnackbarContent-message": {
            backgroundColor: "black",
          },
          "& .MuiSnackbarContent-action": {
            backgroundColor: "black",
          },
        }}
      ></Snackbar>
    </div>
  );
}

export default Contents;
