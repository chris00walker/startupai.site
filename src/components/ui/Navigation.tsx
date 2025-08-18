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
import { Menu } from 'lucide-react';

const navigation = [
  { name: 'Process', href: '/process' },
  { name: 'Product', href: '/product' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Advisory', href: '/services/advisory' },
      { name: 'Blog', href: '/blog' },
    ]
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Sign-up', href: '/signup' },
  { name: 'Login', href: '/login' },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const services = [
    { name: 'Advisory', href: '/services/advisory', description: 'Strategic guidance and ongoing support' },
    { name: 'Blog', href: '/blog', description: 'Insights, tutorials, and industry thought leadership' },
  ];

  return (
    <header className="bg-gray-900 sticky top-0 z-50 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary hover:text-secondary transition-all duration-300 flex items-center group"
            >
              <span className="bg-primary text-white w-12 h-8 rounded-md flex items-center justify-center font-bold text-sm glow-effect group-hover:scale-110 transition-all duration-300">
                CWC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/product" className={cn('text-white hover:bg-gray-700 hover:text-white bg-gray-900', isActive('/product') && 'text-white bg-gray-800')}>
                      Product
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn('text-white hover:bg-gray-700 hover:text-white bg-gray-900', isActive('/services') && 'text-white bg-gray-800')}>
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-gray-900 border-gray-800">
                      {services.map((service) => (
                        <ListItem
                          key={service.name}
                          title={service.name}
                          href={service.href}
                          className="text-white hover:bg-gray-800"
                        >
                          <span className="text-gray-300">{service.description}</span>
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/process" className={cn('text-white hover:bg-gray-700 hover:text-white bg-gray-900', isActive('/process') && 'text-white bg-gray-800')}>
                      Process
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/pricing" className={cn('text-white hover:bg-gray-700 hover:text-white bg-gray-900', isActive('/pricing') && 'text-white bg-gray-800')}>
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-gray-700 hover:text-white bg-gray-900">
              <Link href="/signup">Sign-up</Link>
            </Button>
            <Button asChild className="bg-gray-900 text-white hover:bg-primary hover:text-white">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 border-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Navigation</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link
                    href="/product"
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-800 rounded-md',
                      isActive('/product') && 'text-primary bg-gray-800'
                    )}
                  >
                    Product
                  </Link>
                  
                  <div className="space-y-2">
                    <Link
                      href="/services"
                      className={cn(
                        'block px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-800 rounded-md',
                        isActive('/services') && 'text-primary bg-gray-800'
                      )}
                    >
                      Services
                    </Link>
                    <div className="pl-4 space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block px-3 py-2 text-sm text-gray-300 hover:text-primary hover:bg-gray-800 rounded-md"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/process"
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-800 rounded-md',
                      isActive('/process') && 'text-primary bg-gray-800'
                    )}
                  >
                    Process
                  </Link>

                  <Link
                    href="/pricing"
                    className={cn(
                      'block px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-800 rounded-md',
                      isActive('/pricing') && 'text-primary bg-gray-800'
                    )}
                  >
                    Pricing
                  </Link>

                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" asChild className="border-gray-600 text-white hover:bg-gray-800 hover:text-white">
                      <Link href="/signup">Sign-up</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login">Login</Link>
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
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
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
