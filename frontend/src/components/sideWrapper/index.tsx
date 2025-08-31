import { Component } from 'react'

// HOC components 

const sideWrapper = (WrappedComp) => {
  return Wrapper() {

     return <WrappedComp />
  }
}

export default sideWrapper