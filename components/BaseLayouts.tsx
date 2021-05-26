import { NextPage } from "next";
import { ReactNode } from "react-markdown";
import Header from "./Header";

interface Props {
  children: ReactNode;
  list?: number;
}

const BaseLayouts: NextPage<Props> = (props) => {
  return (
    <div>
      <Header list={props.list}></Header>
      {props.children}
    </div>
  );
};

export default BaseLayouts;
