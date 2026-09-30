import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import logo from './assets/logo.png'
import { categories, filters, products } from './data'
import type { Filter, Product } from './data'
import './App.css'

function PhotoSlot({ label }: { label: string }) {
  return (
    <div className="photo-slot" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

function Header({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#" className="brand">
          <img src={logo} alt="Frog's Grotto Crochet Shop" width="64" height="64" />
          <span>Frog's Grotto</span>
        </a>
        <nav className="nav">
          <a href="#shop">Hats</a>
          <a href="#shop">Plushies</a>
          <a href="#shop">Scarves</a>
          <a href="#shop">And more!</a>
          <a href="#custom">Custom orders</a>
        </nav>
        <button type="button" className="basket-btn" onClick={onOpenCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8h14l-1.5 12h-11z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <span>Basket</span>
          <span className="basket-btn__count">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="hero__pill">New autumn batch just hopped in</span>
          <h1>Cozy things, crocheted by a frog.</h1>
          <p>
            Hats, plushies, scarves and more — hand-hooked in small batches from soft, squishy yarn. No two are quite
            the same.
          </p>
          <div className="hero__ctas">
            <a href="#shop" className="btn btn--yellow">Shop the grotto</a>
            <a href="#custom" className="btn btn--cream">Request a custom</a>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__blob">
            <PhotoSlot label="Hero photo — your favorite piece" />
          </div>
          <img className="hero__badge" src={logo} alt="" />
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Hats', 'Plushies', 'Scarves', 'Bags', 'Keychains', 'And more!']
  return (
    <section className="marquee" aria-hidden="true">
      {items.map((item, i) => (
        <span key={item} className="marquee__item">
          {i > 0 && <span className="marquee__dot">•</span>}
          {item}
        </span>
      ))}
    </section>
  )
}

function Categories() {
  return (
    <section id="shop" className="section">
      <div className="section__head">
        <h2>Shop by lily pad</h2>
        <a href="#" className="link-underline">See everything →</a>
      </div>
      <div className="category-grid">
        {categories.map((c) => (
          <a key={c.name} href="#" className={`category-card category-card--${c.color}`}>
            <div className="category-card__photo">
              <PhotoSlot label={c.placeholder} />
            </div>
            <div className="category-card__foot">
              <span>{c.name}</span>
              <span className="category-card__arrow" aria-hidden="true">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, inCart, onAdd }: { product: Product; inCart: boolean; onAdd: (p: Product) => void }) {
  return (
    <article className="product">
      <div className="product__photo">
        <PhotoSlot label={`${product.name} photo`} />
        {product.tag && <span className="product__tag">{product.tag}</span>}
      </div>
      <div className="product__info">
        <div className="product__text">
          <span className="product__name">{product.name}</span>
          <span className="product__meta">{product.meta}</span>
        </div>
        <span className="product__price">${product.price}</span>
      </div>
      <button type="button" className={`btn btn--add${inCart ? ' btn--add-in-cart' : ''}`} onClick={() => onAdd(product)}>
        {inCart ? 'Add another' : 'Add to basket'}
      </button>
    </article>
  )
}

function Products({ cart, onAdd }: { cart: string[]; onAdd: (p: Product) => void }) {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = products.filter((p) => filter === 'All' || p.cat === filter)

  return (
    <section className="section section--products">
      <div className="section__head">
        <h2>Fresh off the hook</h2>
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter${f === filter ? ' filter--active' : ''}`}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} inCart={cart.includes(p.id)} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}

function Maker() {
  return (
    <section className="maker">
      <div className="maker__inner">
        <div className="maker__photo">
          <PhotoSlot label="Photo of you (or your hands) crocheting" />
        </div>
        <div className="maker__copy">
          <span className="maker__eyebrow">MEET THE FROG</span>
          <h2>Every stitch counted by hand, in a very small grotto.</h2>
          <p>
            Frog's Grotto is a one-person crochet studio. Each piece takes a few hours to a few days, made with yarn
            picked to be soft, washable and built to be squished. Tell your story here — who makes it, where, and why.
          </p>
          <div className="maker__chips">
            <span>Handmade to order</span>
            <span>Small batches</span>
            <span>Ships with care</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CustomOrders() {
  const [joined, setJoined] = useState(false)

  const onJoin = (e: FormEvent) => {
    e.preventDefault()
    setJoined(true)
  }

  return (
    <section id="custom" className="custom">
      <div className="custom__card">
        <div className="custom__copy">
          <h2>Dreaming up something special?</h2>
          <p>
            Pick the colors, the critter, the size. Custom orders open a few times a season — join the list to get
            first dibs.
          </p>
        </div>
        <form className="custom__form" onSubmit={onJoin}>
          {joined ? (
            <div className="custom__thanks">You're on the list! We'll hop into your inbox soon.</div>
          ) : (
            <>
              <div className="custom__row">
                <input type="email" required placeholder="you@lilypad.com" aria-label="Email address" />
                <button type="submit" className="btn btn--yellow">Ribbit me</button>
              </div>
              <span className="custom__note">No spam. Just the occasional croak.</span>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <img src={logo} alt="Frog's Grotto" width="96" height="96" />
          <span>Hats · Plushies · Scarves · And more!</span>
        </div>
        <div className="footer__col">
          <span>Shop</span>
          <a href="#">Hats</a>
          <a href="#">Plushies</a>
          <a href="#">Scarves</a>
          <a href="#">Everything</a>
        </div>
        <div className="footer__col">
          <span>Help</span>
          <a href="#">Shipping</a>
          <a href="#">Care guide</a>
          <a href="#">Custom orders</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer__col">
          <span>Follow</span>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Etsy</a>
        </div>
      </div>
      <div className="footer__legal">© 2026 Frog's Grotto Crochet Shop</div>
    </footer>
  )
}

function App() {
  const [cart, setCart] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const showToast = (message: string) => {
    setToast(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (p: Product) => {
    setCart((c) => [...c, p.id])
    showToast(`${p.name} hopped into your basket`)
  }

  const openCart = () =>
    showToast(
      cart.length
        ? `${cart.length} item${cart.length > 1 ? 's' : ''} in your basket`
        : 'Your basket is empty — for now!',
    )

  return (
    <div className="page">
      <div className="announcement">Every piece is made by hand, one stitch at a time · Free shipping on orders over $50</div>
      <Header cartCount={cart.length} onOpenCart={openCart} />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Products cart={cart} onAdd={addToCart} />
        <Maker />
        <CustomOrders />
      </main>
      <Footer />
      <div className="toast-region" role="status" aria-live="polite">
        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  )
}

export default App
