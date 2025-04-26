const wait = (delay) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

const retryWithDelay = (
  operation,
  retries = 3,
  delay = 50,
  finalErr = "Retry failed"
) =>
  new Promise((resolve, reject) => {
    operation()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        if (retries > 0) {
          return wait(delay)
            .then(retryWithDelay.bind(operation, retries - 1, delay, finalErr))
            .then(resolve)
            .catch(reject);
        }
        return reject(finalErr);
      });
  });

const retryWithDelayAsync = async (
  operation,
  retries = 3,
  delay = 50,
  finalErr = "Retry failed"
) => {
  try {
    await operation();
  } catch {
    if (retries <= 0) {
      return Promise.reject(finalErr);
    }
    await wait(delay);
    return retryWithDelayAsync(operation, retries - 1, delay, finalErr);
  }
};

// Input:
// Test function
const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

// Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 3);
  console.log("will fail before getting here");
};

// Print the result
test().catch(console.error);

Output: "success"; // 1st test
("Retry failed"); //2nd test
