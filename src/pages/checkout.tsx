import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../store'
import { clearCart } from '../store/slices/cartSlice'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getFirebaseAuth, getFirebaseDb } from '../lib/firebase'

const formatPrice = (price: number) => `EGP ${price.toFixed(2)}`
const getSaleAmount = (price: number, oldPrice?: number) => oldPrice && oldPrice > price ? oldPrice - price : 0
const getSalePercentage = (price: number, oldPrice?: number) => {
  const saleAmount = getSaleAmount(price, oldPrice)
  return oldPrice && saleAmount > 0 ? Math.round((saleAmount / oldPrice) * 100) : 0
}

export default function Checkout() {
  const dispatch = useDispatch()
  const router = useRouter()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
  const [governorate, setGovernorate] = useState('')
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState('')

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => sum + getSaleAmount(item.price, item.oldPrice) * item.quantity, 0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cartItems.length === 0 || isSubmitting) return

    setIsSubmitting(true)
    setToast('')
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            email: formData.get('email'),
            phoneCountryCode: formData.get('phone-country-code'),
            phone: formData.get('phone'),
            alternativePhoneCountryCode: formData.get('alternate-phone-country-code'),
            alternativePhone: formData.get('alternate-phone'),
          },
          delivery: {
            fullName: formData.get('full-name'),
            governorate: formData.get('governorate'),
            address: formData.get('address'),
          },
          discountCode: formData.get('discount-code'),
          paymentMethod,
          items: cartItems,
          subtotal,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)

      const user = getFirebaseAuth().currentUser
      if (user) {
        const firestoreItems = cartItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          ...(item.oldPrice !== undefined ? { oldPrice: item.oldPrice } : {}),
          ...(item.image ? { image: item.image } : {}),
          ...(item.size ? { size: item.size } : {}),
          ...(item.color ? { color: item.color } : {}),
        }))

        await addDoc(collection(getFirebaseDb(), 'orders'), {
          userId: user.uid,
          userEmail: user.email || formData.get('email') || null,
          contact: {
            email: formData.get('email') || null,
            phoneCountryCode: formData.get('phone-country-code') || null,
            phone: formData.get('phone') || null,
            alternativePhoneCountryCode: formData.get('alternate-phone-country-code') || null,
            alternativePhone: formData.get('alternate-phone') || null,
          },
          delivery: {
            fullName: formData.get('full-name'),
            governorate: formData.get('governorate'),
            address: formData.get('address'),
          },
          discountCode: formData.get('discount-code') || null,
          paymentMethod,
          items: firestoreItems,
          subtotal,
          totalSavings,
          createdAt: serverTimestamp(),
        })
      }
      dispatch(clearCart())
      setToast('Your order has been sent successfully.')
      window.setTimeout(() => router.push('/'), 1500)
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Unable to send your order right now.')
    } finally {
      setIsSubmitting(false)
      window.setTimeout(() => setToast(''), 5000)
    }
  }

  return (
    <main className="checkout-page">
      <header className="checkout-mobile-header">
        <button type="button" aria-label="Go back" onClick={() => window.history.back()}>&larr;</button>
        <strong>SHOP.CO</strong>
      </header>
      <section className="checkout-mobile-summary-toggle">
        <button type="button" onClick={() => setIsSummaryOpen(open => !open)} aria-expanded={isSummaryOpen}>
          <span className="summary-toggle-label"><span>{isSummaryOpen ? 'Hide' : 'Show'} order summary</span><b>{itemCount}</b></span>
          <strong>{formatPrice(subtotal)}</strong>
        </button>
        <span>View items in your cart</span>
      </section>
      <section className="checkout-form-panel" aria-label="Checkout details">
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section contact-section">
            <h1>Contact</h1>
            <label htmlFor="email">Email <span>(Optional)</span></label>
            <div className="checkout-input has-icon"><span aria-hidden="true">&#9993;</span><input id="email" name="email" type="email" placeholder="your.email@gmail.com" /></div>
            <label htmlFor="phone">Phone <b>*</b></label>
            <div className="phone-row"><select name="phone-country-code" aria-label="Phone country code" defaultValue="+20"><option>+20</option></select><div className="checkout-input has-icon"><span aria-hidden="true">&#9742;</span><input id="phone" name="phone" type="tel" placeholder="Phone Number" required /></div></div>
            <label htmlFor="alternate-phone">Alternative Phone <span>(Optional)</span></label>
            <div className="phone-row"><select name="alternate-phone-country-code" aria-label="Alternative phone country code" defaultValue="+20"><option>+20</option></select><div className="checkout-input has-icon"><span aria-hidden="true">&#9742;</span><input id="alternate-phone" name="alternate-phone" type="tel" placeholder="Other Phone Number" /></div></div>
          </section>
          <section className="checkout-section delivery-section">
            <h2>Delivery</h2>
            <label htmlFor="full-name">Full Name <b>*</b></label>
            <div className="checkout-input"><input id="full-name" name="full-name" placeholder="Your Name" required /></div>
            <select className="checkout-select" name="governorate" value={governorate} onChange={event => setGovernorate(event.target.value)} required><option value="">Select Governorate</option><option value="cairo">Cairo</option><option value="giza">Giza</option><option value="alexandria">Alexandria</option></select>
            <textarea className="checkout-textarea" name="address" placeholder="Address" rows={3} required />
          </section>
          <section className="checkout-section discount-section">
            <label htmlFor="discount-code">Discount Code</label>
            <div className="discount-row"><input id="discount-code" name="discount-code" placeholder="Discount Code" /><button type="button">Apply</button></div>
          </section>
          <section className="checkout-section payment-section">
            <h2>Payment</h2>
            <button type="button" className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}><span className="payment-icon">EGP</span><span className="payment-copy"><strong>Cash on Delivery</strong><small>Pay when you receive your order</small></span><span className="payment-radio" aria-hidden="true" /></button>
            {/* <button type="button" className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`} onClick={() => setPaymentMethod('online')}><span className="payment-icon card-icon">&#9632;</span><span className="payment-copy"><strong>Online Payment</strong><small>Pay securely with credit/debit card</small></span><span className="payment-radio" aria-hidden="true" /></button> */}
          </section>
        </form>
      </section>
      <aside className={`checkout-summary ${isSummaryOpen ? 'summary-open' : ''}`}>
        <h2>Order Details</h2>
        {cartItems.length === 0 ? (
          <p className="empty-order">Your cart is empty.</p>
        ) : (
          <>
            <div className="order-items">
              {cartItems.map(item => (
                <div className="order-item" key={item.id}>
                  <div className="order-image-wrap"><img src={item.image || '/assets/Products/product1.png'} alt="" /><span>{item.quantity}</span></div>
                  <div className="order-item-copy">
                    <strong>{item.title}</strong>
                    {(item.size || item.color) && <small>{[item.size, item.color].filter(Boolean).join(' / ')}</small>}
                    {getSaleAmount(item.price, item.oldPrice) > 0 && <small className="order-sale-info">Was {formatPrice(item.oldPrice || item.price)} | Save {formatPrice(getSaleAmount(item.price, item.oldPrice))} ({getSalePercentage(item.price, item.oldPrice)}% off)</small>}
                  </div>
                  <strong className="order-item-price">{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="order-total-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            {totalSavings > 0 && <div className="order-total-row savings"><span>You save</span><strong>-{formatPrice(totalSavings)}</strong></div>}
            <div className="order-total-row total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
          </>
        )}
        <button className="place-order summary-place-order" type="submit" form="checkout-form" disabled={cartItems.length === 0 || isSubmitting}>{isSubmitting ? 'Sending...' : 'Place Order'}</button>
      </aside>
      <div className="checkout-mobile-footer">
        <div><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
        <button className="place-order" type="submit" form="checkout-form" disabled={cartItems.length === 0 || isSubmitting}>{isSubmitting ? 'Sending...' : 'Place Order'}</button>
      </div>
      {toast && <div className="checkout-toast" role="status" aria-live="polite"><span>{toast}</span><button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}>&times;</button></div>}
    </main>
  )
}
