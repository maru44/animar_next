import { GetServerSideProps, NextPage } from "next";
import { fetchPostBlog } from "../../helper/BlogHelper";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TAnimeMinimum } from "../../types/anime";
import { fetchSearchAnime } from "../../helper/AnimeHelper";
import ColumnEditor from "../../components/ColumnEditor";

const BlogPost: NextPage = () => {
  // inputed value
  const [title, setTitle] = useState<string>(null);
  const [abst, setAbst] = useState<string>(null);
  const [prev, setPrev] = useState<string>(null);

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

  return <ColumnEditor></ColumnEditor>;
};

export default BlogPost;
