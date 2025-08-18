import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

export function ServiceCard({ 
  title, 
  description, 
  features, 
  href, 
  icon, 
  badge 
}: ServiceCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2 bg-primary/10 rounded-lg">
                {icon}
              </div>
            )}
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {badge && (
            <Badge variant="secondary">{badge}</Badge>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Badge variant="outline" className="h-5 min-w-5 rounded-full px-1 mt-0.5">
                ✓
              </Badge>
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            Learn More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
