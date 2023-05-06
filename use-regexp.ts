export const  useRegExp = () =>{

  const isRegExp = (v:any) => {
    return Object.prototype.toString.call(v) === '[object RegExp]';
  }

  const REMap = new Map([
    ['email',/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  ])
  
  const RETest = (REName:RegExp | string,REValue:any)=>{
    if(typeof(REName) !== 'string' && isRegExp(REName)){
      return REName.test(REValue)
    }

    const RE = REMap.get(REName as string)
    if(!RE){
      throw(new Error('方法内没有该正则表达式'))
    }
    return RE.test(REValue)
  }
  return {
    RETest
  };
}