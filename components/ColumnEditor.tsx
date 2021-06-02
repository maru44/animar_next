import { NextPage } from "next";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TAnimeMinimum } from "../types/anime";
import { fetchPostBlog, fetchUpdateBlog } from "../helper/BlogHelper";
import { fetchSearchAnime } from "../helper/AnimeHelper";
import { TBlog } from "../types/blog";
import { extractValueList } from "../helper/BaseHelper";
import ColumnSelectAnime from "./ColumnSelectAnime";
import { useRouter } from "next/router";
import MessageComponent, { IMessage } from "./Message";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface Props {
  blog?: TBlog;
}

const ColumnEditor: NextPage<Props> = (props) => {
  // inputed value
  useRequireLogin();
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const router = useRouter();
  const [title, setTitle] = useState<string>(
    props.blog ? props.blog.Title : null
  );
  const [abst, setAbst] = useState<string>(
    props.blog ? props.blog.Abstract : null
  );
  const [prev, setPrev] = useState<string>(
    props.blog ? props.blog.Content : null
  );

  const [mess, setMess] = useState<IMessage[]>(null);

  const initialRelAnimeIds: number[] = props.blog
    ? extractValueList(props.blog.Animes, "AnimeId")
    : [];
  const initialRelAnimeTitles: string[] = props.blog
    ? extractValueList(props.blog.Animes, "Title")
    : [];

  const [isPrev, setIsPrev] = useState<boolean>(false);
  const [textHeight, setTextHeight] = useState<number>(0);

  // relation anime
  const [changed, setChanged] = useState<number>(initialRelAnimeIds.length);
  const [relAnimeIds, setRelAnimeIds] = useState<number[]>(initialRelAnimeIds);
  const [relAnimeTitles, setRelAnimeTitles] = useState<string[]>(
    initialRelAnimeTitles
  );
  const [searchedAnime, setSearchedAnime] = useState<TAnimeMinimum[]>(null);

  const startPostBlog = async (e: any) => {
    e.preventDefault();
    if (title && prev) {
      const mess: IMessage = { title: "送信中" };
      setMess([mess]);
      const ret = await fetchPostBlog(title, abst, prev, relAnimeIds);
      ret["Status"] === 200 && router.push("/column");
    }
  };
  const startEditBlog = async (e: any) => {
    e.preventDefault();
    const mess: IMessage = { title: "送信中" };
    setMess([mess]);
    if (title && prev) {
      const ret = await fetchUpdateBlog(
        props.blog.ID,
        title,
        abst,
        prev,
        relAnimeIds
      );
      ret["Status"] === 200 && router.back();
    }
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
      ret["Status"] === 200 && setSearchedAnime(ret["Data"]);
    }
  };

  const addSelected = (e: any): null => {
    const id = parseInt(e.target.dataset.id);
    const title = e.target.dataset.title;
    if (!relAnimeIds.includes(id) && relAnimeIds.length < 5) {
      const newC = changed + 1;
      setChanged(newC);
      const newIds = relAnimeIds;
      const newTitles = relAnimeTitles;
      newIds.push(id);
      newTitles.push(title);
      setRelAnimeIds(newIds);
      setRelAnimeTitles(newTitles);
    }
    return null;
  };

  const deleteSelected = (e: any): null => {
    const newC = changed - 1;
    setChanged(newC);
    const idx = parseInt(e.target.dataset.idx);
    const newIds = relAnimeIds.filter((v, i) => i !== idx);
    const newTitles = relAnimeTitles.filter((v, i) => i !== idx);
    setRelAnimeIds(newIds);
    setRelAnimeTitles(newTitles);
    console.log(newIds);
    return null;
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="mt40" onClick={changeIsPrev}>
            <span className="prevBtn">
              {isPrev ? "編集に戻る" : "プレビュー"}
            </span>
          </div>
          {!isPrev && (
            <div className="mt20">
              <input
                type="text"
                name="keyword"
                placeholder="関連アニメ"
                onChange={searchAnime}
                autoComplete="off"
              />
              <ColumnSelectAnime
                changed={changed}
                searchedAnime={searchedAnime}
                addSelected={addSelected}
                relAnimeTitles={relAnimeTitles}
                deleteSelected={deleteSelected}
              ></ColumnSelectAnime>
            </div>
          )}
          <form
            onSubmit={props.blog ? startEditBlog : startPostBlog}
            className="mt40"
          >
            <div className={isPrev ? "off markDown" : "mt40 markDown"}>
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
            <div className={isPrev ? "columnArea" : "columnArea off"}>
              <h1 className="brAll">{title}</h1>
              {relAnimeTitles && (
                <div className="mt20 relAnimeList">
                  {relAnimeTitles.map((title: string, idx: number) => (
                    <span className="hrefBox mr20" key={idx}>
                      {title}
                    </span>
                  ))}{" "}
                </div>
              )}
              {abst && <p className="mt20 abstract preWrap brAll">{abst}</p>}
              <ReactMarkdown
                className="mt40 preWrap brAll"
                plugins={[remarkGfm]}
                unwrapDisallowed={false}
              >
                {prev}
              </ReactMarkdown>
            </div>
            <MessageComponent messages={mess}></MessageComponent>
            {CurrentUser && CurrentUser.isVerify && (
              <div className="mt20">
                <button type="submit" className="floatR">
                  {props.blog && CurrentUser.rawId === props.blog.UserId
                    ? "編集する"
                    : "作成する"}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default ColumnEditor;
