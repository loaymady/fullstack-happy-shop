/* eslint-disable react/prop-types */
import UnopDropdown from "unop-react-dropdown";
import sort from "../../images/sort.png";

const SearchCountResult = ({ title, setSortBy, sortBy }) => {
  const handler = () => {};

  return (
    <div className="d-flex justify-content-between pt-3 px-2">
      <div className="sub-tile">{title}</div>
      <div className="search-count-text d-flex ">
        <UnopDropdown
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <p className="mx-1">
              <img
                width="20px"
                height="20px"
                className="ms-1"
                src={sort}
                alt=""
              />
              ترتيب حسب
            </p>
          }
          delay={0}
          align="CENTER"
          hover
        >
          <div className="card-filter">
            <div
              onClick={() => setSortBy("")}
              className={`border-bottom card-filter-item 
                ${sortBy == "" || sortBy == undefined ? "active" : ""}
                `}
            >
              بدون ترتيب
            </div>
            <div
              onClick={() => setSortBy("الاكثر مبيعا")}
              className={`border-bottom card-filter-item ${
                sortBy == "الاكثر مبيعا" ? "active" : ""
              }`}
            >
              الاكثر مبيعا
            </div>
            <div
              onClick={() => setSortBy("الاعلي تقييما")}
              className={`border-bottom card-filter-item ${
                sortBy == "الاعلي تقييما" ? "active" : ""
              }`}
            >
              الاعلي تقييما
            </div>
            <div
              onClick={() => setSortBy("السعر من الاقل للاعلي")}
              className={`border-bottom card-filter-item ${
                sortBy == "السعر من الاقل للاعلي" ? "active" : ""
              }`}
            >
              السعر من الاقل للاعلي
            </div>
            <div
              onClick={() => setSortBy("السعر من الاعلي للاقل")}
              className={`card-filter-item ${
                sortBy == "السعر من الاعلي للاقل" ? "active" : ""
              }`}
            >
              السعر من الاعلي للاقل
            </div>
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default SearchCountResult;
