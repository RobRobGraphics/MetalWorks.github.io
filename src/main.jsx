import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Search, ShoppingBag, Menu, X, ChevronDown, ArrowUpRight, Plus, Minus, Trash2, Sparkles } from 'lucide-react'
import './styles.css'

const products = [
  { id: 1, name: 'LEGENDS / SERIES 01', category: 'Football', type: 'COLLECTOR BOX', price: 89.99, tag: 'FIRST EDITION', image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=85', description: 'A premium tribute to the icons who shaped the game.' },
  { id: 2, name: 'DIAMOND CUT / SERIES 01', category: 'Baseball', type: 'LIMITED RELEASE', price: 74.99, tag: 'LIMITED RUN', image: 'https://images.unsplash.com/photo-1508344928928-7165b0d3d1e3?auto=format&fit=crop&w=900&q=85', description: 'Classic baseball heritage, reimagined in a collectible format.' },
  { id: 3, name: 'COURT OF GREATNESS', category: 'Basketball', type: 'COLLECTOR BOX', price: 99.99, tag: 'NEW RELEASE', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85', description: 'A bold collection celebrating the artistry of the hardwood.' },
  { id: 4, name: 'THE ORIGINALS / NO. 01', category: 'Metal Works', type: 'SIGNATURE EDITION', price: 119.99, tag: 'SIGNATURE', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=85', description: 'The first chapter in the Metal Works signature collection.' },
]

const categories = ['All', 'Football', 'Baseball', 'Basketball', 'Hockey', 'Metal Works']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const visibleProducts = useMemo(() => products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
  ), [activeCategory, query])

  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product) {
    setCart(current => {
      const existing = current.find(item => item.id === product.id)
      return existing
        ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(id, amount) {
    setCart(current => current.map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
  }

  return (
    <div className="site-shell">
      <div className="announcement">A NEW STANDARD IN COLLECTING <span>—</span> ROOTED IN HISTORY. FORGED FOR THE FUTURE.</div>
      <header className="header">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        <a className="brand" href="#" aria-label="Metal Works home">
          <span className="brand-mark">MW</span>
          <span className="brand-word">METAL<span>WORKS</span><small>COLLECTIBLES REFORGED</small></span>
        </a>
        <nav className={mobileOpen ? 'main-nav open' : 'main-nav'}>
          <a href="#shop" onClick={() => setMobileOpen(false)}>SHOP <ChevronDown size={13}/></a>
          <a href="#collections" onClick={() => setMobileOpen(false)}>COLLECTIONS</a>
          <a href="#story" onClick={() => setMobileOpen(false)}>OUR STORY</a>
          <a href="#coming-soon" onClick={() => setMobileOpen(false)}>COMING SOON</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${count} items`}><ShoppingBag /><span>BAG</span><b>{count}</b></button>
        </div>
      </header>

      {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus placeholder="Search the collection..." value={query} onChange={e => setQuery(e.target.value)}/><button onClick={() => {setQuery(''); setSearchOpen(false)}}><X size={18}/></button></div>}

      <main>
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow"><span/> THE NEXT ERA OF COLLECTING</div>
            <h1>BUILT ON<br/><em>LEGACY.</em><br/>MADE TO LAST.</h1>
            <p>The icons. The moments. The stories that deserve more than ordinary.</p>
            <a className="primary-button" href="#shop">EXPLORE THE COLLECTION <ArrowUpRight size={17}/></a>
          </div>
          <div className="hero-caption"><span>01 / 04</span><span>THE ART OF COLLECTING. REFORGED.</span></div>
          <div className="hero-vertical">METAL WORKS — EST. 2026</div>
        </section>

        <section className="ticker" aria-label="Brand statement"><span>ROOTED IN HISTORY</span><i>✳</i><span>FORGED FOR THE FUTURE</span><i>✳</i><span>THE ART OF COLLECTING</span><i>✳</i><span>ROOTED IN HISTORY</span></section>

        <section className="intro section-wrap" id="collections">
          <div className="section-kicker">01 — THE COLLECTION</div>
          <div className="intro-row"><h2>NOT JUST CARDS.<br/><em>ARTIFACTS.</em></h2><p>Every great collection starts with a story. We bring the past forward through premium design, considered details, and pieces made to be kept.</p></div>
        </section>

        <section className="shop-section section-wrap" id="shop">
          <div className="shop-heading"><div><div className="section-kicker">CURATED FOR COLLECTORS</div><h2>SHOP THE <em>DROP.</em></h2></div><a className="text-link" href="#coming-soon">VIEW ALL RELEASES <ArrowUpRight size={15}/></a></div>
          <div className="filters">{categories.map(category => <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="product-grid">
            {visibleProducts.map(product => <article className="product-card" key={product.id}>
              <div className="product-image-wrap"><img src={product.image} alt={product.name}/><span className="product-tag">{product.tag}</span><button className="quick-add" onClick={() => addToCart(product)}><Plus size={17}/> QUICK ADD</button></div>
              <div className="product-meta"><span>{product.category} / {product.type}</span><span>${product.price.toFixed(2)}</span></div>
              <h3>{product.name}</h3><p>{product.description}</p>
            </article>)}
            {visibleProducts.length === 0 && <div className="empty-results">No releases found. Try another search or category.</div>}
          </div>
        </section>

        <section className="manifesto" id="story">
          <div className="manifesto-art"><div className="metal-disc">MW<span>01</span></div><div className="art-label">CRAFT / CULTURE / COLLECTING</div></div>
          <div className="manifesto-copy"><div className="section-kicker">02 — THE METAL WORKS STANDARD</div><h2>THE NOSTALGIA<br/>THAT STARTED IT ALL.<br/><em>THE INNOVATION<br/>THAT TAKES IT FURTHER.</em></h2><p>We believe collecting is more than ownership. It's memory, identity, discovery, and the thrill of finding something that means something. Metal Works exists to honor that feeling—and build what's next.</p><a className="text-link" href="#coming-soon">DISCOVER OUR STORY <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="coming section-wrap" id="coming-soon"><div className="section-kicker">03 — ON THE HORIZON</div><div className="coming-row"><h2>THE NEXT DROP<br/><em>IS TAKING SHAPE.</em></h2><div><Sparkles size={24}/><p>New collections. New collaborations. New reasons to collect. Be first to know when the next release lands.</p><form onSubmit={e => {e.preventDefault(); alert('Thanks for your interest. Newsletter signup will be connected when your email service is ready.')}}><input type="email" placeholder="YOUR EMAIL ADDRESS" required/><button aria-label="Join mailing list"><ArrowUpRight/></button></form><small>Newsletter signup is a visual placeholder until an email service is connected.</small></div></div></section>
      </main>

      <footer className="footer"><div className="footer-top"><a className="brand footer-brand" href="#"><span className="brand-mark">MW</span><span className="brand-word">METAL<span>WORKS</span><small>COLLECTIBLES REFORGED</small></span></a><div className="footer-line">ROOTED IN HISTORY. FORGED FOR THE FUTURE.</div></div><div className="footer-bottom"><span>© 2026 METAL WORKS. ALL RIGHTS RESERVED.</span><span>COLLECT WITH PURPOSE.</span><a href="#top">BACK TO TOP ↑</a></div></footer>

      {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="cart-drawer"><div className="drawer-head"><div><span className="section-kicker">YOUR SELECTION</span><h2>THE BAG <small>({count})</small></h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X/></button></div>
        {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={32}/><h3>YOUR BAG IS EMPTY.</h3><p>Your next great find is waiting.</p><button className="primary-button" onClick={() => setCartOpen(false)}>EXPLORE THE SHOP</button></div> : <>
          <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-info"><b>{item.name}</b><span>${item.price.toFixed(2)}</span><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}><Plus size={13}/></button><button className="remove" onClick={() => changeQuantity(item.id, -item.quantity)}><Trash2 size={14}/></button></div></div></div>)}</div>
          <div className="cart-total"><div><span>SUBTOTAL</span><b>${total.toFixed(2)}</b></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-button full" onClick={() => alert('Checkout is not connected yet. Connect an ecommerce/payment provider before accepting orders.')}>CONTINUE TO CHECKOUT <ArrowUpRight size={16}/></button></div>
        </>}
      </aside></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
