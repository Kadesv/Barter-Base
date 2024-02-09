import Forum from "./Forum.model.js";
import User from "./User.model.js";
import Comment from "./Comment.model.js";
import SubComment from "./SubComment.model.js";

User.hasMany(Forum, { foreignKey: 'userId' });
Forum.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SubComment, { foreignKey: 'userId'});
SubComment.belongsTo(User, { foreignKey: 'userId'});

Forum.hasMany(Comment, { foreignKey: 'forumId'});
Comment.belongsTo(Forum, { foreignKey: 'forumId'});

Comment.hasMany(SubComment, { foreignKey: 'commentId'});
SubComment.belongsTo(Comment, { foreignKey: 'commentId'});

export { Comment, User, SubComment, Forum };