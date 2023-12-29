// import { createContext, useState } from "react";
// import SampleChild from "./SampleChild";

// type MainLayoutProps = {
//   content: React.ReactNode;
//   slide: React.ReactNode;
// };

// type UserInfo = {
//   username: string;
//   email: string;
// };

// type MainContextType = {
//   user: UserInfo;
//   update: (username: string, email: string) => void;
//   slide: React.ReactNode;
// };

// export const MainContext = createContext<MainContextType>({
//   user: {
//     username: "",
//     email: "",
//   },
//   update: (username: string, email: string) => {},
//   slide: "",
// });

// export default function MainLayout({ content, slide }: MainLayoutProps) {
//   const [state, setState] = useState<UserInfo>({
//     username: "",
//     email: "",
//   });

//   const update = (username: string, email: string) => {
//     setState({ ...state, username, email });
//   };

//   return (
//     <MainContext.Provider value={{ user: state, update: update, slide: slide }}>
//       <div className="flex h-full w-full">
//         {/* <div>
//           state.username={state.username}
//           <br />
//           <SampleChild />
//         </div> */}
//         {content}
//       </div>
//     </MainContext.Provider>
//   );
// }
