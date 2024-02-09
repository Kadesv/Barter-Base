import { Comment, User, SubComment, Forum } from '../models/index.js';
import { db } from '../config/db.js';
import forumData from './data/forums.json' assert { type: 'json' };

console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding database...');


const usersToCreate = [];
for (let i = 1; i <= 10; i++) {
    const username = `username${i}`;
    const email = `user${i}@test.com`;
    usersToCreate.push(User.create({ username: username, email: email, password: 'test' }));
}

const usersInDB = await Promise.all(usersToCreate);


const forumsInDB = await Promise.all(
    forumData.map((forum) => {
        const { title, context } = forum;

        const newForum = Forum.create({
            title: title,
            context: context,
            userId: 1
        });

        return newForum;
    }),
);



const commentInDB = await Promise.all(
    forumData.map((comment) => {
        const {commentText, userId} = comment;
        const text = commentText ? commentText : 'text';
        const newComment = Comment.create({
            commentText: text,
            userId: 1,
            forumId: 1
            
        });
        return newComment;
    }),
);


const subCommentInDB = await Promise.all(
    forumData.map((subComment) => {
    const {subCommentText, userId} = subComment;
    const text = subCommentText ? subCommentText : 'text';
        const newSubComment = SubComment.create({
            subCommentText: text,
            userId: 1,
            commentId: 1

        });
        return newSubComment;
    }),
);



await db.close();
console.log('Finished seeding database!');