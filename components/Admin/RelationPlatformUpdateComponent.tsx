import React from 'react';
import { startUpdateRelationPlatform } from '../../interactor/admin/platform_interactor';
import { TRelationPlatform } from '../../types/platform';
import RelationPlatformComponent from './RelationPlatformComponent';

type props = {
  isOpen: boolean;
  closeFunc: VoidFunction;
  relPlat: TRelationPlatform;
};

const RelationPlatformUpdateComponent = (props: props) => {
  const plat = props.relPlat;

  if (props.isOpen) {
    return (
      <div>
        <div className="modal" onClick={props.closeFunc}></div>
        <div className="modalCon">
          {/* <form
            className=""
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              startUpdateRelationPlatform(e, plat.anime_id)
            }
          >
            <input type="hidden" name="plat" value={plat.platform_id} />
            <h3>{plat && plat.plat_name}</h3>
            <div className="field mt20">
              <input type="text" name="url" defaultValue={plat.link_url} />
            </div>
            <div className="field mt20">
              <label>初回放送日時</label>
              <input type="datetime-local" name="fb" defaultValue={fDay()} />
            </div>
            <div className="field mt20">
              <select name="interval" defaultValue={plat.interval}>
                <option value="">------------</option>
                {listInterval.map((v: string, i: number) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="field mt20">
              <button className="" type="submit">
                編集する
              </button>
            </div>
          </form> */}
          <RelationPlatformComponent
            relPlat={plat}
            animeId={plat.anime_id}
            allPlats={null}
            startFetchFunc={startUpdateRelationPlatform}
          ></RelationPlatformComponent>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default RelationPlatformUpdateComponent;
