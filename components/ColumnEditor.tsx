import { NextPage } from "next";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TAnimeMinimum } from "../types/anime";
import Head from "next/head";
import { fetchPostBlog } from "../helper/BlogHelper";
import { fetchSearchAnime } from "../helper/AnimeHelper";
import { TBlog } from "../types/blog";

interface Props {
  blog?: TBlog;
}

const ColumnEditor: NextPage<Props> = (props) => {
  // inputed value
  console.log(props.blog);
  const [title, setTitle] = useState<string>(
    props.blog ? props.blog.Title : null
  );
  const [abst, setAbst] = useState<string>(
    props.blog ? props.blog.Abstract : null
  );
  const [prev, setPrev] = useState<string>(
    props.blog ? props.blog.Content : null
  );

  const [isPrev, setIsPrev] = useState<boolean>(false);
  const [textHeight, setTextHeight] = useState<number>(0);

  // relation anime
  const [relAnimeIds, setRelAnimeIds] = useState<number[]>([]);
  const [relAnimeTitles, setRelAnimeTitles] = useState<string[]>([]);
  const [searchedAnime, setSearchedAnim] = useState<TAnimeMinimum[]>(null);

  const startPostBlog = async (e: any) => {
    e.preventDefault();
    title && prev && (await fetchPostBlog(title, abst, prev, relAnimeIds));
  };

  const startEditBlog = async (e: any) => {
    e.preventDefault();
    console.log(e);
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

  // relation anime
  const searchAnime = async (e: any) => {
    if (e.target.value) {
      const ret = await fetchSearchAnime(e.target.value);
      ret["Status"] === 200 && setSearchedAnim(ret["Data"]);
    }
  };

  const addSelected = (e: any) => {
    const id = parseInt(e.target.dataset.id);
    const title = e.target.dataset.title;
    if (!relAnimeIds.includes(id) && relAnimeIds.length < 5) {
      const newIds = relAnimeIds;
      const newTitles = relAnimeTitles;
      console.log(newIds);
      newIds.push(id);
      newTitles.push(title);
      setRelAnimeIds(newIds);
      setRelAnimeTitles(newTitles);
    }
  };

  return (
    <div>
      <Head>
        <meta name="robots" content="nofollow" />
      </Head>
      <main>
        <div className="mla mra content">
          <div className={isPrev ? "off mt40" : "mt40"}>
            <input
              type="text"
              name="keyword"
              placeholder="関連アニメ"
              onChange={searchAnime}
              autoComplete="off"
            />
            <ul className="selectRelAnime">
              {searchedAnime &&
                searchedAnime.map((ani, index) => (
                  <li key={index}>
                    {ani.Title}
                    <span
                      className="addButton"
                      data-id={ani.ID}
                      data-title={ani.Title}
                      onClick={addSelected}
                    >
                      +
                    </span>
                  </li>
                ))}
            </ul>
            <ul className="mt20 field selectedRelAnime">
              {relAnimeTitles.length !== 0 &&
                relAnimeTitles.map((title, index) => (
                  <li key={index}>
                    {title}
                    <span className="circleButton" data-idx={index}>
                      -
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt20" onClick={changeIsPrev}>
            {isPrev ? "編集に戻る" : "プレビュー"}
          </div>
          <form onSubmit={props.blog ? startPostBlog : startEditBlog}>
            <div className={isPrev ? "off mt40 markDown" : "mt40 markDown"}>
              <div className="field">
                <input
                  type="text"
                  placeholder="タイトル"
                  maxLength={64}
                  name="blogtitle"
                  onChange={changeTitle}
                  required
                  defaultValue={props.blog && props.blog.Title}
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
                  defaultValue={
                    props.blog && props.blog.Abstract && props.blog.Abstract
                  }
                />
              </div>
              <div className="mt20 field">
                <textarea
                  name="content"
                  className="content"
                  onChange={changePrev}
                  placeholder="本文: マークダウン形式です"
                  style={{ height: `${textHeight}px` }}
                  required
                  defaultValue={props.blog && props.blog.Content}
                ></textarea>
              </div>
            </div>
            <div className={isPrev ? "columnArea mt40" : "columnArea mt40 off"}>
              <h1 className="brAll">{title}</h1>
              {abst && <p className="mt20 abstract preWrap brAll">{abst}</p>}
              <ReactMarkdown
                className="mt40 preWrap brAll"
                plugins={[remarkGfm]}
                unwrapDisallowed={false}
              >
                {prev}
              </ReactMarkdown>
            </div>
            <div className="mt20">
              <button type="submit" className="floatR">
                {props.blog ? "編集する" : "作成する"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ColumnEditor;
