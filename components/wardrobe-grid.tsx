"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shirt, Tangent as Pants, Brackets as Jacket } from "lucide-react"

const DEMO_ITEMS = [
  {
    id: 1,
    type: "tops",
    name: "White Cotton T-Shirt",
    brand: "Essential Basics",
    color: "White",
    material: "100% Cotton",
    occasions: ["casual", "workout"],
    seasons: ["summer", "spring"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    type: "bottoms",
    name: "Blue Denim Jeans",
    brand: "DenimCo",
    color: "Blue",
    material: "Denim",
    occasions: ["casual"],
    seasons: ["all-season"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    type: "outerwear",
    name: "Black Leather Jacket",
    brand: "UrbanStyle",
    color: "Black",
    material: "Leather",
    occasions: ["casual", "evening"],
    seasons: ["fall", "winter"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60"
  },
]

export function WardrobeGrid() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredItems = activeTab === "all" 
    ? DEMO_ITEMS 
    : DEMO_ITEMS.filter(item => item.type === activeTab)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tops">
            <Shirt className="h-4 w-4 mr-2" />
            Tops
          </TabsTrigger>
          <TabsTrigger value="bottoms">
            <Pants className="h-4 w-4 mr-2" />
            Bottoms
          </TabsTrigger>
          <TabsTrigger value="outerwear">
            <Jacket className="h-4 w-4 mr-2" />
            Outerwear
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.brand}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Color:</span>
                      <span className="text-sm text-muted-foreground">
                        {item.color}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Material:</span>
                      <span className="text-sm text-muted-foreground">
                        {item.material}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {item.occasions.map((occasion) => (
                      <Badge key={occasion} variant="secondary">
                        {occasion}
                      </Badge>
                    ))}
                    {item.seasons.map((season) => (
                      <Badge key={season} variant="outline">
                        {season}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}