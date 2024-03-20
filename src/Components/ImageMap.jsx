export default function ImageMap({images}){
   return (
    images.map((image, index) => {
        return(
    <div key={index} className='carousel-item w-full'>
        <img src={image} alt="image" className="rounded-xl w-full" />
        </div>
        )
   })
)}