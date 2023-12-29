import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function SvgToPdf() {
  const handleDownload = () => {
    // div要素を取得
    const divElement = document.getElementById("myDiv");

    if (divElement) {
      // html2canvasでdivをキャプチャ
      html2canvas(divElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // 画像をPDFに追加
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // PDFをダウンロード
        pdf.save("downloaded.pdf");
      });
    }
  };

  return (
    <div>
      {/* 変換対象のdiv要素 */}
      <div id="myDiv">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            strokeWidth="3"
            fill="red"
          />
        </svg>
      </div>

      {/* ダウンロードボタン */}
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}
