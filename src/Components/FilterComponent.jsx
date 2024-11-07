export function FilterComponent({ filterOpen, setFilterOpen }) {
  return (
    <section className="drawer z-10 ">
      <input id="filter-component" readOnly type="checkbox" className="drawer-toggle" checked={!!filterOpen} />
      <section className="drawer-content ">
        {/* Page content here */}
        <label htmlFor="filter-component" onClick={() => {setFilterOpen(true)}} className="btn btn-ghost ">
          <button className="btn">filter</button>
        </label>
      </section>
      {/*drawer */}
      <section className="drawer-side ">
        <label htmlFor="filter-component" aria-label="close sidebar" onClick={() => { setFilterOpen(false) }} className="drawer-overlay"></label>
        <section className=" bg-base-200 p-4 w-80 min-h-full ">
          {/* Sidebar content here */}
          <button className="btn mt-20"></button>
        </section>
      </section>
    </section>
  )
}