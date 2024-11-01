import bcrypt from 'bcrypt';
import { Category, User, SubCategory, Post, Message, Chat, Notification, Favorites } from '../models/index.js';
import { db } from '../config/db.js';
import postData from './data/posts.json' assert { type: 'json' };

console.log('Syncing database...');
await db.sync({ force: true });
console.log('Seeding database...');

// Category and SubCategory data
const allCategories = [
    { categoryName: 'Apparel', subcategories: ['Services', 'Children', 'Men', 'Women', 'Baby'] },
    { categoryName: 'Automotive', subcategories: ['Services', 'Parts', 'Equipment', 'Rentals'] },
    { categoryName: 'Home', subcategories: ['Services', 'Furniture', 'Outdoors', 'Equipment', 'Appliances'] },
    { categoryName: 'Entertainment', subcategories: ['Services', 'Books', 'Electronics', 'Equipment', 'Instruments', 'Events'] },
    { categoryName: 'Sports', subcategories: ['Water', 'Biking', 'Running', 'Winter', 'General'] },
    { categoryName: 'Outdoors', subcategories: ['Services', 'Resources', 'Equipment'] },
    { categoryName: 'Animals', subcategories: ['Services', 'Livestock', 'Exotic', 'Pets'] },
];

const categoriesInDB = await Promise.all(
    allCategories.map(async (category) => {
        const newCategory = await Category.create({ categoryName: category.categoryName });
        await Promise.all(
            category.subcategories.map(async (subCategory) => {
                return SubCategory.create({ subCategoryName: subCategory, categoryId: newCategory.categoryId });
            })
        );
        return newCategory;
    })
);
console.log('Categories and SubCategories seeded!');

// Users with Hashed Passwords
const saltRounds = 10;

const usersToCreate = Array.from({ length: 10 }, async (_, i) => {
    const hashedPassword = await bcrypt.hash('test', saltRounds);
    return {
        firstName: `User${i + 1}`,
        lastName: `Last${i + 1}`,
        email: `user${i + 1}@test.com`,
        password: hashedPassword,
    };
});

const usersInDB = await Promise.all(usersToCreate.map(async user => User.create(await user)));
console.log('Users with hashed passwords seeded!');

// Posts
const postsInDB = await Promise.all(
    postData.map(async (post, index) => {
        const { title, context } = post;
        const randomUserId = usersInDB[Math.floor(Math.random() * usersInDB.length)].userId;
        const randomCategory = categoriesInDB[Math.floor(Math.random() * categoriesInDB.length)];
        const subCategories = await SubCategory.findAll({ where: { categoryId: randomCategory.categoryId } });
        const randomSubCategoryId = subCategories[Math.floor(Math.random() * subCategories.length)].subCategoryId;
        const randomPrice = Math.floor(Math.random() * 500) + 1;

        return Post.create({
            title,
            context,
            subCategoryId: randomSubCategoryId,
            categoryId: randomCategory.categoryId,
            userId: randomUserId,
            price: randomPrice,
            image: [`https://picsum.photos/id/${index + 1}/200/300`],
        });
    })
);
console.log('Posts seeded!');

// Chats
const chatData = [
    { user1Id: 1, user2Id: 2, user1Name: 'User1', user2Name: 'User2', user1DelDate: null, user2DelDate: null },
    { user1Id: 3, user2Id: 1, user1Name: 'User3', user2Name: 'User1', user1DelDate: new Date(), user2DelDate: null },
    { user1Id: 1, user2Id: 5, user1Name: 'User1', user2Name: 'User5', user1DelDate: null, user2DelDate: new Date() },
    { user1Id: 6, user2Id: 1, user1Name: 'User6', user2Name: 'User1', user1DelDate: null, user2DelDate: null },
];

const chatsInDB = await Promise.all(
    chatData.map((chat) => Chat.create(chat))
);
console.log('Chats seeded!');

// Messages and Notifications
const messagesData = Array.from({ length: 10 }, (_, i) => ({
    messageText: `Message text ${i + 1}`,
    userId: i % 2 === 0 ? 1 : 2,
    chatId: i % chatData.length + 1,
}));

const messagesInDB = await Promise.all(
    messagesData.map(async (message) => {
        const newMessage = await Message.create(message);
        const chatRoom = await Chat.findByPk(message.chatId);
        const toUserId = message.userId === chatRoom.user1Id ? chatRoom.user2Id : chatRoom.user1Id;

        const notification = await Notification.create({
            userId: toUserId,
            messageId: newMessage.messageId,
            seenStatus: false,
        });

        return { message: newMessage, notification };
    })
);
console.log('Messages and Notifications seeded!');

// Favorites
const favoriteData = [
    { userId: 1, postId: 1 },
    { userId: 1, postId: 2 },
    { userId: 1, postId: 3 },
    { userId: 2, postId: 1 },
    { userId: 3, postId: 1 },
];
const favoritesInDB = await Favorites.bulkCreate(favoriteData);
console.log('Favorites seeded!');

// Closing database
await db.close();
console.log('Database seeding complete!');
