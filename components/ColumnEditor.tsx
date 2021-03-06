import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TAnimeMinimum } from "../types/anime";
import {
  fetchPostBlog,
  fetchUpdateBlog,
  fetchUploadImageColumn,
} from "../helper/BlogHelper";
import { fetchSearchAnime } from "../helper/AnimeHelper";
import { TBlog } from "../types/blog";
import { extractValueList } from "../helper/BaseHelper";
import ColumnSelectAnime from "./ColumnSelectAnime";
import { useRouter } from "next/router";
import MessageComponent, { IMessage } from "./Message";
import LocalMessage from "./LocalMessage";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface Props {
  blog?: TBlog;
}

const ColumnEditor: React.FC<Props> = (props) => {
  props.blog && useRequireLogin();
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const router = useRouter();
  const [title, setTitle] = useState<string>(
    props.blog ? props.blog.title : null
  );
  const [abst, setAbst] = useState<string>(
    props.blog ? props.blog.abstract : null
  );
  const [prev, setPrev] = useState<string>(
    props.blog ? props.blog.content : null
  );
  const [isPub, setIsPub] = useState<boolean>(
    (props.blog && props.blog.is_public) ?? true
  );

  const [mess, setMess] = useState<IMessage[]>(null);
  const [localMessage, setLocalMessage] = useState<string[]>(
    CurrentUser ? null : ["投稿にはログインする必要があります。"]
  );

  const initialRelAnimeIds: number[] = props.blog
    ? extractValueList(props.blog.animes, "anime_id")
    : [];
  const initialRelAnimeTitles: string[] = props.blog
    ? extractValueList(props.blog.animes, "title")
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

  const startPostBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && prev) {
      const mess: IMessage = { title: "送信中" };
      setMess([mess]);
      const res = await fetchPostBlog(title, abst, prev, relAnimeIds, isPub);
      res.status === 200 && router.push("/column");
    }
  };
  const startEditBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mess: IMessage = { title: "送信中" };
    setMess([mess]);
    if (title && prev) {
      const res = await fetchUpdateBlog(
        props.blog.id,
        title,
        abst,
        prev,
        relAnimeIds,
        isPub
      );
      res.status === 200 && router.back();
    }
  };

  // relation anime
  const searchAnime = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const res = await fetchSearchAnime(e.target.value);
      if (res.status === 200) {
        const ret = await res.json();
        ret["data"]
          ? setSearchedAnime(ret["data"])
          : setSearchedAnime(undefined);
      }
    } else {
      setSearchedAnime(null);
    }
  };

  const addSelected = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): null => {
    const id = parseInt(e.currentTarget.dataset.id);
    const title = e.currentTarget.dataset.title;
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

  const deleteSelected = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): null => {
    const newC = changed - 1;
    setChanged(newC);
    const idx = parseInt(e.currentTarget.dataset.idx);
    const newIds = relAnimeIds.filter((v, i) => i !== idx);
    const newTitles = relAnimeTitles.filter((v, i) => i !== idx);
    setRelAnimeIds(newIds);
    setRelAnimeTitles(newTitles);
    return null;
  };

  const dropImage = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const prevLength = prev ? prev.length : 0;
    const nowPosition = e.currentTarget.selectionStart;
    if (!CurrentUser) return;
    const imageUrl = await fetchUploadImageColumn(e.dataTransfer.files[0]);
    if (imageUrl) {
      const newPrev = prev
        ? `${prev.substr(0, nowPosition)}\n![](${imageUrl})${prev.substr(
            nowPosition,
            prevLength
          )}\n`
        : `![](${imageUrl})\n`;
      setPrev(newPrev);
      e.currentTarget.value = newPrev;
    }
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div
            className="mt40"
            onClick={() => {
              setIsPrev(!isPrev);
            }}
          >
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                  required
                  defaultValue={props.blog && props.blog.title}
                />
              </div>
              <div className="mt20 field">
                <textarea
                  rows={3}
                  className="abstract"
                  maxLength={160}
                  name="abst"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setAbst(e.target.value);
                  }}
                  placeholder="概要: 160文字以内"
                  defaultValue={
                    props.blog && props.blog.abstract && props.blog.abstract
                  }
                />
              </div>
              <div className="mt20 field">
                <textarea
                  name="content"
                  className="content"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setPrev(e.target.value);
                    setTextHeight(e.target.scrollHeight); // height auto
                  }}
                  placeholder="本文: マークダウン形式です。ドラッグアンドドロップで画像を挿入できます。"
                  style={{ height: `${textHeight}px` }}
                  required
                  defaultValue={props.blog && props.blog.content}
                  onDrop={dropImage}
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
            <div className="mt20 mb20">
              <LocalMessage message={localMessage}></LocalMessage>
            </div>
            <MessageComponent messages={mess}></MessageComponent>
            {CurrentUser && CurrentUser.isVerify && (
              <div className="mt20 flexNormal alCen">
                <div className="">
                  <label htmlFor="isPublic" className="cursorP">
                    <input
                      type="checkbox"
                      defaultChecked={isPub}
                      name="is_public"
                      id="isPublic"
                      className="mr20"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const isChecked = e.target.checked;
                        setIsPub(isChecked);
                      }}
                    />
                    公開する
                  </label>
                </div>
                <button type="submit" className="mla">
                  {props.blog && CurrentUser.rawId === props.blog.user_id
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
