import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import "./TypingAnimation.css";

gsap.registerPlugin(TextPlugin);

export default function TypingAnimation() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = [
      "1. A からB : リクエスト",
      "2. BからC : リクエスト",
      "3. リクエスト不成立の場合",
      "  3.1 CからB : 400エラー",
      "  3.2 BからA : 400エラー",
      "4. CからA : レスポンス",
    ];

    const tl = gsap.timeline();

    lines.forEach((line, index) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "line";
      lineDiv.style.opacity = "0";
      textRef.current?.appendChild(lineDiv);

      tl.to(lineDiv, {
        text: line,
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return <div className="TextTyping pt-8" ref={textRef}></div>;
}

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import "./TypingAnimation.css";

// type TypingAnimationType = {
//   text1: string;
//   text2: string;
//   text3: string;
//   text4: string;
//   text5: string;
//   text6: string;
// };

// export default function TypingAnimation() {
//   const textRef = useRef<HTMLDivElement>(null);
//   const [displayedLines, setDisplayedLines] = useState<TypingAnimationType>({
//     text1: "",
//     text2: "",
//     text3: "",
//     text4: "",
//     text5: "",
//     text6: "",
//   });

//   useEffect(() => {
//     const lines = [
//       "1. A からB : リクエスト",
//       "2. BからC : リクエスト",
//       "3. リクエスト不成立の場合",
//       "  3.1 CからB : 400エラー",
//       "  3.2 BからA : 400エラー",
//       "4. CからA : レスポンス",
//     ];

//     const tl = gsap.timeline();

//     lines.forEach((line, index) => {
//       const lineDiv = document.createElement("div");
//       lineDiv.classList.add("line");
//       textRef.current?.appendChild(lineDiv);

//       const chars = line.split("");
//       let charIndex = 0;

//       const intervalId = setInterval(() => {
//         if (charIndex < chars.length - 1) {
//           setDisplayedLines((prevText) => {
//             switch (index + 1) {
//               case 1:
//                 return {
//                   ...prevText,
//                   text1: prevText.text1 + chars[charIndex],
//                 };
//               case 2:
//                 return {
//                   ...prevText,
//                   text2: prevText.text2 + chars[charIndex],
//                 };
//               case 3:
//                 return {
//                   ...prevText,
//                   text3: prevText.text3 + chars[charIndex],
//                 };
//               case 4:
//                 return {
//                   ...prevText,
//                   text4: prevText.text4 + chars[charIndex],
//                 };
//               case 5:
//                 return {
//                   ...prevText,
//                   text5: prevText.text5 + chars[charIndex],
//                 };
//               case 6:
//                 return {
//                   ...prevText,
//                   text6: prevText.text6 + chars[charIndex],
//                 };
//               default:
//                 return prevText;
//             }
//           });
//           charIndex++;
//         } else {
//           clearInterval(intervalId);
//         }
//       }, 150); // テキストが1文字ずつ表示される間隔（ミリ秒）

//       tl.to(lineDiv, {
//         opacity: 1,
//         duration: 0.5,
//         delay: 0.2,
//       });
//     });

//     return () => {
//       tl.kill(); // アンマウント時にアニメーションを停止
//     };
//   }, []); // 空の配列を渡して初回のみ実行

//   return (
//     <div className="TextTyping pt-8" ref={textRef}>
//       {Object.values(displayedLines).map((text, index) => (
//         <div key={index}>{text}</div>
//       ))}
//     </div>
//   );
// }
