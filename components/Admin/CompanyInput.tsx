import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  fetchCompanies,
  InsertCompany,
  UpdateCompany,
} from "../../helper/admin/CompanyHelper";
import { TCompany } from "../../types/company";

type Props = {
  comp?: TCompany;
};

const CompanyInput: React.FC<Props> = (props) => {
  const [comps, setComps] = useState<TCompany[]>(null);
  const router = useRouter();

  const startPostCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    if (props.comp) {
      const res = await UpdateCompany(
        t.company_name.value,
        t.company_eng.value,
        t.official_url.value,
        t.twitter.value,
        t.explanation.value,
        props.comp.eng_name
      );
      if (res.status === 200) {
        router.reload();
      }
    } else {
      const res = await InsertCompany(
        t.company_name.value,
        t.company_eng.value,
        t.official_url.value,
        t.twitter.value,
        t.explanation.value
      );
      if (res.status === 200) {
        router.reload();
      }
    }
  };

  const hrefUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.eng_name.value);
    router.push(`/admin/company/${e.currentTarget.eng_name.value}`);
  };

  useEffect(() => {
    (async () => {
      const res = await fetchCompanies();
      const ret = await res.json();
      setComps(ret["data"]);
    })();
  }, []);

  return (
    <div>
      <form onSubmit={startPostCompany}>
        <div className="field">
          <input
            type="text"
            name="company_name"
            required
            placeholder="company name"
            defaultValue={props.comp && props.comp.name ? props.comp.name : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="company_eng"
            required
            placeholder="company eng name"
            defaultValue={
              props.comp && props.comp.eng_name ? props.comp.eng_name : ""
            }
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="official_url"
            placeholder="official url"
            defaultValue={
              props.comp && props.comp.official_url
                ? props.comp.official_url
                : ""
            }
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="twitter"
            placeholder="twitter"
            defaultValue={
              props.comp && props.comp.twitter_account
                ? props.comp.twitter_account
                : ""
            }
          />
        </div>
        <div className="field mt20">
          <textarea
            name="explanation"
            rows={5}
            placeholder="説明"
            defaultValue={
              props.comp && props.comp.explanation ? props.comp.explanation : ""
            }
          ></textarea>
        </div>
        <div className="field mt40">
          <button type="submit">会社追加</button>
        </div>
      </form>
      <form className="mt40" onSubmit={hrefUpdate}>
        <div className="flexNormal spBw">
          <select name="eng_name">
            <option value={0}>----------</option>
            {comps &&
              comps.map((c, index) => (
                <option key={index} value={c.eng_name}>
                  {c.name}
                </option>
              ))}
          </select>
          <button className="" type="submit">
            会社編集
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInput;
