import { NextPage } from "next";
import { ReactNode } from "react-markdown";
import Header from "./Header";

interface Props {
  children: ReactNode;
  list?: number;
  kind?: string;
  uid?: string;
}

const BaseLayouts: NextPage<Props> = (props) => {
  return (
    <div>
      <Header list={props.list} kind={props.kind} uid={props.uid}></Header>
      {props.children}
    </div>
  );
};

export default BaseLayouts;
