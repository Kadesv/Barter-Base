import Post from "./Post.model.js";
import User from "./User.model.js";
import Comment from "./Comment.model.js";
import SubComment from "./SubCategory.model.js";

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SubComment, { foreignKey: 'userId'});
SubComment.belongsTo(User, { foreignKey: 'userId'});

Post.hasMany(Comment, { foreignKey: 'postId'});
Comment.belongsTo(Post, { foreignKey: 'postId'});

Comment.hasMany(SubComment, { foreignKey: 'commentId'});
SubComment.belongsTo(Comment, { foreignKey: 'commentId'});

export { Comment, User, SubComment, Forum };