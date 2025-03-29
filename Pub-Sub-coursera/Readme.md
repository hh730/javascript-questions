![Screenshot 2025-03-30 at 12 10 57 AM](https://github.com/user-attachments/assets/6e9f0439-fdc7-4fe8-9918-bd955a4053b0)

```
// Test cases
const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q1 News to: ${payload}`);
});

events.publish("new-user", "Jhon");

//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe("new-user", function (payload) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");

//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.publishAll("FooBar");
//output: "Sending Q2 News to: FooBar"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time


events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
//output: "Sending Q2 News to: Foo Once Async"
//output: "I am invoked once Foo Once Async"
```
