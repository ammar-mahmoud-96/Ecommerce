import Link from 'next/link'

const styles = [
  { title: 'Casual', image: '/assets/Products/product1.png' },
  { title: 'Formal', image: '/assets/Products/product2.png' },
  { title: 'Party', image: '/assets/Products/product3.png' },
  { title: 'Gym', image: '/assets/Products/product4.png' },
]

export default function StyleGrid(){
  return (
    <div className="style-wrapper">
      <div className="style-inner">
        <h3 className="style-heading">BROWSE BY DRESS STYLE</h3>

        <div className="style-grid">
          {styles.map((s, i) => (
            <Link key={i} href={`/all-products?dressStyle=${encodeURIComponent(s.title)}`} className={`style-card style-card-${i+1}`} aria-label={`Browse ${s.title} products`}>
              <div className="style-img">
                <img src={s.image} alt={s.title} />
              </div>
              <div className="style-title">{s.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
