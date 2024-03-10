import { Category, User, SubCategory, Post, Message, Chat, Notification, Favorites } from '../models/index.js';
import { db } from '../config/db.js';
import postData from './data/posts.json' assert { type: 'json' };
console.log('Syncing database...');
await db.sync({ force: true });
console.log('Seeding database...');

const allCategories = [
    {
        categoryName: 'Apperal',
        subcategories: ['Services', 'Children', 'Men', 'Women', 'Baby']
    },
    {
        categoryName: 'Automotive',
        subcategories: ['Services', 'Parts', 'Equiptment', 'Rentals']
    },
    {
        categoryName: 'Home',
        subcategories: ['Services', 'Furniture', 'Outdoors', 'Equiptment', 'Appliances']
    },
    {
        categoryName: 'Entertainment',
        subcategories: ['Services', 'Books', 'Electronics', 'Equiptment', 'Instruments', 'Events']
    },
    {
        categoryName: 'Sports',
        subcategories: ['Water', 'Biking', 'Running', 'Winter', 'General']
    },
    {
        categoryName: 'Outdoors',
        subcategories: ['Services', 'Resources', 'Equiptment']
    },
    {
        categoryName: 'Animals',
        subcategories: ['Services', 'LiveStock', 'Exotic', 'Pets']
    },
];
const categoriesInDB = await Promise.all(allCategories.map(async category => {
    const newCategory = await Category.create({
        categoryName: category.categoryName
    });
    // console.log(newCategory)
    const subcategoriesInDB = await Promise.all(category.subcategories.map(async subCategory => {
        const newSubCategory = await SubCategory.create({
            subCategoryName: subCategory,
            categoryId: newCategory.categoryId
        });

        return subCategory
    }))
    return category;
}));

const usersToCreate = [];
for (let i = 1; i <= 10; i++) {
    const firstName = `FirstName${i}`;
    const lastName = `LastName${i}`;
    const preferredName = `PName${i}`;
    const email = `user${i}@test.com`;
    usersToCreate.push(User.create({ preferredName: preferredName, firstName: firstName, lastName: lastName, email: email, password: 'test' }));
}

const usersInDB = await Promise.all(usersToCreate);
// console.log(usersInDB);

const postsInDB = await Promise.all(
    postData.map((post) => {
        const { title, context,  } = post;
        const newPost = Post.create({
            title: 'title',
            context: 'context',
            subCategoryId: 1,
            userId: 1,
            price: 1
        });

        return newPost;
    }),
);
// console.log(postsInDB);

const chatData = [
    { user1Id: 1, user2Id: 2 },
    { user1Id: 3, user2Id: 4 }
];

const chatsInDB = await Promise.all(
    chatData.map((chat) => {
        const { user1Id, user2Id } = chat;
        const newChat = Chat.create({
            user1Id: user1Id,
            user2Id: user2Id
        });

        return newChat;
    })
);
// console.log(chatsInDB);


const messageData = [
    { messageText: 'text', userId: 2 , chatId:1},
    { messageText: 'text', userId: 4, chatId:2}
];

const messagesinDB = await Promise.all(
    messageData.map(async(message) => {
        const { messageText, userId, chatId } = message;
        const chatRoom = await Chat.findByPk(chatId);
        // console.log(chatRoom)
        const newMessage = await Message.create({
            messageText: messageText,
            userId: userId,
            chatId: chatId
        });
        const toUserId = userId === chatRoom.user1Id ? chatRoom.user2Id : chatRoom.user1Id;
        // console.log(toUserId);
        const newNot = await Notification.create({
            userId: toUserId,
            messageId: newMessage.messageId,
            seenStatus: false
        })
        // console.log(newNot);
        return {newMessage, newNot};
    })
);
// console.log(messagesinDB);
const favoriteData = [
    { userId: 1, postId:1},
    { userId: 1, postId:2},
];
const favoritesInDB = await Promise.all(
    favoriteData.map(async(favorite) =>{
        const {userId, postId} = favorite;
        const newFavorite = await Favorites.create({
            userId: userId,
            postId: postId
        })
return newFavorite;
    })
)
// console.log(favoritesInDB)

await db.close();
console.log('Finished seeding database!');