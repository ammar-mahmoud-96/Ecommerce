import Head from 'next/head'
import Hero from '../components/Hero'
import BrandStrip from '../components/BrandStrip'
import NewArrivals from '../components/NewArrivals'
import TopSelling from '../components/TopSelling'
import StyleGrid from '../components/StyleGrid'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

export default function Home() {
    
  return (
    <div>
      <Head>
        <title>Shop — Home</title>
      </Head>
      <main>
        <Hero />
        <BrandStrip />
        <section style={{padding: '40px 20px'}}>
          <h2 style={{textAlign: 'center', marginBottom: 8}}>NEW ARRIVALS</h2>
          <NewArrivals />
        </section>

        <section style={{padding: '40px 20px', background: '#fafafa'}}>
          <h2 style={{textAlign: 'center', marginBottom: 8}}>TOP SELLING</h2>
          <TopSelling />
        </section>

        <section style={{padding: '40px 20px'}}>
          <StyleGrid />
        </section>

        <section style={{padding: '40px 20px'}}>
          <h2 style={{textAlign: 'center', marginBottom: 8}}>Our Happy Customers</h2>

          <Testimonials />
        </section>

        <Newsletter />
      </main>
    </div>
  )
}
