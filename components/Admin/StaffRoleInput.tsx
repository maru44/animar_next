import React, { useEffect, useState } from "react";
import { Staff, Role } from "../../types/staff";
import { fetchAllStaff } from "../../helper/admin/StaffHelper";
import {
  fetchAllRole,
  fetchPostStaffRole,
} from "../../helper/admin/RoleHelper";
import LocalMessage from "../../components/LocalMessage";

interface Props {
  animeId: number;
}

const StaffRoleInput: React.FC<Props> = (props) => {
  const [staffs, setStaffs] = useState<Staff[]>(null);
  const [roles, setRoles] = useState<Role[]>(null);
  const [mess, setMess] = useState<string[]>(null);

  useEffect(() => {
    (async () => {
      const resS = await fetchAllStaff();
      if (resS.status === 200) {
        const ret = await resS.json();
        setStaffs(ret["data"]);
      }

      const resR = await fetchAllRole();
      if (resR.status === 200) {
        const ret = await resR.json();
        setRoles(ret["data"]);
      }
    })();
  }, []);

  const startPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMess(null);
    const t = e.currentTarget;
    const res = await fetchPostStaffRole(
      props.animeId,
      parseInt(t.role.value),
      parseInt(t.staff.value)
    );
    res.status === 200 && setMess(["投稿完了"]);
    res.status !== 200 && setMess([`${res.status}`]);
  };

  return (
    <div>
      <form onSubmit={startPost} className="field mt20">
        <div>
          <select defaultValue={0} name="staff">
            <option value={0}>----------</option>
            {staffs &&
              staffs.map((staff: Staff, index) => (
                <option key={index} value={staff.id}>
                  {staff.family_name}
                  {staff.given_name}
                </option>
              ))}
          </select>
          <select defaultValue={0} name="role">
            <option value={0}>----------</option>
            {roles &&
              roles.map((role: Role, index) => (
                <option key={index} value={role.id}>
                  {role.role}
                </option>
              ))}
          </select>
        </div>
        <div className="mt20 mb20">
          <button type="submit">追加する</button>
        </div>
        <LocalMessage message={mess} />
      </form>
    </div>
  );
};

export default StaffRoleInput;
