'use client';

export default function DesignSystemTest() {
  return (
    <div className="page-container-centered">
      {/* Page Header */}
      <div className="page-header-title-with-actions">
        <div className="page-header-text">
          <h1 className="text-3xl font-bold">Design System Phase 2 Test</h1>
          <p className="text-muted-foreground">
            Component Standardization Showcase
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn-default btn-outline">View Code</button>
          <button className="btn-default btn-primary">Documentation</button>
        </div>
      </div>

      {/* Button System Section */}
      <section className="space-section">
        <h2 className="text-2xl font-semibold mb-6">Button System</h2>

        {/* Size Variants */}
        <div className="block-layout mb-6">
          <h3 className="text-lg font-medium mb-4">Size Variants</h3>
          <div className="layout-flex">
            <button className="btn-sm btn-primary">Small</button>
            <button className="btn-default btn-primary">Default</button>
            <button className="btn-lg btn-primary">Large</button>
            <button className="btn-icon btn-primary">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Semantic Variants */}
        <div className="block-layout mb-6">
          <h3 className="text-lg font-medium mb-4">Semantic Variants</h3>
          <div className="layout-flex">
            <button className="btn-default btn-primary">Primary</button>
            <button className="btn-default btn-secondary">Secondary</button>
            <button className="btn-default btn-outline">Outline</button>
            <button className="btn-default btn-ghost">Ghost</button>
            <button className="btn-default btn-link">Link</button>
            <button className="btn-default btn-destructive">Destructive</button>
            <button className="btn-default btn-success">Success</button>
            <button className="btn-default btn-warning">Warning</button>
          </div>
        </div>

        {/* Button States */}
        <div className="block-layout">
          <h3 className="text-lg font-medium mb-4">Button States</h3>
          <div className="layout-flex">
            <button className="btn-default btn-primary">Normal</button>
            <button className="btn-default btn-primary btn-loading">
              Loading
            </button>
            <button className="btn-default btn-primary btn-disabled" disabled>
              Disabled
            </button>
          </div>
        </div>
      </section>

      {/* Card System Section */}
      <section className="space-section">
        <h2 className="text-2xl font-semibold mb-6">Card System</h2>

        <div className="card-grid-3">
          {/* Basic Card */}
          <div className="card-base">
            <div className="card-header">
              <h3 className="card-title">Base Card</h3>
              <p className="card-description">
                Standard card with minimal styling
              </p>
            </div>
            <div className="card-content">
              <p>
                This is a basic card component with standard padding and shadow.
              </p>
            </div>
            <div className="card-footer">
              <button className="btn-sm btn-outline">Learn More</button>
            </div>
          </div>

          {/* Elevated Card */}
          <div className="card-elevated">
            <div className="card-header">
              <h3 className="card-title">Elevated Card</h3>
              <p className="card-description">Card with stronger shadow</p>
            </div>
            <div className="card-content">
              <p>
                Elevated cards have more prominent shadows and hover effects.
              </p>
            </div>
            <div className="card-footer">
              <button className="btn-sm btn-primary">Action</button>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="card-interactive">
            <div className="card-header">
              <h3 className="card-title">Interactive Card</h3>
              <p className="card-description">
                Clickable card with hover effects
              </p>
            </div>
            <div className="card-content">
              <p>
                This card responds to user interaction with scale and shadow
                changes.
              </p>
            </div>
          </div>
        </div>

        {/* Specialized Cards */}
        <div className="card-grid-2 mt-6">
          {/* Feature Card */}
          <div className="card-feature">
            <div className="content-feature-icon">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="content-feature-text">
              <h3 className="text-lg font-semibold">Feature Card</h3>
              <p className="text-muted-foreground">
                Highlighted card with accent bar and icon
              </p>
            </div>
          </div>

          {/* Metric Card */}
          <div className="card-metric">
            <span className="card-metric-value">$24,567</span>
            <span className="card-metric-label">Total Revenue</span>
            <span className="card-metric-change text-green-600">
              +12.5% from last month
            </span>
          </div>
        </div>

        {/* Glass Card */}
        <div className="mt-6">
          <div className="card-glass card-lg">
            <h3 className="text-lg font-semibold mb-2">Glass Morphism Card</h3>
            <p className="text-muted-foreground">
              This card uses glass morphism effects with backdrop blur and
              transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Layout Components Section */}
      <section className="space-section">
        <h2 className="text-2xl font-semibold mb-6">Layout Components</h2>

        {/* Block Layouts */}
        <div className="layout-grid-responsive">
          <div className="block-layout-sm">
            <h4 className="font-medium">Small Block</h4>
            <p className="text-sm text-muted-foreground">Compact padding</p>
          </div>
          <div className="block-layout">
            <h4 className="font-medium">Default Block</h4>
            <p className="text-sm text-muted-foreground">Standard padding</p>
          </div>
          <div className="block-layout-lg">
            <h4 className="font-medium">Large Block</h4>
            <p className="text-sm text-muted-foreground">Extended padding</p>
          </div>
        </div>

        {/* Content Layouts */}
        <div className="block-layout mt-6">
          <h3 className="text-lg font-medium mb-4">Content Layout Patterns</h3>
          <div className="content-split">
            <div>
              <h4 className="font-semibold mb-2">Split Layout</h4>
              <p className="text-muted-foreground">
                Perfect for side-by-side content presentation with automatic
                responsive behavior.
              </p>
            </div>
            <div className="content-centered">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm text-muted-foreground">Centered content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Systems */}
      <section className="space-section">
        <h2 className="text-2xl font-semibold mb-6">Grid Systems</h2>

        <div className="layout-grid-dashboard">
          <div className="card-base card-sm">
            <h4 className="font-medium">Dashboard Grid 1</h4>
          </div>
          <div className="card-base card-sm">
            <h4 className="font-medium">Dashboard Grid 2</h4>
          </div>
          <div className="card-base card-sm">
            <h4 className="font-medium">Dashboard Grid 3</h4>
          </div>
          <div className="card-base card-sm">
            <h4 className="font-medium">Dashboard Grid 4</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
