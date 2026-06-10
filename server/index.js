import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"

const users=[
    {id:"1",name:"Ali",age:20,isMarried:true},
    {id:"2",name:"Ahmed",age:29,isMarried:false},
    {id:"3",name:"Ikram",age:22,isMarried:true},
    {id:"4",name:"Aqib",age:23,isMarried:false},
]

const typeDefs = `
    type Query {
       getUsers: [User]
       getUserById(id:ID!):User
    }

    type Mutation {
       createUser(name:String!,age:Int!,isMarried:Boolean!):User
       updateUser(id:ID!,name:String,age:Int,isMarried:Boolean):User
       deleteUser(id:ID!):User
    }

    type User {
       id:ID
       name:String
       age:Int
       isMarried:Boolean
    }
`;
const resolvers = {
    Query:{
        getUsers:()=>{
            return users;
        },

        getUserById:(parent,args)=>{
            const id=args.id;
            return users.find((user)=>user.id === id);
        }
    },

    Mutation:{
        createUser:(parent,args)=>{
            const {name,age,isMarried}=args;
            const newUser={
                id:(users.length + 1).toString(),
                name,
                age,
                isMarried
            };
            users.push(newUser);
            return newUser;
        },

        updateUser:(parent,args)=>{
            const {id,name,age,isMarried}=args;
            const user=users.find((u)=>u.id === id);
            if (!user) return null;
            if (name !== undefined) user.name = name;
            if (age !== undefined) user.age = age;
            if (isMarried !== undefined) user.isMarried = isMarried;
            return user;
        },

        deleteUser:(parent,args)=>{
            const index=users.findIndex((u)=>u.id === args.id);
            if (index === -1) return null;
            const [deletedUser]=users.splice(index,1);
            return deletedUser;
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Server running on port :${url}`)