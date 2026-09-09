import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-landing">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">FIND CLOTHES<br/>THAT MATCHES<br/>YOUR STYLE</h1>
          <p className="hero-sub">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>

          <div style={{marginTop: 28}}>
            <Link href="/all-products" className="btn-primary">Shop Now</Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">International Brands</div>
            </div>
            <div className="stat">
              <div className="stat-number">2,000+</div>
              <div className="stat-label">High-Quality Products</div>
            </div>
            <div className="stat">
              <div className="stat-number">30,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-placeholder"><img width={420} height={420} src="/assets/Hero.png" alt="Hero Image" /></div>
        </div>
      </div>
    </section>
  )
}
