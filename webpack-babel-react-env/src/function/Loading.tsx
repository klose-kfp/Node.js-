import { Skeleton } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="opacity-0">aaa</div>
      <Skeleton
        variant="rounded"
        sx={{ width: "60%", height: "50%" }}
        animation="wave"
      />
      <Skeleton
        variant="rounded"
        sx={{ width: "60%", height: "10%", marginTop: "3%" }}
        animation="wave"
      />
      <Skeleton
        variant="rounded"
        sx={{ width: "60%", height: "10%", marginTop: "3%" }}
        animation="wave"
      />
    </div>
  );
}

export default Loading;
