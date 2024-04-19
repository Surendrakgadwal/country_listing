import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    let error = useRouteError()
    console.log(error)
  return (
    <div>
      Something went wrong...
    </div>
  )
}

export default Error
