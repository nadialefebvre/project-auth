import React from "react"
import { useSelector } from "react-redux"
// import Lottie from "react-lottie"

// import animationData from "../lotties/loader-animation"

const Loader = () => {
  const isLoading = useSelector((store) => store.loading.isLoading)

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // }

  return (
    isLoading && (
      <>
      <p>loading</p>
        {/* <Lottie
          options={defaultOptions}
          height={400}
          width={400} /> */}
      </>
    )
  )
}

export default Loader
