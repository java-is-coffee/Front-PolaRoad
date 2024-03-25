import CategoryType from "enum/categoryOptionType";
import RegionOptionType from "enum/filter/RegionType";
import SortOptionType from "enum/filter/SortOptionType";

export interface PostData {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: string;
  region: string;
  images: string[];
}

export interface PostDTO {
  data: PostData;
}

export interface GetListDTO {
  paging: number;
  pagingNumber: number;
  searchType: string;
  keyword: string | null;
  sortBy: string;
  concept: string | null;
  region: string | null;
}

export const { sortSet, categorySet, regionSet } = {
  sortSet: {
    key: Object.keys(SortOptionType),
    values: Object.values(SortOptionType),
  },
  categorySet: {
    key: Object.keys(CategoryType),
    values: Object.values(CategoryType),
  },
  regionSet: {
    key: Object.keys(RegionOptionType),
    values: Object.values(RegionOptionType),
  },
};
