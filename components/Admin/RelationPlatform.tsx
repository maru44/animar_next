import { TRelationPlatform } from "../../types/platform";

interface Props {
  startFetchFunc: VoidFunction;
  allPlats: TRelationPlatform[];
}

const RelationPlatform: React.FC<Props> = (props) => {
  return (
    <div>
      <form className="mt40" onSubmit={props.startFetchFunc}>
        <div className="field">
          <input type="text" name="url" />
        </div>
        <div className="field mt20">
          <select name="plat">
            {/* {allPlats &&
              allPlats.map((p, index) => (
                <option key={index} value={p.ID}>
                  {p.PlatName}
                </option>
              ))} */}
          </select>
        </div>
        <div className="field mt20">
          <button className="" type="submit">
            追加する
          </button>
        </div>
      </form>
    </div>
  );
};
