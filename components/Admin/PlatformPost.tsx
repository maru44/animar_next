import { NextPage } from "next";
import { TPlatformAdmin } from "../../types/platform";

interface Props {
  plat: TPlatformAdmin;
  fetchFunc: any;
}

const PlatformPost: NextPage<Props> = (props) => {
  const plat = props.plat;

  return (
    <div className="mt40">
      <form className="" onSubmit={props.fetchFunc}>
        <div className="field">
          <input
            type="text"
            name="eng_name"
            placeholder="*** eng_name"
            required
            defaultValue={plat && plat.eng_name ? plat.eng_name : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="plat_name"
            placeholder="plat_name"
            defaultValue={plat && plat.plat_name ? plat.plat_name : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="image"
            name="thumb_url"
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="url"
            placeholder="url"
            defaultValue={plat && plat.base_url ? plat.base_url : ""}
          />
        </div>
        <div className="mt20">
          <label htmlFor="valid">
            <input
              id="valid"
              type="checkbox"
              name="valid"
              defaultChecked={plat ? plat.is_valid : true}
            />
            有効
          </label>
        </div>
        <div className="field mt20">
          <button type="submit">追加する</button>
        </div>
      </form>
    </div>
  );
};

export default PlatformPost;
