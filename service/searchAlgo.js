
let conn={
    binarySearch : async(number,arr)=>{
        let start=0;
        let index=-1;
        let temp=arr.length-1;
        for(let i=0;start<=temp;i++){
            let pivot=Math.floor((start+temp)/2);
            if(await conn.testResult1(number,arr[pivot])){
                if(await conn.testResult2(number,arr[pivot])){
                    index=pivot;
                    break;
                }
                temp=pivot-1;
            }else{
                start=pivot+1;
            }
        }
        return index;
    },
    testResult1 : async(number,ele)=>{
        let result=false;
        if(number<=ele){
            result=true;
        }
        return result;
    },
    testResult2 : async(number,ele)=>{
        let result=false;
        if(ele === number){
            result=true;
        }
        return result;
    }
}

module.exports=conn;