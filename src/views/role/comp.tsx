import React,{useImperativeHandle,forwardRef} from 'react'
export default forwardRef(
  (props:any,ref)=> {
    //暴露子组件的方法给父组件 方便父组件调用
    useImperativeHandle(ref,
      ()=>{
        return {
          deleteTitle
        }
      }  
    )
    function deleteTitle(){
      console.log('父组件调用子组件')
    }
    const {title,changeTitle} = props
    return (
      <div>{title}
      <button onClick={changeTitle}>changeTitle</button>
      </div>
    )
  }
)
