import React, { Component } from 'react'
import useProgram from '@/hooks'

// HOC components 

const sideWrapper = (WrappedComp) => {
  return function Wrapper() {
  

     return <WrappedComp />
  }
}

export default sideWrapper