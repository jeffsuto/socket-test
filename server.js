require('dotenv').config();
let redis = require('redis')
let redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    // password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,
    // prefix: process.env.APP_ENV
    // prefix: 'api-learning'
});
let io = require('socket.io')(process.env.SOCKET_PORT);

io.set('origins', '*:*');

redisClient.subscribe('events');

redisClient.on('message', (channel, payload) => {

    payload = JSON.parse(payload);

    console.log({
        channel,
        event: payload.event,
        data: payload.data
    });

    let target = 'notification/visitor/1';

    io.to(target).emit(payload.event, payload.data);
    
    // if (payload.event === 'membership' || payload.event === 'askchef' || payload.event === 'inbox') {

    //     let {
    //         notification
    //     } = payload.data

    //     let target = notification / $ {
    //         notification.status
    //     }
    //     /${notification.id_status};

    //     io.to(target).emit(payload.event, notification)

    //     console.log({
    //         target: target,
    //         data: notification
    //     })

    // } else if (payload.event === 'article' || payload.event === 'learning' || payload.event === 'recipe' || payload.event === 'event') {

    //     let {
    //         data,
    //         members,
    //         visitors
    //     } = payload.data

    //     io.to('premium').emit(payload.event, data)

    //     // members.forEach(user_id => {

    //     // let target = notification/member/${user_id}

    //     // io.to(target).emit(payload.event, data)

    //     // console.log(target)

    //     // })

    //     // visitors.forEach(user_id => {

    //     // let target = notification/visitor/${user_id}

    //     // io.to(target).emit(payload.event, data)

    //     // console.log(target)

    //     // })

    // }

});

io.on('connection', socket => {

    console.log(`connected ${socket.id}`)
    socket.emit('connected')

    socket.on('join-room', user => {

        if (user == null || user == undefined) {
            socket.emit('failed to connect')
        } else {
            if (typeof user === 'string') {
                user = JSON.parse(user)
            }
            let type = ''
            if (user.membership || user.membership_id) {
                type = 'member'
            } else {
                type = 'visitor'
            }
            socket.join(`notification/${type}/${user.id}`)

            if (user.status === 'active' || user.status === 'active - waiting' || user.status === 'paid' || user.status === 'paid - waiting') {
                socket.join('premium');
            }

            console.log(`Socket ${socket.id} (${user.id} - ${user.name}) join rooms of notification/${type}/${user.id} `)
        }

    });

    socket.on('disconnect', function () {
        socket.leave('premium');
        console.log(`disconnected ${socket.id}`);
    });

});