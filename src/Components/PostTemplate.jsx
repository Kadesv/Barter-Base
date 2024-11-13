import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImageMap from "./ImageMap";
import storage from "../services/firebase.config";  
import CurrencyInput from "react-currency-input-field";
import CategoryDropdown from "./CategoryDropdown";

const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function PostTemplate({ initialData, user, initialIsEditing, categories }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [newImageFile, setNewImageFile] = useState(null);
  const [postInfo, setPostInfo] = useState({
    postId: initialData.postId,
    title: initialData.title,
    context: initialData.context,
    image: initialData.image,
    price: initialData.price,
    selectedCategory: initialData.categoryId,
    selectedSubCategory: initialData.subCategoryId,
  });

  const handleEditClick=(e)=>{
    e.preventDefault();
    setIsEditing(true);
  }
  const handleFileUpload = async () => {
    const uploadedImages = [];
    for (let file of newImageFile) {
      const imgRef = ref(storage, `posts/${file.name}_${uuidv4()}`);
      try {
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        uploadedImages.push(url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
    setPostInfo({ ...postInfo, image: [...postInfo.image, ...uploadedImages] });
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (newImageFile) await handleFileUpload();

    try {
      const res = await axios.put('/api/posts/save/', postInfo);
      if (res.data.success) setIsEditing(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/posts/delete/${postInfo.postId}`);
      setIsEditing(false);
      navigate('/account');
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setPostInfo({
      postId: initialData.postId,
      title: initialData.title,
      context: initialData.context,
      image: initialData.image,
      price: initialData.price,
      selectedCategory: initialData.categoryId,
      selectedSubCategory: initialData.subCategoryId,
    });
    setIsEditing(false);
  };
  const handleImageDelete = (e) => {
    e.preventDefault();

  }

  return (
    <article id={`accountPost ${initialData.postId}`} className="m-14 flex flex-row bg-base-200 rounded-xl p-5 overflow-auto carousel-item min-w-min">
      <form className="grid grid-cols-3 h-auto w-full" id={`editPostForm ${initialData.postId}`} onSubmit={handleSavePost}>
        <div className="col-span-1">
          <figure className="carousel w-fit">
            <ImageMap images={postInfo.image} user={user} userId={initialData.userId} isEditing={isEditing} />
          </figure>
        </div>

        <div className="col-span-2">
          <input
            maxLength={25}
            className={`input mb-1 mx-2 input-bordered w-full max-w-sm ${!isEditing ? 'outline-none' : ''}`}
            placeholder="Title"
            readOnly={!isEditing}
            value={postInfo.title}
            onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
          />

          {isEditing ? (
            <CategoryDropdown categories={categories} postInfo={postInfo} setPostInfo={setPostInfo} />
          ) : (
            <>
              <input
                className="input my-1 mx-2 input-bordered w-full max-w-sm outline-none"
                readOnly
                value={categories.find((cat) => cat.categoryId === postInfo.selectedCategory)?.categoryName || ''}
              />
              <input
                className="input my-1 mx-2 input-bordered w-full max-w-sm outline-none"
                readOnly
                value={
                  categories
                    .find((cat) => cat.categoryId === postInfo.selectedCategory)
                    ?.subcategories.find((subCat) => subCat.subCategoryId === postInfo.selectedSubCategory)?.subCategoryName || ''
                }
              />
            </>
          )}

          <CurrencyInput
            readOnly={!isEditing}
            value={postInfo.price}
            placeholder={currencyFormat.format('')}
            className={`input my-1 mx-2 input-bordered w-full max-w-sm ${!isEditing ? 'outline-none' : ''}`}
            onValueChange={(value) => setPostInfo({ ...postInfo, price: value })}
            intlConfig={{ locale: "en-US", currency: 'USD' }}
            allowDecimals
            allowNegativeValue={false}
          />

          <textarea
            maxLength={250}
            readOnly={!isEditing}
            className={`textarea textarea-lg my-1 mx-2 input-bordered w-full max-w-sm ${!isEditing ? 'outline-none' : ''}`}
            placeholder="Details"
            value={postInfo.context}
            onChange={(e) => setPostInfo({ ...postInfo, context: e.target.value })}
          />

          {isEditing ? (
            <div className="flex join mt-2 w-full max-w-sm">
              <button type="submit" className="btn bg-base-100 btn-outline w-1/3 join-item border-gray-700">Save</button>
              <button onClick={(e)=>handleCancelEdit(e)} className="btn bg-base-100 btn-outline w-1/3 join-item border-gray-700">Cancel</button>
              <button onClick={(e)=>handleDeletePost(e)} className="btn bg-base-100 btn-outline w-1/3 join-item border-gray-700">Delete</button>
            </div>
          ) : (
            <div className="flex join w-full mt-2 max-w-sm">
              <button onClick={(e) => handleEditClick(e)} className="btn bg-base-100 btn-outline w-1/2 join-item border-1 border-gray-700">Edit</button>
              <button onClick={(e)=>handleDeletePost(e)} className="btn bg-base-100 btn-outline w-1/2 join-item border-gray-700">Delete</button>
            </div>
          )}
        </div>
      </form>
    </article>
  );
}
