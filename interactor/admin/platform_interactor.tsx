import {
  fetchInsertRelationPlatform,
  updateRelationPlatform,
} from '../../helper/admin/PlatformHelper';

export const startAddRelationPlatform = async (
  e: React.FormEvent<HTMLFormElement>,
  animeId: number
) => {
  e.preventDefault();
  const res = await fetchInsertRelationPlatform(
    animeId,
    parseInt(e.currentTarget.plat.value),
    e.currentTarget.url.value,
    e.currentTarget.interval.value,
    e.currentTarget.fb.value
  );
};

export const startUpdateRelationPlatform = async (
  e: React.FormEvent<HTMLFormElement>,
  animeId: number
) => {
  e.preventDefault();
  const res = await updateRelationPlatform(
    animeId,
    parseInt(e.currentTarget.plat.value),
    e.currentTarget.url.value,
    e.currentTarget.interval.value,
    e.currentTarget.fb.value
  );
};
