"use client";

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WardrobeItem {
  _id: string;
  name: string;
  imageUrl: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  condition: string;
  tags: Array<{ _id: string; name: string }>;
}

export default function WardrobePage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    color: 'all',
    tag: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') queryParams.append(key, value);
      });

      const response = await fetch(`/api/wardrobe?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters({ ...filters, category: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.color}
            onValueChange={(value) => setFilters({ ...filters, color: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="pink">Pink</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative pb-[100%]">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-muted-foreground">{item.category}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag) => (
                  <Badge key={tag._id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative pb-[100%]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Details</h4>
                  <dl className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Category</dt>
                      <dd>{selectedItem.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Brand</dt>
                      <dd>{selectedItem.brand}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Color</dt>
                      <dd>{selectedItem.color}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Size</dt>
                      <dd>{selectedItem.size}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Condition</dt>
                      <dd>{selectedItem.condition}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag._id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Implement edit functionality
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      try {
                        const response = await fetch(`/api/wardrobe/${selectedItem._id}`, {
                          method: 'DELETE',
                        });
                        if (!response.ok) throw new Error('Failed to delete item');
                        setSelectedItem(null);
                        fetchItems();
                      } catch (error) {
                        console.error('Error deleting item:', error);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}