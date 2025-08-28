import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Bot, Zap, PenTool } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Generation',
      description: 'Leverage cutting-edge AI to create engaging and relevant social media content in seconds.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Instant Variations',
      description: 'Generate multiple post variations to find the perfect one for your audience. A/B test with ease.',
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: 'Easy Customization',
      description: 'Fine-tune your generated posts with our intuitive editor, adjusting tone, style, and more.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Describe Your Post',
      description: 'Fill in a few details like platform, tone, and keywords to guide the AI.',
    },
    {
      step: 2,
      title: 'Generate Content',
      description: 'Our AI generates multiple, high-quality post options for you to choose from.',
    },
    {
      step: 3,
      title: 'Publish & Shine',
      description: 'Copy your favorite post, or schedule it directly, and watch your engagement grow.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah L.',
      title: 'Social Media Manager',
      quote: 'SocialSpark has been a game-changer for my workflow. I can now create a week\'s worth of content in an hour. The quality is consistently impressive!',
      avatar: 'SL',
      image: 'https://picsum.photos/100/100?q=1',
      'data-ai-hint': 'woman portrait',
    },
    {
      name: 'Mike R.',
      title: 'Startup Founder',
      quote: 'As a founder wearing many hats, content creation was a huge time sink. SocialSpark allows me to maintain a strong social presence without the effort.',
      avatar: 'MR',
      image: 'https://picsum.photos/100/100?q=2',
      'data-ai-hint': 'man portrait',
    },
    {
      name: 'Jessica P.',
      title: 'Freelance Marketer',
      quote: 'The ability to generate variations and customize them is fantastic. It helps me provide so much more value to my clients. Highly recommended!',
      avatar: 'JP',
      image: 'https://picsum.photos/100/100?q=3',
      'data-ai-hint': 'woman smiling',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4">
            Create Social Posts That Spark Joy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Let our AI-powered generator craft captivating social media content for you in seconds. Say goodbye to writer's block and hello to engagement.
          </p>
          <Link href="/generator">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Generate a Post for Free
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="pt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
            Three Steps to Effortless Content
          </h2>
          <div className="relative grid md:grid-cols-3 gap-8">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block" />
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center z-10">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-background border-4 border-primary text-primary mx-auto rounded-full flex items-center justify-center font-bold text-2xl">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
            Loved by Creators Worldwide
          </h2>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="p-6 flex-grow">
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                      </CardContent>
                      <CardHeader className="flex flex-row items-center gap-4 pt-0">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial['data-ai-hint']} width={100} height={100}/>
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Find the Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're just starting out or managing multiple brands, we have a plan that fits your needs.
          </p>
          <div className="max-w-md mx-auto bg-background rounded-lg p-8 shadow-lg border">
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-4xl font-bold mb-4">$19<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2 text-left mb-6">
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Unlimited Post Generations</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> All Social Platforms</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Content Calendar & Scheduler</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Analytics Dashboard</li>
            </ul>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              Go Pro
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
