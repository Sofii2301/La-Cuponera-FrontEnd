self.addEventListener('notificationclick', function(event) {

    if (!event.action) {

        event.notification.close();
        var link = event.notification.data.link;
        event.waitUntil(
            clients.openWindow(link)
        );

    } else {

        let actions = event.notification.data.actions;
        if(actions.length > 0){
            for (var i = 0; i < actions.length; i++) {
                if (event.action == actions[i].action){
                    event.notification.close();
                    event.waitUntil(
                        clients.openWindow(actions[i].link)
                    );
                    break;
                }
            }
        }

    }
});

self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const sendNotification = function(info)  {

        let options = {
            body: info.body,
            icon: info.icon,
            requireInteraction: true,
            data: {
                link: info.link,
                actions: []
            }
        };

        if(info.image && info.image != ""){
            options.image = info.image;
        }

        if(info.actions && info.actions.length > 0){
            options.actions = [];

            for (var i = 0; i < info.actions.length; i++) {
                options.actions.push({
                    action: info.actions[i].action,
                    title: info.actions[i].title,
                    icon: info.actions[i].icon
                });
                options.data.actions.push({
                    action: info.actions[i].action,
                    link: info.actions[i].link
                });
            }
        }

        console.log(info.title);
        console.log(options);

        return self.registration.showNotification( info.title, options);
    };

    if (event.data) {
        const message = event.data.json();
        event.waitUntil(sendNotification(message));
    }
});
