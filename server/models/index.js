import Post from "./Post.model.js";
import User from "./User.model.js";
import Message from "./Message.model.js";
import SubCategory from "./SubCategory.model.js";
import Chat from "./Chat.model.js";
import Category from "./Category.model.js";

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

Chat.hasMany(Message, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'chatid' });

SubCategory.hasMany(Post, { foreignKey: 'subCategoryId' });
Post.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });

Category.hasMany(SubCategory, { foreignKey: 'categoryId' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });

export { Chat, User, SubCategory, Post, Message, Category };