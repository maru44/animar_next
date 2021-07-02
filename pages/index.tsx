import { NextPage } from "next";

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
                <p className="brAll">見ているアニメを簡単に管理できる</p>
              </div>
              <div className="homeCard">
                <p>今熱いアニメがわかる</p>
              </div>
              <div className="homeCard">
                <p>簡単レビュー</p>
              </div>
              <div className="homeCard">
                <p>簡単コラム作成</p>
              </div>
            </div>
            <div className="mt60 releaseSchedule wM500px mla mra">
              <h2 className="textCen">追加予定機能</h2>
              <ul className="mt10">
                <li>お問い合わせフォーム</li>
                <li>コラムのコメント、いいね機能</li>
                <li>ユーザー同士のフォロー機能</li>
                <li>ソーシャルログイン</li>
                <li>検索、フィルター、ソート</li>
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
