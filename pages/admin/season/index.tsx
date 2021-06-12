import { NextPage, GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { BACKEND_URL } from "../../../helper/Config";
import { TSeason } from "../../../types/season";

interface Props {
  seasons: TSeason[];
  robots: string;
  kind: string;
  list: number;
}

const SeasonIndex: NextPage<Props> = (props) => {
  const startInsertSeason = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/admin/season/post/`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        year: e.target.year.value,
        season: e.target.season.value,
      }),
    });
    const ret = await res.json();
  };

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div>
            <h3>追加</h3>
            <form onSubmit={startInsertSeason}>
              <div className="field">
                <input
                  type="text"
                  name="year"
                  placeholder="year"
                  minLength={4}
                  maxLength={4}
                />
              </div>
              <div className="field mt20">
                <input type="text" name="season" placeholder="season" />
              </div>
              <div className="field mt20">
                <button type="submit">追加</button>
              </div>
            </form>
          </div>
          <div className="mt20">
            <h3>一覧</h3>
            <div>
              {props.seasons &&
                props.seasons.map((s, index) => (
                  <div key={index}>
                    {s.year}
                    {s.season}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = parseCookies(ctx);
  const res = await fetch(`${BACKEND_URL}/season/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: cookies["idToken"] }),
  });
  const ret = await res.json();
  return {
    props: {
      seasons: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
      kind: "admin",
      list: 3,
    },
  };
};

export default SeasonIndex;
