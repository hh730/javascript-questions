function SDK(){
    const queue=[];
    let count=1;
    function logEvent(event){
      queue.push(event);
    }
    function wait(){
      return new Promise((resolve,reject)=>
      {
       setTimeout(()=>{
           if(count%5===0){
               reject();
           }else{
               resolve();
           }
       },1000)
      })
    }
    async function sendAnalytics(){
      if(queue.length===0){
        return;
      }
      const current=queue.shift();
      try{
        await wait();
        console.log('Analaytic event send',current);
        count++;
      }catch(e){
        console.log("-----------------------");
        console.log("Failed to send " + current);
        console.log("Retrying sending " + current);
        console.log("-----------------------");
        count = 1;
        queue.unshift(current);
      }
      finally{
        sendAnalytics();
      }
    }
    function send(){
     sendAnalytics() 
    }Sa
    return {logEvent,send}
  }
  const sdk=SDK();

  sdk.logEvent("event 1");
    sdk.logEvent("event 2");
    sdk.logEvent("event 3");
    sdk.logEvent("event 4");
    sdk.logEvent("event 5");
    sdk.logEvent("event 6");
    sdk.logEvent("event 7");
    sdk.logEvent("event 8");
    sdk.logEvent("event 9");
    sdk.logEvent("event 10");
    sdk.logEvent("event 11");
    sdk.logEvent("event 12");
    sdk.logEvent("event 13");
    sdk.logEvent("event 14");
    sdk.logEvent("event 15");
    sdk.logEvent("event 16");
    sdk.logEvent("event 17");
    sdk.logEvent("event 18");
    sdk.logEvent("event 19");
    sdk.logEvent("event 20");

    sdk.send();