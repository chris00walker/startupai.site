import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Chris Walker Consulting',
  description:
    'Insights and articles about eCommerce strategy, development, and startup growth.',
};

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable eCommerce Architecture',
    excerpt:
      'Learn how to design and implement scalable eCommerce systems that can handle growth from startup to enterprise.',
    category: 'Architecture',
    readTime: '8 min read',
    publishDate: '2024-01-15',
    tags: ['Architecture', 'Scalability', 'eCommerce'],
  },
  {
    id: 2,
    title: 'MVP Development Strategy for Startups',
    excerpt:
      'A comprehensive guide to building minimum viable products that validate your business idea and attract investors.',
    category: 'Strategy',
    readTime: '12 min read',
    publishDate: '2024-01-10',
    tags: ['MVP', 'Startup', 'Strategy'],
  },
  {
    id: 3,
    title: 'Performance Optimization Techniques',
    excerpt:
      'Advanced techniques for optimizing eCommerce platform performance, from database queries to frontend rendering.',
    category: 'Performance',
    readTime: '10 min read',
    publishDate: '2024-01-05',
    tags: ['Performance', 'Optimization', 'Development'],
  },
  {
    id: 4,
    title: 'Data-Driven Decision Making in eCommerce',
    excerpt:
      'How to leverage analytics and data science to make informed decisions that drive business growth.',
    category: 'Analytics',
    readTime: '6 min read',
    publishDate: '2023-12-28',
    tags: ['Analytics', 'Data Science', 'Business'],
  },
  {
    id: 5,
    title: 'Modern Frontend Technologies for eCommerce',
    excerpt:
      'Exploring the latest frontend frameworks and tools that can enhance user experience and conversion rates.',
    category: 'Frontend',
    readTime: '9 min read',
    publishDate: '2023-12-20',
    tags: ['Frontend', 'React', 'UX'],
  },
  {
    id: 6,
    title: 'API Design Best Practices',
    excerpt:
      'Essential principles for designing robust, scalable APIs that power modern eCommerce applications.',
    category: 'Backend',
    readTime: '7 min read',
    publishDate: '2023-12-15',
    tags: ['API', 'Backend', 'Architecture'],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Insights and articles about eCommerce strategy, development, and
                startup growth.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Strategy</Badge>
                <Badge variant="secondary">Development</Badge>
                <Badge variant="secondary">Architecture</Badge>
                <Badge variant="secondary">Performance</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link
                        href={`/blog/${post.id}`}
                        className="hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.publishDate).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </span>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/blog/${post.id}`}>Read More</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
