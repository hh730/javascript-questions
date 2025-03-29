Problem statement
Implement the pub-sub pattern in JavaScript that has following methods: subscribe, subscribeOnce, and subscribeOnceAsync .
• subscribe(name, callback): Will take the name of the event and assign a callback to it. This callback will be invoked when the event is published. It returns a remove method to unsubscribe the event.
• subscribeOnce(name, callback): Will take the name of the event and assign a callback to it. This event will be published only once.
• subscribeOnceAsync(name): Will take the name of the event and returns a promise that is settled or fullfilled when the event is published.
• publish(name, data): Publish a single event and pass the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.
• publishAll(name): Publishes all events and passes the data to the callback of each events. If the event is subscribed only once, it should not invoke twice.
