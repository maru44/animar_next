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
