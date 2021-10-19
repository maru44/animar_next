import { TPlatformAdmin, TRelationPlatform } from '../../types/platform';
import { startAddRelationPlatform } from '../../interactor/admin/platform_interactor';
import React from 'react';
import { listInterval } from '../../helper/admin/PlatformHelper';

interface Props {
  startFetchFunc: (
    e: React.FormEvent<HTMLFormElement>,
    animeId: number
  ) => void;
  allPlats: TPlatformAdmin[];
  animeId: number;
  relPlat?: TRelationPlatform;
}

const RelationPlatformComponent: React.FC<Props> = (props) => {
  const plat = props.relPlat;
  const fDay = (): string => {
    if (plat.first_broadcast) {
      const lst = plat.first_broadcast.split(' ');
      return `${lst[0]}T${lst[1]}`;
    }

    return null;
  };

  return (
    <div>
      <form
        className="mt40"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          props.startFetchFunc(e, props.animeId)
        }
      >
        <div className="field">
          <input
            type="text"
            name="url"
            defaultValue={plat && plat.link_url && plat.link_url}
          />
        </div>
        {plat && plat.platform_id ? (
          <input
            className="field"
            type="hidden"
            name="plat"
            value={plat.platform_id}
          />
        ) : (
          <div className="field mt20">
            <select name="plat">
              {props.allPlats &&
                props.allPlats.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.plat_name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="field mt20">
          <label>初回放送日時</label>
          <input
            type="datetime-local"
            name="fb"
            defaultValue={plat && fDay() && fDay()}
          />
        </div>
        <div className="field mt20">
          <select
            name="interval"
            defaultValue={plat && plat.interval && plat.interval}
          >
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
            {plat ? '編集する' : '追加する'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelationPlatformComponent;
