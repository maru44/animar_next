import { InsertCompany } from "../../helper/admin/CompanyHelper";

const CompanyInput: React.FC = () => {
  const startPostCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const res = await InsertCompany(
      t.company_name.value,
      t.company_eng.value,
      t.official_url.value,
      t.twitter.value,
      t.explanation.value
    );
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <form onSubmit={startPostCompany}>
        <div className="field">
          <input
            type="text"
            name="company_name"
            required
            placeholder="company name"
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="company_eng"
            required
            placeholder="company eng name"
          />
        </div>
        <div className="field mt20">
          <input type="text" name="official_url" placeholder="official url" />
        </div>
        <div className="field mt20">
          <input type="text" name="twitter" placeholder="twitter" />
        </div>
        <div className="field mt20">
          <textarea name="explanation" rows={5} placeholder="説明"></textarea>
        </div>
        <div className="field mt40">
          <button type="submit">会社追加</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyInput;
