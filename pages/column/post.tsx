import { GetServerSideProps, NextPage } from "next";
import { fetchPostBlog } from "../../helper/BlogHelper";
import "github-markdown-css/github-markdown.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost: NextPage = () => {
  // inputed value
  const [title, setTitle] = useState<string>(null);
  const [abst, setAbst] = useState<string>(null);
  const [prev, setPrev] = useState<string>(null);

  const [isPrev, setIsPrev] = useState<boolean>(false);
  const [textHeight, setTextHeight] = useState<number>(0);

  const startPostBlog = async (e: any) => {
    e.preventDefault();
    title && prev && (await fetchPostBlog(title, abst, prev));
  };

  const changePrev = (e: any) => {
    setPrev(e.target.value);
    setTextHeight(e.target.scrollHeight); // height auto
  };
  const changeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const changeAbst = (e: any) => {
    setAbst(e.target.value);
  };

  const changeIsPrev = () => {
    setIsPrev(!isPrev);
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="" onClick={changeIsPrev}>
            プレビュー
          </div>
          <div className={isPrev ? "off mt40 markDown" : "mt40 markDown"}>
            <div className="field">
              <input
                type="text"
                placeholder="タイトル"
                maxLength={64}
                name="blogtitle"
                onChange={changeTitle}
              />
            </div>
            <div className="mt20 field">
              <textarea
                rows={3}
                className="abstract"
                maxLength={160}
                name="abst"
                onChange={changeAbst}
                placeholder="概要: 160文字以内"
              />
            </div>
            <div className="mt20 field">
              <textarea
                name="content"
                className="content"
                onChange={changePrev}
                placeholder="本文: マークダウン形式です"
                style={{ height: `${textHeight}px` }}
              ></textarea>
            </div>
          </div>
          <div className={isPrev ? "columnArea mt40" : "columnArea mt40 off"}>
            <h1 className="brAll">{title}</h1>
            <p className="mt20 abstract preWrap brAll">{abst}</p>
            <ReactMarkdown
              className="mt40 preWrap brAll"
              plugins={[remarkGfm]}
              unwrapDisallowed={false}
            >
              {prev}
            </ReactMarkdown>
          </div>
          <div className="mt40">
            <button type="button" onClick={startPostBlog} className="">
              送信する
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
