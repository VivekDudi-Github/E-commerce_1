import React from 'react'
import Layout from "../../layout/Layout"
import Hero_Section from "../../hero/Hero_section"
import Catagory from '../../catagory/Catagory'
import HomePageProductCard from '../../ProductCard/Home_productCard'


function Home() {
  return (
    <Layout>
      <Hero_Section/>
      <Catagory/>
      <HomePageProductCard/>
    </Layout>
  )
}

export default Home