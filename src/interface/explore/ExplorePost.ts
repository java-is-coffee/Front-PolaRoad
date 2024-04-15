import ConceptType from "enum/ConceptOptionType";
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
  sortBy: string | null;
  concept: string | null;
  region: string | null;
}

export interface GetFollowListDTO {
  paging: number;
  pagingNumber: number;
}

export const { sortSet, conceptSet, regionSet } = {
  sortSet: {
    key: Object.keys(SortOptionType),
    values: Object.values(SortOptionType),
  },
  conceptSet: {
    key: Object.keys(ConceptType),
    values: Object.values(ConceptType),
  },
  regionSet: {
    key: Object.keys(RegionOptionType),
    values: Object.values(RegionOptionType),
  },
};
