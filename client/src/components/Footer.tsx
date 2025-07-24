import React from 'react'

const Footer = () => {
  return (
  <div className="">
    <h1>Need Help?</h1>
    <p>Contact Support</p>
    <span>
        privacy policy 
        </span>
        <span>
            Terms of Service
        </span>
    <p>©{new Date().getFullYear()} HealthBridge. All rights reserved.</p>
  </div>
  )
}

export default Footer