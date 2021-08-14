import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="homePage">
            <h1 className="textCen h1Title">LoveAni.me</h1>
            <h4 className="mt20 textCen">
              ラブアニメはアニメ好きの<span>アニメ好きによる</span>
              <span>アニメ好きのためのサイト。</span>
              <br />
              アニメ視聴管理、レビュー、コラム作成が簡単にできます。
            </h4>
            <div className="mt40 homeCardList flexNormal spBw flexWrap">
              <div className="homeCard">
                <h4 className="brAll">見ているアニメを簡単に管理できる</h4>
              </div>
              <div className="homeCard">
                <h4>今熱いアニメがわかる</h4>
              </div>
              <div className="homeCard">
                <h4>簡単レビューと共有機能</h4>
                <p className="mb10 mt5">
                  レビューを投稿すると画像のように綺麗な見た目で簡単に共有できます。
                </p>
                <Link
                  href={
                    "/_next/image?url=%2Fimage%2Freview_function.png&w=640&q=75"
                  }
                  passHref
                >
                  <a target="_new">
                    <Image
                      src={`/image/review_function.png`}
                      alt={`レビュー共有機能`}
                      width={584}
                      height={486}
                    />
                  </a>
                </Link>
              </div>
              <div className="homeCard">
                <h4>簡単コラム作成</h4>
                <p className="mb10 mt5">
                  快適な記事作成をサポートします。
                  <br />
                  ※以下の動画をクリックすると実際に作成している様子が見れます。
                </p>
                <Link href={`/image/column2.mp4`}>
                  <a target="_new">
                    <video
                      width={`${100}%`}
                      max-width={1280}
                      max-height={720}
                      muted
                      loop
                    >
                      <source src={`/image/column2.mp4`} type="video/mp4" />
                    </video>
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt60 releaseSchedule wM500px mla mra">
              <h2 className="textCen">追加予定機能</h2>
              <ul className="mt10">
                <li>お問い合わせフォーム</li>
                <li>コラムのコメント、いいね機能</li>
                <li>ユーザー同士のフォロー機能</li>
                <li>検索、フィルター、ソート</li>
                <li>etc</li>
                <li className="mt20">
                  <strong>鋭意制作中です。ご期待ください</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
