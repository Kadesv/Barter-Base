import { useState, useRef, useEffect, useMemo, useReducer, memo } from 'react';
import debounce from 'lodash.debounce';

function expandedCategoryReducer(state, action) {
  return state === action ? null : action;
}

export function FilterComponent({ filterOpen, setFilterOpen, navHeight }) {
  const [expandedCategory, dispatch] = useReducer(expandedCategoryReducer, null);
  const containerRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState(0);

  const allCategories = useMemo(() => [
    { categoryName: 'Apparel', subcategories: ['Services', 'Children', 'Men', 'Women', 'Baby'] },
    { categoryName: 'Automotive', subcategories: ['Services', 'Parts', 'Equipment', 'Rentals'] },
    { categoryName: 'Home', subcategories: ['Services', 'Furniture', 'Outdoors', 'Equipment', 'Appliances'] },
    { categoryName: 'Entertainment', subcategories: ['Services', 'Books', 'Electronics', 'Equipment', 'Instruments', 'Events'] },
    { categoryName: 'Sports', subcategories: ['Water', 'Biking', 'Running', 'Winter', 'General'] },
    { categoryName: 'Outdoors', subcategories: ['Services', 'Resources', 'Equipment'] },
    { categoryName: 'Animals', subcategories: ['Services', 'Livestock', 'Exotic', 'Pets'] },
  ], []);

  const updateButtonPosition = () => {
    if (containerRef.current) {
      setButtonPosition(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    const debouncedUpdate = debounce(updateButtonPosition, 200);
    debouncedUpdate(); // Set initial button position
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, []);

  return (
    <section className="relative z-10 drawer">
      <input
        id="filter-component"
        readOnly
        type="checkbox"
        className="drawer-toggle"
        checked={!!filterOpen}
      />
      <section className="drawer-side min-h-full">
        <label
          htmlFor="filter-component"
          className="drawer-overlay"
          onClick={() => setFilterOpen(false)}
        />
        <section ref={containerRef} className="bg-base-200 p-4 lg:w-80 min-h-full flex flex-col">
          <form id="filterForm" className="relative">
            <div className="form-control mt-8">
              <label className="label">Zip Code</label>
              <input type="text" placeholder="Enter zip code" className="input input-bordered" />
            </div>
            <div className="form-control mt-4">
              <label className="label">Mile Range</label>
              <input type="text" placeholder="Enter mile range" className="input input-bordered" />
            </div>
            <div className="mt-6">
              <h3 className="font-bold">Categories</h3>
              {allCategories.map((category, index) => (
                <div key={index} className="mt-2">
                  <div
                    className={`collapse collapse-arrow ${expandedCategory === index ? 'collapse-open' : 'collapse-close'}`}
                    aria-expanded={expandedCategory === index}
                  >
                    <input
                      type="checkbox"
                      className="peer"
                      onChange={() => dispatch(index)}
                    />
                    <div className="collapse-title text-lg font-medium text-left">
                      {category.categoryName}
                    </div>
                    <div className="collapse-content ml-4 mt-2">
                      {expandedCategory === index &&
                        category.subcategories.map((subcategory, subIndex) => (
                          <div key={subIndex} className="form-control">
                            <label className="cursor-pointer label">
                              <span className="label-text">{subcategory}</span>
                              <input type="checkbox" className="checkbox" />
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
          <div
            style={{
              position: 'absolute',
              left: buttonPosition,
              top: navHeight,
              zIndex: 20,
            }}
          >
            <label htmlFor="filter-component">
              <button
                aria-label="toggle sidebar"
                onClick={() => setFilterOpen(!filterOpen)}
                className={`pointer-events-auto transition-colors duration-100 border-r-2 border-b-2 border-base-300 px-2 rounded-br-lg flex ${filterOpen ? 'bg-base-200' : 'bg-base-300'
                  } hover:bg-base-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`transition-all duration-300 size-20 md:size-16 lg:size-12 ${filterOpen ? 'opacity-100' : 'opacity-80'
                    } hover:opacity-100`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                  <g transform="translate(24, 0)">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={filterOpen ? "M15.75 19.5 8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
                    />
                  </g>
                </svg>
              </button>
            </label>
          </div>
        </section>
      </section>
    </section>
  );
}

export default memo(FilterComponent);
