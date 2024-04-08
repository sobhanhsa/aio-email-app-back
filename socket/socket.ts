import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});
const userSocketMap : any = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId:string) => {
	return userSocketMap[receiverId];
};


io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId : string | undefined = socket.handshake.query.userId as string;

	userId || socket.disconnect();

	console.log("user id : ",userId);

	if (userId != "undefined") userSocketMap[userId] = socket.id;

	socket.on("new-message",(sender:string,message:string,to:string) => {
		
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
	});
});

export { app, io, server };