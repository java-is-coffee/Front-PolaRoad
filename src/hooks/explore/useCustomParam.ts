import useStoreValue from "hooks/storeValue/useStoreValue";
import { conceptSet, regionSet, sortSet } from "interface/explore/ExplorePost";
import { useSearchParams } from "react-router-dom";
import {
  switchConcept,
  switchRegion,
  switchSort,
} from "../../redux/reducers/explore/filterReducer";

const useCustomParam = () => {
  const { setValue } = useStoreValue();
  const [params] = useSearchParams();

  const settingNumber = (param: string | null, input: string) => {
    if (input === "region") {
      const regionNumber = param ? regionSet.key.indexOf(param) : null;
      return regionNumber;
    } else if (input === "concept") {
      const conceptNumber = param ? conceptSet.key.indexOf(param) : null;
      return conceptNumber;
    } else {
      const sortNumber = param ? sortSet.key.indexOf(param) : null;
      return sortNumber;
    }
  };

  const getContent = (input: string) => {
    const contentParam = params.get(input);
    const contentNumber = settingNumber(contentParam, input);

    if (input === "region") {
      if (contentNumber !== null) {
        setValue(switchRegion(regionSet.values[contentNumber]));
      }
    } else if (input === "concept") {
      if (contentNumber !== null) {
        setValue(switchConcept(conceptSet.values[contentNumber]));
      }
    } else {
      if (contentNumber !== null) {
        setValue(switchSort(sortSet.values[contentNumber]));
      }
    }
  };

  return { getContent };
};

export default useCustomParam;
