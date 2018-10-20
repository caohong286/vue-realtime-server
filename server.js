const app = require('express')();
const http =require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;
http.listen(PORT, () =>console.log(`Listening on port: ${PORT}`));

// io.on('connection', socket => { console.log('A user connected.');
// });

// io.on('connection', socket => {
// 	console.log('A user connected.');
// 	socket.on('chatMessage', message => {
// 		console.log(message);
// 	})
// });

const messages = [];
const emitMessages = () => io.emit('chatMessage', messages);

// const votes = [{value:0, name:'直接访问'},
//               {value:0, name:'邮件营销'},
//               {value:0, name:'联盟广告'},
//               {value:0, name:'视频广告'},
//               {value:0, name:'搜索引擎'}];

// const emitPollMessage = () => io.emit('pollMessage', {vote:{}});

io.on('connection', socket => {
	console.log('A user connected.'+socket.id);
	emitMessages(messages);

	socket.on('chatMessage', message => {
		// console.log(message);
		messages.push(message);
		emitMessages(messages);
	});

	socket.on('pollMessage', msg => {
		console.log("msg :"+JSON.stringify(msg));
		io.emit('pollMessage', msg);
	});


	socket.on('disconnect', function(msg){
		console.log('A user disconnect.'+socket.id , msg)
	});
});
