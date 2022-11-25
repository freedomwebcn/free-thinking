import ajax from './ajax';

export const reqHomeData = () => ajax(`data=home`);
export const reqTitleData = ({ id }) => ajax(`data=author&id=${id}`);
export const reqMagazineData = () => ajax(`data=magazine_list`);
export const reqMagazineDirData = ({ year }) => ajax(`data=magazine_dir&year=${year}`);

export const reqContent = ({ author_id, title_id }) => ajax(`data=content&author_id=${author_id}&title_id=${title_id}`);
