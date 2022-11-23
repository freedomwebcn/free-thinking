import ajax from './ajax';

export const reqHomeData = () => ajax(`?data=home`);
export const reqAuthorDirData = ({ id }) => ajax(`?author=${id}`);

export const reqMagazineData = () => ajax(`get_magazine_list.php?data=magazine_list`);
export const reqMagazineDirData = ({ year }) => ajax(`?mgz=${year}`);
