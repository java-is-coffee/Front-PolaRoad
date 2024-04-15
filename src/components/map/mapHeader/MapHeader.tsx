import headerStyles from "./MapHeader.module.css";

import StarIcon from "@mui/icons-material/Star";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ForestIcon from "@mui/icons-material/Forest";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ConceptType from "enum/ConceptOptionType";

// 아이콘을 Enum 값과 직접 매핑
const iconMap = {
  [ConceptType.HOT]: <StarIcon />,
  [ConceptType.FOOD]: <KebabDiningIcon />,
  [ConceptType.CITY]: <ApartmentIcon />,
  [ConceptType.NATURE]: <ForestIcon />,
  [ConceptType.WALK]: <DirectionsWalkIcon />,
  [ConceptType.TRAIN]: <TrainIcon />,
  [ConceptType.CAR]: <DirectionsCarFilledIcon />,
  [ConceptType.PHOTO]: <PhotoCameraIcon />,
};

interface MapHeaderProps {
  selectedConcept?: ConceptType;
  handleSelectConcept: (type: ConceptType) => void;
}

const MapHeader = ({
  selectedConcept,
  handleSelectConcept,
}: MapHeaderProps) => {
  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.option}>
        {Object.entries(iconMap).map(([type, IconComponent], index) => (
          <div
            key={index}
            className={`${headerStyles.optionItem} ${
              selectedConcept === type ? headerStyles.active : ""
            }`}
            onClick={() => handleSelectConcept(type as ConceptType)}
          >
            {IconComponent}
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapHeader;
