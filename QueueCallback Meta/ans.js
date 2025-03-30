const QueueCallbacks = function(order = 'FIFO'){
    this.order = order;
    this.callbacksQueue = [];
    this.ongoingExecution = 0;
    this.process = (callback) => {
      // if there less than 2 callbacks are being executed, execute the callback immediately
      // once the callback execution has begun, update the ongoing execution count
      // similar once the execution is done, update the onging execution count and trigger executing the next callbacks
      if(this.ongoingExecution < 2){
        this.ongoingExecution++;
        callback.then((i) => {
          console.log(i);
        }).finally(() => {
          this.ongoingExecution--;
          executeNext();
        });
      }
      // if more than 2 callbacks are being executed, store them into the queue
      // store no more than 6 items into the queue
      else{
        if(this.callbacksQueue.length < 6){
        this.callbacksQueue.push(callback);
      }
     }
    }
    const executeNext = () => {
      // if there are items in the callbacks queue and there is room for execution
      if(this.callbacksQueue.length > 0 && this.ongoingExecution < 2){
        // get the next callback depending upon the order
        let nextCallback = this.order === 'LIFO' ? this.callbacksQueue.pop() : this.callbacksQueue.shift();
        
        // process the next callback
        this.process(nextCallback);
      }  
    };
  }

let dummyApi = (index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(index);
      }, index * 1000);
    })
  };

Input:
const asyncCallbacks = new QueueCallbacks('LIFO');
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));

Output:
1 // this will execute first
2 // this will execute second
7 // this will execute after 5 seconds
6 // then this
5 // then this
4 // then this
6 // then this
8 // then this