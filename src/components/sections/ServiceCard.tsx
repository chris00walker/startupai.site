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
    <Card className="professional-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/10">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">{title}</CardTitle>
              {badge && (
                <Badge variant="secondary" className="mt-1 text-xs font-medium">{badge}</Badge>
              )}
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pt-0">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button asChild className="btn-card">
          <Link href={href}>
            Learn More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
