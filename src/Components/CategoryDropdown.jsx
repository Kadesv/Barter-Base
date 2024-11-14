export default function CategoryDropdown({ categories, postInfo, setPostInfo }) {
  return (
    <>
      <select
        className="select my-1 mx-2 focus:outline-none select-bordered w-full max-w-sm"
        onChange={(e) => setPostInfo({ ...postInfo, selectedCategory: e.target.value })}
        value={postInfo.selectedCategory || ''}
      >
        <option disabled value={''} hidden>Category</option>
        {categories.map(({ categoryId, categoryName }) => (
          <option key={categoryId} value={categoryId}>{categoryName}</option>
        ))}
      </select>

      <select
        className="select my-1 mx-2 focus:outline-none select-bordered w-full max-w-sm"
        disabled={!postInfo.selectedCategory}
        onChange={(e) => setPostInfo({ ...postInfo, selectedSubCategory: e.target.value })}
        value={postInfo.selectedSubCategory || ''}
      >
        <option disabled value={''} hidden>Sub Category</option>
        {postInfo.selectedCategory && categories[postInfo.selectedCategory - 1].subcategories.map(({ subCategoryId, subCategoryName }) => (
          <option key={subCategoryId} value={subCategoryId}>{subCategoryName}</option>
        ))}
      </select>
    </>
  );
}
