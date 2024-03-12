import dropdownStyles from "./SearchDropdown.module.css";

function SearchDropdown() {
  const category: string[] = [
    "인기게시글",
    "식도락",
    "기차여행",
    "자동차여행",
    "도보여행",
    "포토스팟",
    "도시경관",
    "자연",
  ];
  const local: string[] = [
    "서울",
    "경기",
    "인천",
    "강원",
    "제주",
    "대전",
    "충북",
    "충남/세종",
    "부산",
    "울산",
    "경남",
    "대구",
    "경북",
    "광주",
    "전남",
    "전주/전북",
  ];

  return (
    <div className={dropdownStyles.wrapper}>
      <div className={dropdownStyles.option}>
        <div className={dropdownStyles.title}>카테고리</div>
        <div className={dropdownStyles.list}>
          {category.map((item) => (
            <div className={dropdownStyles.item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={dropdownStyles.option}>
        <div className={dropdownStyles.title}>지역</div>
        <div className={dropdownStyles.list}>
          {local.map((item) => (
            <div className={dropdownStyles.item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
