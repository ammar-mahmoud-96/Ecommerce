import { useSelector } from 'react-redux'
import { RootState } from '../store'
import CartItem from '../components/CartItem'
import Link from 'next/link'

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items)

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const discount = Math.round(subtotal * 0.2)
  const delivery = 15
  const total = subtotal - discount + delivery

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>YOUR CART</h1>
      </div>

      {items.length === 0 ? (
        <p className="empty">Your cart is empty — <Link href="/">go shopping</Link></p>
      ) : (
        <div className="cart-grid">
          <section className="cart-items">
            {items.map(i => <CartItem key={i.id} item={i} />)}
          </section>

          <aside className="order-summary card">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>EGP {subtotal}</span></div>
            <div className="summary-row"><span>Discount (-20%)</span><span className="neg">-EGP {discount}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span>EGP {delivery}</span></div>
            <div className="summary-total"><span>Total</span><span>EGP {total}</span></div>

            {/* <div className="promo">
              <input placeholder="Add promo code" />
              <button className="apply">Apply</button>
            </div> */}

            <button className="checkout"><Link href="/checkout" className="checkout">
              Go to Checkout →
            </Link></button>
          </aside>
        </div>
      )}
    </main>
  )
}
