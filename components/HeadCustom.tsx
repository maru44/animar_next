import { NextPage } from "next";
import Head from "next/head";

interface Props {
  title?: string;
  ogType?: string;
  ogImage?: string;
  ogDescription?: string;
  ogSeoDescription?: string;
  robots?: string;
}

const HeadCustom: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {props.title ? props.title : "loveAnime | アニメ好きのためのサイト"}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:type"
          content={props.ogType ? props.ogType : "website"}
        />
        <meta
          property="og:description"
          content={
            props.ogDescription
              ? props.ogDescription
              : "アニメ好きのアニメ好きによるアニメ好きのためのサイト。アニメ視聴管理、レビュー、コラム作成が簡単にできます。"
          }
        />
        <meta
          property="description"
          content={
            props.ogSeoDescription
              ? props.ogSeoDescription
              : "アニメ好きのアニメ好きによるアニメ好きのためのサイト。アニメ視聴管理、レビュー、コラム作成が簡単にできます。"
          }
        />
        <meta property="og:url" content="https://loveani.me" />
        <meta name="twitter:card" content="summary_large_image" />
        {props.robots && <meta name="robots" content={props.robots} />}
      </Head>
    </div>
  );
};

export default HeadCustom;
