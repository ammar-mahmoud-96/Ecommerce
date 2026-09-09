import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-left">
            <div className="footer-logo">SHOP.CO</div>
            <p className="footer-desc">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
            <div className="social-icons">
              <Link href="/about" aria-label="About" className="social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="1.2"/>
                  <path d="M12 8v1" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 11v4" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>

              <Link href="/contact" aria-label="Contact" className="social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8v8a2 2 0 0 1-2 2H5l-4 4V6a2 2 0 0 1 2-2h14" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link href="/all-products" aria-label="Products" className="social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" stroke="#111" strokeWidth="1.2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="#111" strokeWidth="1.2"/>
                </svg>
              </Link>

              <Link href="/cart" aria-label="Cart" className="social">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6h15l-1.5 9h-12z" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="19" r="1" fill="#111"/>
                  <circle cx="18" cy="19" r="1" fill="#111"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <div className="col-title">COMPANY</div>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/all-products">All Products</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="col-title">HELP</div>
              <ul>
                <li><Link href="/contact">Customer Support</Link></li>
                <li><Link href="/about">Terms &amp; Conditions</Link></li>
                <li><Link href="/about">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="copyright">Shop.co © 2000-2026, All Rights Reserved</div>
          <div className="payments">
            <div className="payment-icon">VISA</div>
            <div className="payment-icon">MC</div>
            <div className="payment-icon">PayPal</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
