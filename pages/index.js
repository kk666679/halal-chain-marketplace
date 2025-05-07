export default function HomePage() {
    return (
      <main className="container">
        <h1>Welcome to HalalChain Marketplace</h1>
        <p>World's leading ethical halal commerce platform</p>
        
        <div className="cta-section">
          <a href="/marketplace" className="btn">
            Explore Marketplace
          </a>
          <a href="/vendor-registration" className="btn secondary">
            Become a Vendor
          </a>
        </div>
      </main>
    )
  }