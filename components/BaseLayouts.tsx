import { NextPage } from "next";
import { ReactNode } from "react-markdown";
import HeadCustom from "./HeadCustom";
import Header from "./Header";

interface Props {
  children: ReactNode;
  list?: number;
  kind?: string;
  uid?: string;
  title?: string;
  ogType?: string;
  ogImage?: string;
  ogDescription?: string;
  ogSeoDescription?: string;
  robots?: string;
}

const BaseLayouts: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <div>
      <HeadCustom
        title={props.title}
        ogType={props.ogType}
        ogImage={props.ogImage}
        ogDescription={props.ogDescription}
        ogSeoDescription={props.ogSeoDescription}
        robots={props.robots}
      ></HeadCustom>
      <Header list={props.list} kind={props.kind} uid={props.uid}></Header>
      {props.children}
    </div>
  );
};

export default BaseLayouts;
