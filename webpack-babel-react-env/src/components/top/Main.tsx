import React, { createContext, useEffect, useState } from "react";
import "./Main.css";
import Contents from "@src/components/contents/Contents";
import { useNavigate } from "react-router-dom";
import userService from "@src/function/get_axios";
import { errorHandle } from "@src/error/errorHandle";
import { BoxType } from "@src/types/types";
import SlideMenu from "@src/function/SlideMenu";
import { sendGPT } from "@src/function/chatGPT";
import PostuserService from "@src/function/post_axios";
import { Slide, SlideProps } from "@mui/material";
import html2pdf from "html2pdf.js";

type MainLayoutProps = {
  slide: React.ReactNode;
  displayType: "form" | "past";
};

export type GPT = {
  loginUser: string;
  Title: string;
  Mermaid: string;
  svg: string;
  text: string;
  UpdatedDate: string;
};
type FromGPT = {
  MermaidText: string;
  text: string;
  SVG: string;
};

type UserInfo = {
  username: string;
  email: string;
};
type DisplayType = "form" | "past";
export type LastPushBottunState = "初期" | "図の種類" | "Go";

type TypeContext = {
  SelectType: string;
  DisplayType: DisplayType;
  LastPush: LastPushBottunState;
  HoverType: string;
  open: boolean;
  loading: boolean;
};

type MainContextType = {
  user: UserInfo;
  onClickSidebarButton: (type: DisplayType) => void;
  selectTypeChange: (type: string) => void;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  SlideTransition: React.FC<SlideProps>;
  SVGProps: (svg: string) => void;
  pushGo: (question: string) => void;
  pushSave: (title: string) => void;
  pushBack: (type: LastPushBottunState) => void;
  hoverTypeAdd: (type: string) => void;
  pushImageType: () => void;
  handleLoadingChange: (newValue: boolean) => void;
  formAdd: (newValue: string) => void;
  onChangeForm: (newValue: string, key: "textForm" | "titleForm") => void;
  svgSaveToState: (svg: SVGSVGElement | null | undefined) => void;
  svgDownload: () => void;
  svgDLSavePage: () => void;
  localSaveClick: () => void;
  type: TypeContext;
  GPTs: GPT[];
  FromGPT: FromGPT;
  slide: React.ReactNode;
  textForm: string;
  titleForm: string;
};
type TypeState = {
  SelectType: string;
  LastPush: LastPushBottunState;
  HoverType: string;
  open: boolean;
  loading: boolean;
};

type MainState = {
  user: UserInfo;
  GPTs: GPT[];
  FromGPT: FromGPT;
  type: TypeState;
  textForm: string;
  titleForm: string;
  responseSvg: SVGSVGElement | null | undefined;
};

export const MainContext = createContext<MainContextType>({
  user: {
    username: "",
    email: "",
  },
  onClickSidebarButton: (type: DisplayType) => {},
  selectTypeChange: (type: string) => {},
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => {},
  SlideTransition: (props) => <Slide {...props} direction="down" />,
  SVGProps: (svg: string) => {},
  pushGo: (question: string) => {},
  pushSave: (title: string) => {},
  pushBack: (type: LastPushBottunState) => {},
  hoverTypeAdd: (type: string) => {},
  pushImageType: () => {},
  handleLoadingChange: (newValue: boolean) => {},
  formAdd: (newValue: string) => {},
  onChangeForm: (newValue: string) => {},
  svgSaveToState: (svg: SVGSVGElement | null | undefined) => {},
  svgDownload: () => {},
  svgDLSavePage: () => {},
  localSaveClick: () => {},
  type: {
    DisplayType: "form",
    SelectType: "",
    LastPush: "初期",
    HoverType: "",
    open: false,
    loading: false,
  },
  GPTs: [],
  FromGPT: {
    MermaidText: "",
    text: "",
    SVG: "",
  },
  slide: "",
  textForm: "",
  titleForm: "",
});

function Main({ slide, displayType }: MainLayoutProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<MainState>({
    user: {
      username: "",
      email: "",
    },
    type: {
      SelectType: "",
      LastPush: "初期",
      HoverType: "",
      open: false,
      loading: false,
    },
    GPTs: [],
    FromGPT: {
      MermaidText: "",
      text: "",
      SVG: "",
    },
    textForm: "",
    titleForm: "",
    responseSvg: null,
  });

  useEffect(() => {
    async function getAction() {
      console.log("loaddata");
      const resData = await getUserAction().catch((err) => {
        errorHandle(err, "User:");
        navigate("/error");
      });
      if (resData) {
        getGPT(resData.username).catch((err) => {
          errorHandle(err, "GPT:");
          navigate("/error");
        });
      }
    }
    getAction();
  }, []);

  async function getUserAction() {
    const res: { username: string; email: string } =
      await userService.getNowUser();
    console.log("getNowUser", res);
    setState((prevState) => ({
      ...prevState,
      user: res,
    }));
    return res;
  }

  async function getGPT(Name: string) {
    if (!Name) return "";
    const res: any = await userService.getMessage();
    console.log(Name);

    let filtered: [] = await res.filter((box: BoxType) => {
      return box.loginuser == Name;
    });
    if (filtered.length == 0) {
      filtered = await res.filter((box: BoxType) => {
        return box.loginuser == "";
      });
      console.log(filtered);
    }
    setState((prevState) => ({
      ...prevState,
      GPTs: filtered,
    }));
    console.log(filtered);
  }
  // ----------------------------ここまでGET動作

  // -------------------ここから、クリック処理

  async function pushGo(question: string) {
    console.log("バケツリレー成功");
    const Mermaid = await sendGPT(state.type.SelectType, question).catch(
      (error) => {
        console.log("通信に失敗しました" + error);
      }
    );
    if (Mermaid)
      setState((prevState) => ({
        ...prevState,
        FromGPT: {
          ...prevState.FromGPT,
          MermaidText: Mermaid,
          text: question,
        },
        type: {
          ...prevState.type,
          LastPush: "Go",
          loading: false,
        },
      }));
  }

  async function pushSave(title: string) {
    await PostuserService.sendGO(
      state.user.username,
      title,
      state.FromGPT.SVG,
      state.FromGPT.MermaidText,
      state.FromGPT.text
    ).catch((error) => {
      console.log("通信に失敗しました" + error);
    });
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        open: true,
      },
    }));
    console.log(state);
  }

  function pushBack(type: LastPushBottunState) {
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        LastPush: type,
      },
      titleForm: "",
    }));
  }

  function SVGProps(svg: string) {
    setState((prevState) => ({
      ...prevState,
      FromGPT: {
        ...prevState.FromGPT,
        SVG: svg,
      },
    }));
  }
  const handleClose = () =>
    // event?: React.SyntheticEvent | Event,
    // reason?: string
    {
      // if (reason === "clickaway") {
      //   return;
      // }
      setState((prevState) => ({
        ...prevState,
        type: {
          ...prevState.type,
          open: false,
        },
      }));
    };
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  // -------------------ここまで元々Mainにあった処理
  function onClickSidebarButton(type: DisplayType) {
    if (type == "past") {
      navigate("/history");
      return;
    } else if (type == "form") {
      navigate("/main");
      return;
    }
  }

  function hoverTypeAdd(type: string) {
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        HoverType: type,
      },
    }));
  }

  function selectTypeChange(type: string) {
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        SelectType: type,
      },
    }));
  }

  function pushImageType() {
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        LastPush: "図の種類",
      },
    }));
  }
  function handleLoadingChange(newValue: boolean) {
    setState((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
        loading: newValue,
      },
    }));
  }
  function formAdd(newValue: string) {
    setState({ ...state, textForm: state.textForm + newValue + "\n" });
  }
  function onChangeForm(newValue: string, key: "textForm" | "titleForm") {
    setState({ ...state, [key]: newValue });
  }
  function svgSaveToState(svg: SVGSVGElement | null | undefined) {
    setState({ ...state, responseSvg: svg });
  }
  function svgDownload() {
    const pdfOptions = {
      filename: "download.pdf",
    };
    html2pdf(state.responseSvg, pdfOptions);
  }
  function svgDLSavePage() {
    const pdfOptions = {
      filename: state.titleForm + ".pdf",
    };
    html2pdf(state.responseSvg, pdfOptions);
  }

  function localSaveClick() {
    setState((prevState) => ({
      ...prevState,
      textForm: "",
    }));
    pushSave(state.titleForm);
  }

  return (
    <MainContext.Provider
      value={{
        user: state.user,
        type: {
          DisplayType: displayType,
          SelectType: state.type.SelectType,
          LastPush: state.type.LastPush,
          HoverType: state.type.HoverType,
          open: state.type.open,
          loading: state.type.loading,
        },
        onClickSidebarButton: onClickSidebarButton,
        selectTypeChange: selectTypeChange,
        handleClose: handleClose,
        SlideTransition: SlideTransition,
        SVGProps: SVGProps,
        pushGo: pushGo,
        pushSave: pushSave,
        pushBack: pushBack,
        hoverTypeAdd: hoverTypeAdd,
        pushImageType: pushImageType,
        handleLoadingChange: handleLoadingChange,
        formAdd: formAdd,
        onChangeForm: onChangeForm,
        svgSaveToState: svgSaveToState,
        svgDownload: svgDownload,
        svgDLSavePage: svgDLSavePage,
        localSaveClick: localSaveClick,
        GPTs: state.GPTs,
        FromGPT: state.FromGPT,
        slide: slide,
        textForm: state.textForm,
        titleForm: state.titleForm,
      }}
    >
      <div
        className="flex h-full w-full"
        // m-auto p-0"
      >
        <SlideMenu />
        <Contents />
      </div>
    </MainContext.Provider>
  );
}

export default Main;
