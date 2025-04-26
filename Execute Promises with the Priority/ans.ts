function resolvePromisesWithPriority(promises) {
  // sort the promises based on priority
  promises.sort((a, b) => a.priority - b.priority);

  let rejected = {};
  let result = {};
  let mostPriorityIndex = 0;
  let taskCompleted = 0;

  return new Promise((resolve, reject) => {
    promises.forEach(({ task, priority }, i) => {
      task()
        .then((data) => {
          result[i] = data;
        })
        .catch((error) => {
          // if the promise is rejected
          // track the rejected promises just for reference
          rejected[i] = true;
          // if the rejected promise is the least priority one
          // move to the next least priority
          if (i === mostPriorityIndex) {
            mostPriorityIndex++;
          }
        })
        .finally(() => {
          if (!rejected[mostPriorityIndex] && result[mostPriorityIndex]) {
            resolve(promises[mostPriorityIndex].priority);
          } else if (rejected[mostPriorityIndex]) {
            mostPriorityIndex++;
          }
          taskCompleted++;
          if (taskCompleted === promises.length) {
            reject("All APIs failed");
          }
        });
    });
  });
}

// Input:
// create a promise that rejects or resolves
// randomly after some time
function createAsyncTask(val) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (val > 5) {
          reject(val);
        } else {
          resolve(val);
        }
      }, val * 1000);
    });
  };
}

const promises = [
  { task: createAsyncTask(6), priority: 1 },
  { task: createAsyncTask(3), priority: 4 },
  { task: createAsyncTask(3), priority: 3 },
  { task: createAsyncTask(5), priority: 2 },
];

resolvePromisesWithPriority(promises).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);

// Output:
/*
// resolve promise as per their priority
2
*/
