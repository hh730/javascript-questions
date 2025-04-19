const helperMatcher = function (actual, matcherFxn, isNot = false) {
  return function (expected) {
    matcherFxn(expected, actual, { isNot });
  };
};

const matchers = {
  toBe: function (expected, actual, matcherProperties) {
    const { isNot } = matcherProperties;

    if (isNot) {
      if (expected === actual) {
        throw error("Should not match");
        return;
      }
    } else {
      if (expected !== actual) {
        throw error("Should match");
      }
    }
  },
  toBeUndefined: function (expected, actual, matcherProperties) {
    const { isNot } = matcherProperties;

    if (isNot) {
      if (actual === undefined) {
        throw error("Should not match");
        return;
      }
    } else {
      if (actual !== undefined) {
        throw error("Should match");
      }
    }
  },
};

const expect = function (actual) {
  const expectations = {
    not: {},
  };

  for (let key in matchers) {
    const matcherFxn = matchers[key];
    expectations[key] = helperMatcher(actual, matcherFxn, false);
    expectations.not[key] = helperMatcher(actual, matcherFxn, true);
  }
  return expectations;
};

const test = async function (title, callbackFxn) {
  try {
    await callbackFxn();
    console.log(`Pass ${title}`);
  } catch (error) {
    console.error(`Fail ${title}`);
    console.error(error);
  }
};

test("To be undefined", () => {
  expect(undefined).toBeUndefined();
});
// "Pass To be undefined"

test("To not be undefined", () => {
  expect(undefined).not.toBeUndefined();
});
// "Fail To not be undefined"

test("To not be undefined", () => {
  expect(1).not.toBeUndefined();
});
// "Pass To not be undefined"

test("Learnersbucket is the best platform", () => {
  expect("system-design").toBe("system-design");
  expect("system-design").not.toBe("machine-coding");
});
// "Pass Learnersbucket is the best platform"

test("Learnersbucket is the best platform", () => {
  expect("system-design").not.toBe("system-design");
});
// "Fail Learnersbucket is the best platform"
