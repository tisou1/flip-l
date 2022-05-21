import React, { useRef, useState, useLayoutEffect } from 'react'
import { produce } from 'immer'

import './Flip.scss'
interface Rect {
  left: number,
  top: number
}
interface Item {
  name: string
  id: string
}

export default function Flip() {
  const [list, setList] = useState<Item[]>([])
  const [status, setStatus] = useState(1)
  const prePosition = useRef<Rect[]>()
  const curPosition = useRef<Rect[]>()
  const domListRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLElement[]>([])
  //style
  const _style = useRef<Rect[]>()


  function getRects(doms: HTMLElement[]) {
    return doms.map((dom, index) => {
      let rect = dom.getBoundingClientRect()
      let { top, left } = rect
      return { left, top }
    })
  }

  useLayoutEffect(() => {
    if (status === 1) {
      //last
      curPosition.current = getRects(itemsRef.current)
      // console.log("last:",curPosition.current)

      _style.current = curPosition.current.map((val, idx) => {
        let left = prePosition.current![idx].left - val.left
        let top = prePosition.current![idx].top - val.top
        return { left, top }
      })
      _style.current.unshift({
        left: 0,
        top: 0
      })
      console.log(_style.current);

      setStatus(2)
    } else if(status === 2) {
      //play 重置
      _style.current = curPosition.current!.map((val, idx) => ({left:0, top:0}))
      _style.current.push({left:0,top:0})

      console.log(_style.current);

      //挺关键的.
      setTimeout(() => {
        setStatus(3)
      },0)
    }
  })

  const handleClick = () => {
    //first 
    itemsRef.current = Array.from(domListRef.current!.children) as any as HTMLElement[]
    prePosition.current = getRects(itemsRef.current)
    // console.log("first:",prePosition.current);

    setList(
      produce(draft => {
        draft.unshift({
          name: 'new item' + Math.random().toFixed(3),
          id: crypto.randomUUID()
        })
      })
    )

    setStatus(1)
  }

  return (
    <div className='flip'>
      <div className='flilp-list min-h-100px flex flex-wrap gap-2 w-900px' ref={domListRef}>
        {
          list.map((item, index) => (
            <div key={item.id} className={`card-item w-150px h-100px bg-gray-400 rounded ${status === 3 ? 'active' : ''}`}  style={
              { transform: `translate(${_style.current![index]?.left}px, ${_style.current![index]?.top}px)` }
            }>{item.name}</div>
          ))
        }
      </div>

      <div className='mt-6'>
        <button onClick={handleClick}>添加</button>
      </div>
    </div>
  )
}
