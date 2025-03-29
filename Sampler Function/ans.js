function sampler(fn, count) {
  let counter = 0;

  return function (...args) {
    // set the counters
    let lastArgs = args;
    context = this;

    // invoke only when number of calls is equal to the counts
    if (++counter !== count) return;

    fn.apply(context, args);
    counter = 0;
  };
}
