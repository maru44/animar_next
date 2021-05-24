import { NextPage } from "next";
import { ReactNode } from "react-markdown";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const BaseLayouts: NextPage<Props> = (props) => {
  return (
    <div>
      <Header></Header>
      {props.children}
    </div>
  );
};

export default BaseLayouts;
