import { useEffect, useState } from "react";
import { fetchAllStaff, fetchPostStaff } from "../../helper/admin/StaffHelper";
import { Staff } from "../../types/staff";

const StaffInput: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>(null);
  const startPostStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const res = await fetchPostStaff(
      t.family_name.value,
      t.given_name.value,
      t.eng_name.value
    );
    if (res.status === 200) {
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetchAllStaff();
      const ret = await res.json();
      setStaffs(ret["data"]);
    })();
  }, []);
  return (
    <div>
      <form onSubmit={startPostStaff}>
        <div className="field">
          <label>eng name</label>
          <input type="text" name="eng_name" required />
        </div>
        <div className="field mt20">
          <label>氏</label>
          <input type="text" name="family_name" required />
        </div>
        <div className="field mt20">
          <label>名</label>
          <input type="text" name="given_name" />
        </div>
        <div className="field mt40">
          <button type="submit">スタッフ追加</button>
        </div>
      </form>
      <div className="mt40">
        <select>
          <option value={0}>----------</option>
          {staffs &&
            staffs.map((s, index) => (
              <option value={s.id} key={index}>
                {s.family_name} {s.given_name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default StaffInput;
