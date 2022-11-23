import ajax from './ajax';

export const reqHomeData = () => ajax(`data=home`);
export const reqAuthorDirData = ({ id }) => ajax(`data=author&id=${id}`);
export const reqMagazineData = () => ajax(`data=magazine_list`);
export const reqMagazineDirData = ({ year }) => ajax(`data=magazine_dir&year=${year}`);
