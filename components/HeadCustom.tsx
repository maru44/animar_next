import { NextPage } from "next";
import Head from "next/head";
import { pageBaseProps } from "../types/page";

const HeadCustom: NextPage<pageBaseProps> = (props) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {props.title
            ? `loveAnime - ${props.title}`
            : "loveAnime | アニメ好きのためのサイト"}
        </title>
        <meta
          name="og:title"
          content={
            props.title
              ? `loveAnime - ${props.title}`
              : "loveAnime | アニメ好きのためのサイト"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content={props.ogType ?? "website"} />
        <meta
          property="og:description"
          content={
            props.ogDescription ??
            "アニメ好きのアニメ好きによるアニメ好きのためのサイト。アニメ視聴管理、レビュー、コラム作成が簡単にできます。"
          }
        />
        <meta
          property="description"
          content={
            props.ogSeoDescription ??
            "アニメ好きのアニメ好きによるアニメ好きのためのサイト。アニメ視聴管理、レビュー、コラム作成が簡単にできます。"
          }
        />
        <meta property="og:url" content="https://loveani.me" />
        <meta property="og:image" content={props.ogImage ?? ""} />
        <meta
          name="twitter:card"
          content={props.ogImageType ?? "summary_large_image"}
        />
        <meta
          name="twitter:title"
          content={props.title ?? "loveAnime | アニメ好きのためのサイト"}
        />
        <meta name="twitter:site" content="@maru0078340425" />
        {props.robots && <meta name="robots" content={props.robots} />}
      </Head>
    </div>
  );
};

export default HeadCustom;
