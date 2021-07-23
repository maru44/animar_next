import React, { useEffect, useState } from "react";
import { fetchAllRole, fetchPostRole } from "../../helper/admin/RoleHelper";
import { Role } from "../../types/staff";

const RoleInput: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(null);

  const startPostRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const res = await fetchPostRole(parseInt(t.num.value), t.role.value);
    if (res.status === 200) {
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetchAllRole();
      const ret = await res.json();
      setRoles(ret["data"]);
    })();
  }, []);

  return (
    <div>
      <form onSubmit={startPostRole}>
        <div className="field">
          <input type="text" name="num" placeholder="number" required />
        </div>
        <div className="field mt20">
          <input type="text" name="role" placeholder="role name" required />
        </div>
        <div className="mt40 field">
          <button type="submit">役割追加</button>
        </div>
      </form>
      <div className="mt40">
        <select>
          <option value={0}>----------</option>
          {roles &&
            roles.map((r, index) => (
              <option key={index} value={r.id}>
                {r.role}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default RoleInput;
