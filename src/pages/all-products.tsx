import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../components/ProductItem'
import { RootState } from '../store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 8
const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
const colors = ['green', 'red', 'yellow', 'orange', 'blue', 'purple', 'pink', 'white', 'black']
const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large']
const dressStyles = ['Casual', 'Formal', 'Party', 'Gym']

export default function ProductsPage(): JSX.Element {
  const router = useRouter()
  const q = typeof router.query.q === 'string' ? router.query.q.toLowerCase() : ''
  const dressStyleQuery = typeof router.query.dressStyle === 'string' ? router.query.dressStyle : ''
  const all = useSelector((s: RootState) => s.products.items)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedDressStyles, setSelectedDressStyles] = useState<string[]>([])
  const [priceLimit, setPriceLimit] = useState(300)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setSelectedDressStyles(dressStyleQuery && dressStyles.includes(dressStyleQuery) ? [dressStyleQuery] : [])
  }, [dressStyleQuery])

  const toggle = (value: string, selected: string[], setSelected: (values: string[]) => void) => {
    setSelected(selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value])
  }

  const products = all.filter(product => {
    const matchesSearch = !q || product.title.toLowerCase().includes(q)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesColor = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color))
    const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size))
    const matchesStyle = selectedDressStyles.length === 0 || selectedDressStyles.includes(product.dressStyle)
    return matchesSearch && matchesCategory && matchesColor && matchesSize && matchesStyle && product.price <= priceLimit
  })
  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const visibleProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => setCurrentPage(1), [q, selectedCategories, selectedColors, selectedSizes, selectedDressStyles, priceLimit])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedDressStyles([])
    setPriceLimit(300)
  }

  const filterContent = (
    <>
      <div className="filter-heading"><strong>Filters</strong><button type="button" aria-label="Clear filters" onClick={clearFilters}>Clear</button></div>
      <div className="filter-group">
        {categories.map(category => <button type="button" className={selectedCategories.includes(category) ? 'filter-link active' : 'filter-link'} key={category} onClick={() => toggle(category, selectedCategories, setSelectedCategories)}>{category}<span>›</span></button>)}
      </div>
      <div className="filter-group">
        <h3>Price <span>{priceLimit} EGP</span></h3>
        <input className="price-range" type="range" min="0" max="300" step="10" value={priceLimit} onChange={event => setPriceLimit(Number(event.target.value))} />
        <div className="price-labels"><span>EGP 0</span><span>EGP 300</span></div>
      </div>
      <div className="filter-group">
        <h3>Colors</h3>
        <div className="filter-swatches">{colors.map(color => <button type="button" key={color} aria-label={color} className={`filter-swatch swatch-${color} ${selectedColors.includes(color) ? 'selected' : ''}`} onClick={() => toggle(color, selectedColors, setSelectedColors)} />)}</div>
      </div>
      <div className="filter-group">
        <h3>Size</h3>
        <div className="filter-chips">{sizes.map(size => <button type="button" key={size} className={selectedSizes.includes(size) ? 'filter-chip selected' : 'filter-chip'} onClick={() => toggle(size, selectedSizes, setSelectedSizes)}>{size}</button>)}</div>
      </div>
      <div className="filter-group">
        <h3>Dress Style</h3>
        {dressStyles.map(style => <button type="button" className={selectedDressStyles.includes(style) ? 'filter-link active' : 'filter-link'} key={style} onClick={() => toggle(style, selectedDressStyles, setSelectedDressStyles)}>{style}<span>›</span></button>)}
      </div>
    </>
  )

  return (
    <main className="arrival-section">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div className="products-toolbar">
          <h1 className="section-title">All Products</h1>
          <div className="products-toolbar-actions"><button className="mobile-filter-button" type="button" onClick={() => setIsFiltersOpen(true)}>Filters</button><Link href="/" className="btn-view-all">Back to shop</Link></div>
        </div>

        <div className="products-layout">
          <aside className={isFiltersOpen ? 'catalog-filters open' : 'catalog-filters'}>
            <button className="filter-close" type="button" onClick={() => setIsFiltersOpen(false)} aria-label="Close filters">&times;</button>
            {filterContent}
          </aside>
          <div className="products-results">
            <div className="products-result-meta">Showing {visibleProducts.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-{Math.min(currentPage * PAGE_SIZE, products.length)} of {products.length} products</div>
            <div className="product-grid">
              {visibleProducts.map(p => <ProductItem key={p.id} id={p.id} title={p.title} price={p.price} image={p.image} oldPrice={p.isOnSale ? Math.round(p.price * 1.25) : undefined} />)}
            </div>
            {products.length === 0 && (
              <div className="products-empty-state" role="status">
                <strong>{q ? 'No products found' : 'No products match these filters'}</strong>
                <span>{q ? `We could not find products matching “${q}”.` : 'Try clearing a filter or choosing different options.'}</span>
                <button type="button" onClick={clearFilters}>Clear filters</button>
              </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

      </div>
    </main>
  )
}
