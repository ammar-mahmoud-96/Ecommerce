export default function BrandStrip(){
  const brands = ['VERSACE','ZARA','GUCCI','PRADA','Calvin Klein']
  return (
    <div className="brand-strip black">
      <div className="brand-inner">
        {brands.map((b, i) => <div key={i} className="brand">{b}</div>)}
      </div>
    </div>
  )
}
