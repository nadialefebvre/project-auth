import React, { useEffect, useRef } from "react"
import lottie from "lottie-web"

import animationData from "../lotties/loader-animation"

const Loader = () => {
  const anime = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    })
    return () => lottie.stop()
  }, [])

  return <div style={{ height: 200, width: 200 }} ref={anime}></div>
}

export default Loader