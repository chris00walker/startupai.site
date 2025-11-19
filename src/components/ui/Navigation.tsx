'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Brain } from 'lucide-react';

const navigation = [
  { name: 'Process', href: '/process' },
  { name: 'Product', href: '/product' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Sign-up', href: '/signup' },
  { name: 'Login', href: '/login' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleMobileMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-white">StartupAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <nav className="flex items-center space-x-1">
              <Link
                href="/product"
                className={cn(
                  'px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-all duration-200',
                  isActive('/product') && 'text-white bg-slate-800'
                )}
              >
                Product
              </Link>
              <Link
                href="/process"
                className={cn(
                  'px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-all duration-200',
                  isActive('/process') && 'text-white bg-slate-800'
                )}
              >
                Process
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  'px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-all duration-200',
                  isActive('/pricing') && 'text-white bg-slate-800'
                )}
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-slate-800 text-sm"
              asChild
            >
              <Link href="/beta">
                Beta
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white text-sm"
              asChild
            >
              <a
                href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/login`}
              >
                Login
              </a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-slate-800"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-900 border-slate-800"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">Navigation</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link
                    href="/product"
                    onClick={handleMobileMenuClick}
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors',
                      isActive('/product') && 'text-white bg-slate-800'
                    )}
                  >
                    Product
                  </Link>

                  <Link
                    href="/process"
                    onClick={handleMobileMenuClick}
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors',
                      isActive('/process') && 'text-white bg-slate-800'
                    )}
                  >
                    Process
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={handleMobileMenuClick}
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors',
                      isActive('/pricing') && 'text-white bg-slate-800'
                    )}
                  >
                    Pricing
                  </Link>

                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-white hover:bg-slate-800"
                      onClick={handleMobileMenuClick}
                      asChild
                    >
                      <Link href="/beta">
                        Beta
                      </Link>
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={handleMobileMenuClick}
                      asChild
                    >
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/login`}
                      >
                        Login
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
