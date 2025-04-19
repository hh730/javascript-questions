const asyncTask = function (value) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Completing ${value}`);
      }, 100 * value);
    });
  };
};

const asyncSeriesExecuter = async function (promises) {
  for (let promise of promises) {
    try {
      const result = await promise();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};

// recursive way
const asyncSeriesExecuter2 = function (promises) {
  let promise = promises.shift();
  promise().then((data) => {
    console.log(data);
    if (promises.length > 0) {
      asyncSeriesExecuter2(promises);
    }
  });
};

Input: [asyncTask(3), asyncTask(1), asyncTask(2)];
asyncSeriesExecuter(promises);
Output: 3;
1;
2;
