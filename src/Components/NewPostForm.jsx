export default function NewPostForm() {
    const createPost = async (req, res) => {
        try {
         const post = await Post.create({
          title: req.body.title,
          description: req.body.description,
          userId: req.body.userId,
           //add the lines below
          imageType: req.file.mimetype,
          imageName: req.file.originalname,
          imageData: req.file.buffer, 
           //add the lines above
         });
          return res.status(201).json({ post });
         } catch (error) {
          return res.status(500).json({ error: error.message });
         }
        };
    return (
        <>
        <form>
            <input placeholder="Title"/>
            <input placeholder="Price"/>
            <input placeholder="Details"/>
        </form>

        </>
    )
}