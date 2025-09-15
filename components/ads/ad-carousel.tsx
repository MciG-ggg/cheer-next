'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Ad {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  adClient: string
  adPrice: number
  adDuration: number
}

export function AdCarousel() {
  const [ads, setAds] = useState<Ad[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    try {
      const response = await fetch('/api/ads?limit=5')
      const data = await response.json()
      setAds(data.ads || [])
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch ads:', error)
      setIsLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length)
  }

  useEffect(() => {
    if (ads.length <= 1) return
    
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [ads.length])

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="animate-pulse">
          <div className="h-64 bg-muted rounded-t-lg" />
          <CardHeader>
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2 mt-2" />
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="gradient-purple text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 绮课校园推广</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              想要在这里展示你的创意？我们提供最酷的校园推广服务！
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-2">仅需 20元/6个月</p>
                <p className="text-xs text-primary-foreground/70">覆盖全校，精准投放</p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/ads/pricing">
                  立即咨询 <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`transition-all duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              <Card className="hover:shadow-lg transition-shadow">
                {ad.coverImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={ad.coverImage}
                      alt={ad.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-chart-3 text-primary-foreground">
                    绮选推荐
                  </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {ad.title}
                    <Badge variant="outline" className="text-xs border-chart-3 text-chart-3">
                    {ad.adClient} · {ad.adPrice / 100}元/{ad.adDuration}个月
                  </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {ad.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      由 {ad.adClient} 赞助
                    </p>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/blog/${ad.slug}`}>
                        了解更多 <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {ads.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {ads.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
              {ads.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-chart-3' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
        )}
      </div>
    </div>
  )
}