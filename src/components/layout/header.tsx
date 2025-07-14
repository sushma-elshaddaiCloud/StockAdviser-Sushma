
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, TrendingUp, BarChart3, HomeIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  const navLinks = [
    { href: "/home", label: "Home", icon: <HomeIcon className="h-5 w-5" /> },
    ...(isSignedIn ? [
      { href: "/stock-analysis", label: "Stock Analysis", icon: <BarChart3 className="h-5 w-5" /> },
      { href: "/chatbot", label: "AI Chatbot", icon: <Bot className="h-5 w-5" /> },
    ] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/home" className="flex items-center">
            <TrendingUp className="h-8 w-8 text-accent" />
            <span className="ml-3 text-2xl font-bold text-foreground">TradeWise</span>
          </Link>
          <nav className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className={cn(
                    "text-muted-foreground hover:text-accent transition-colors px-4 py-2",
                    pathname === link.href && "text-accent-foreground bg-accent/80 hover:bg-accent"
                  )}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <div className="hidden md:flex space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-muted-foreground hover:text-accent">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.firstName || 'User'}!
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
            
            <div className="md:hidden">
            {/* Mobile Menu Button (can be implemented later if needed) */}
            {/* For now, keep it simple. Users can navigate via browser back/forward or direct URL. */}
            {/* Or, if there's space, show icons only for mobile */}
              <div className="flex items-center space-x-2">
                <nav className="flex space-x-1 items-center">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} title={link.label}>
                      <Button
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        size="icon"
                        className={cn(
                          "text-muted-foreground hover:text-accent transition-colors",
                           pathname === link.href && "text-accent-foreground bg-accent/80 hover:bg-accent"
                        )}
                      >
                        {link.icon}
                      </Button>
                    </Link>
                  ))}
                </nav>
                {!isSignedIn ? (
                  <div className="flex space-x-1">
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button size="sm" className="text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                ) : (
                  <UserButton afterSignOutUrl="/" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
