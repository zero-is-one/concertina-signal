import abcjs from "abcjs"
import { useEffect, useRef } from "react"

export const RenderAbc = ({
  abc,
  params,
}: {
  abc: string
  params?: abcjs.AbcVisualParams
}) => {
  const ele = useRef(null)

  useEffect(() => {
    if (!ele?.current) return

    abcjs.renderAbc(ele.current, abc, params)
  }, [abc, params, ele])

  return <div ref={ele}></div>
}
