function Events() {
  this.subscriptionList = new Map();
  this.subscribeOnceList = new Map();
  this.subscribeOnceAsyncList = new Map();

  this.subscribe = function (name, callback) {
    if (!this.subscriptionList.has(name)) {
      this.subscriptionList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.subscriptionList.get(name);
      this.subscriptionList.set(name, [...exisitngCallbacks, callback]);
    }

    return {
      remove: () => {
        const exisitngCallbacks = this.subscriptionList.get(name);
        const filtered = exisitngCallbacks.filter((e) => e !== callback);
        this.subscriptionList.set(name, filtered);
      },
    };
  };

  this.subscribeOnce = function (name, callback) {
    if (!this.subscribeOnceList.has(name)) {
      this.subscribeOnceList.set(name, [callback]);
    } else {
      const exisitngCallbacks = this.subscribeOnceList.get(name);
      this.subscribeOnceList.set(name, [...exisitngCallbacks, callback]);
    }
  };

  this.subscribeOnceAsync = async function (name) {
    return new Promise((resolve, reject) => {
      if (!this.subscribeOnceAsyncList.has(name)) {
        this.subscribeOnceAsyncList.set(name, [resolve]);
      } else {
        const exisitngCallbacks = this.subscribeOnceAsyncList.get(name);
        this.subscribeOnceAsyncList.set(name, [...exisitngCallbacks, resolve]);
      }
    });
  };

  this.publish = function (name, data) {
    const callbacks = this.subscriptionList.get(name) || [];
    callbacks.forEach((e) => {
      e(data);
    });

    const subscribeOnceCallbacks = this.subscribeOnceList.get(name) || [];
    subscribeOnceCallbacks.forEach((e) => {
      e(data);
    });

    this.subscribeOnceList.set(name, []);

    const subscribeOnceAsyncCallbacks =
      this.subscribeOnceAsyncList.get(name) || [];
    subscribeOnceAsyncCallbacks.forEach((e) => {
      e(data);
    });

    this.subscribeOnceAsyncList.set(name, []);
  };

  this.publishAll = function (data) {
    const entries = this.subscriptionList.entries();
    for (let [key, value] of entries) {
      value.forEach((e) => {
        e(data);
      });
    }
  };
}
