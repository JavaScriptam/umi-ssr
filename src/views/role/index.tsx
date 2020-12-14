import { connect, IGetInitialProps,useStore } from 'umi';
import React ,{useState} from 'react';
import {getList} from '@/api/list'
import Test1 from './comp'
const Role = ()=>  {
  const store = useStore()
  const {test} = store.getState()
  const [title,setTitle] = useState(1)
  function changeTitle(){
    setTitle(title+1)
  }
  async function getData(){
    await getList({page:1,limit:10})
    store.dispatch({ type: 'test/test',payload:[{name:'55555'}]});
  }
  return (
    <div style={{ padding: 20 }} >
      {test.items.map((item:any)=> item.name)}
      <button onClick={getData}>获取数据</button>
      <p>{test.title}</p>
      <div>
        子组件：
        <Test1 title={title} changeTitle={changeTitle}/>
        <button onClick={changeTitle}>设置</button>
      </div>
    </div>
  );
}
//服务端渲染逻辑
Role.getInitialProps = (async ({isServer,store}) => {
    try {
      const data = await getList({page:1,limit:10},!!isServer)
      await store.dispatch({ type: 'test/test',payload:data.data.items });
      return {test:store.getState().test}
    } catch (error) {
      return {test:{items:[]}}
    }
}) as IGetInitialProps

export default connect((state:any)=>{
  return {
    items:state.test.items,
  }
})(Role)