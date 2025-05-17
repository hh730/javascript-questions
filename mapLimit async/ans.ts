// to solve this problem we will have Async.parallel and Async.series
// First Chop the array in subarays of the given limit 
// Parent array will run on series that is next subaray will run after current subarray is done
// All elements of subarray  will run in parallel
// Accumulate all the sub arrays in one array

Array.prototype.chop=function(size){
    const temp=[...this];
    if(!size){
        return temp;
    }
    const output = [];
    let i = 0;
    while(i<temp.length){
        output.push(temp.slice(i, i + size));
        i = i + size;
    }
    return output;
}

const mapLimit=(arr,limit,fn)=>{
    return new Promise((resolve,reject)=>{
        const chopped=arr.chop(limit);
        const final =chopped.reduce((a,b)=>{
            return a.then((val)=>{
                const results = [];
                let tasksCompleted = 0;
                return new Promise((resolve,reject)=>{
                    b.forEach((ele)=>{
                        fn(ele,(error,value)=>{
                            if(error){
                                reject(error);
                            }else{
                                results.push(value);
                                tasksCompleted++;
                                if(tasksCompleted===b.length){
                                    resolve([...val, ...results]);
                                }
                            }
                        })
                    })
                })
            })
        },Promise.resolve([]))
        final.then((val)=>{
            resolve(val)
        }).catch((e)=>{
            reject(e);
        })
    })
}



Input:
let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

Output:
/// first batch
2
4
6
/// second batch
8
10
/// final result
"success: [2, 4, 6, 8, 10]