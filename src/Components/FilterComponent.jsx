import { useState } from 'react';

export function FilterComponent({ filterOpen, setFilterOpen }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const allCategories = [
    { categoryName: 'Apparel', subcategories: ['Services', 'Children', 'Men', 'Women', 'Baby'] },
    { categoryName: 'Automotive', subcategories: ['Services', 'Parts', 'Equipment', 'Rentals'] },
    { categoryName: 'Home', subcategories: ['Services', 'Furniture', 'Outdoors', 'Equipment', 'Appliances'] },
    { categoryName: 'Entertainment', subcategories: ['Services', 'Books', 'Electronics', 'Equipment', 'Instruments', 'Events'] },
    { categoryName: 'Sports', subcategories: ['Water', 'Biking', 'Running', 'Winter', 'General'] },
    { categoryName: 'Outdoors', subcategories: ['Services', 'Resources', 'Equipment'] },
    { categoryName: 'Animals', subcategories: ['Services', 'Livestock', 'Exotic', 'Pets'] },
  ];

  return (
    <section className="drawer z-10">
      <input id="filter-component" readOnly type="checkbox" className="drawer-toggle" checked={!!filterOpen} />
      <section className="drawer-content">
        {/* Page content here */}
        <label htmlFor="filter-component" onClick={() => setFilterOpen(true)} className="btn btn-ghost">
          <button className="btn">Filter</button>
        </label>
      </section>
      
      {/* Drawer */}
      <section className="drawer-side">
        <label htmlFor="filter-component" aria-label="close sidebar" onClick={() => setFilterOpen(false)} className="drawer-overlay"></label>
        <section className="bg-base-200 p-4 w-80 min-h-full mt-20">
          <div className="form-control">
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
                <button
                  onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                  className="btn btn-link text-left w-full"
                >
                  {category.categoryName}
                </button>
                {expandedCategory === index && (
                  <div className="ml-4 mt-2">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div key={subIndex} className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">{subcategory}</span>
                          <input type="checkbox" className="checkbox checkbox-primary" />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
