import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart, Star, MapPin, Leaf, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useSearch, usePagination, useSEO } from '@/hooks';
import { useCart } from '@/store';
import { toast } from 'sonner';
import { SlideIn, HoverScale } from '@/components/animations';
import type { Product } from '@/types';
import { useLanguage } from '@/store/LanguageContext';

export function Catalog() {
  const { t } = useLanguage();
  const { SEOComponent } = useSEO({ includeBreadcrumb: true });

  const products: Product[] = useMemo(() => [
    {
      id: 1,
      name: t('catalog.products.0.name'),
      artisan: 'Fatma Ben Ali',
      location: t('home.map.regions.nabeul'),
      category: 'alimentaire',
      price: 12,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 92,
      tags: ['Bio', 'Local'],
      stock: 45,
      description: t('catalog.products.0.description'),
    },
    {
      id: 2,
      name: t('catalog.products.1.name'),
      artisan: 'Mohamed Trabelsi',
      location: t('home.map.regions.sfax'),
      category: 'alimentaire',
      price: 35,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 95,
      tags: ['Bio', 'Traditionnel'],
      stock: 30,
      description: t('catalog.products.1.description'),
    },
    {
      id: 3,
      name: t('catalog.products.2.name'),
      artisan: 'Ahmed Gharbi',
      location: t('home.map.regions.zaghouan'),
      category: 'alimentaire',
      price: 45,
      rating: 5.0,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 88,
      tags: ['Naturel', 'Montagne'],
      stock: 20,
    },
    {
      id: 4,
      name: t('catalog.products.3.name'),
      artisan: 'Salma Hamdi',
      location: t('home.map.regions.tozeur'),
      category: 'alimentaire',
      price: 28,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 90,
      tags: ['Désert', 'Premium'],
      stock: 50,
    },
    {
      id: 5,
      name: t('catalog.products.4.name'),
      artisan: 'Amina Bouaziz',
      location: t('home.map.regions.kairouan'),
      category: 'artisanat',
      price: 450,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 85,
      tags: ['Traditionnel', 'Fait main'],
      stock: 5,
    },
    {
      id: 6,
      name: t('catalog.products.5.name'),
      artisan: 'Karim Jaziri',
      location: t('home.map.regions.nabeul'),
      category: 'artisanat',
      price: 85,
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 78,
      tags: ['Céramique', 'Décoratif'],
      stock: 15,
    },
    {
      id: 7,
      name: t('catalog.products.6.name'),
      artisan: 'Nadia Slimani',
      location: t('home.map.regions.tunis'),
      category: 'textile',
      price: 55,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 87,
      tags: ['Coton bio', 'Plage'],
      stock: 35,
    },
    {
      id: 8,
      name: t('catalog.products.7.name'),
      artisan: 'Hedi Romdhane',
      location: t('home.map.regions.mahdia'),
      category: 'textile',
      price: 75,
      rating: 4.6,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 95,
      tags: ['Naturel', 'Durable'],
      stock: 22,
    },
    {
      id: 9,
      name: t('catalog.products.8.name'),
      artisan: 'Green Pack TN',
      location: t('home.map.regions.tunis'),
      category: 'ecologique',
      price: 15,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 98,
      tags: ['Recyclé', 'Zéro déchet'],
      stock: 100,
    },
    {
      id: 10,
      name: t('catalog.products.9.name'),
      artisan: 'Samia Khalil',
      location: t('home.map.regions.tunis'),
      category: 'ecologique',
      price: 35,
      rating: 4.8,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      ecoScore: 94,
      tags: ['Upcycling', 'Unique'],
      stock: 18,
    },
  ], [t]);

  const categories = ['alimentaire', 'artisanat', 'textile', 'ecologique'];
  const regions = ['nabeul', 'sfax', 'kairouan', 'tunis', 'tozeur', 'zaghouan', 'mahdia'];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { results: searchResults } = useSearch(products, searchTerm, { threshold: 0.3 });

  const filteredProducts = useMemo(() => {
    return searchResults.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0  || selectedCategories.includes(product.category);
      const regionMatch =
        selectedRegions.length === 0 || selectedRegions.includes(product.location);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= minRating;
      return categoryMatch && regionMatch && priceMatch && ratingMatch;
    });
  }, [searchResults, selectedCategories, selectedRegions, priceRange, minRating]);

  const pagination = usePagination(filteredProducts, { itemsPerPage: 12 });
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      artisan: product.artisan,
      price: product.price,
      quantity: 1,
      image: product.image,
      ecoScore: product.ecoScore,
    });
    toast.success(`${product.name} ${t('catalog.addedToCart')}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setPriceRange([0, 500]);
    setMinRating(0);
    setSearchTerm('');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedRegions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    minRating > 0 ||
    searchTerm.length > 0;

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-background relative overflow-hidden pt-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <SlideIn direction="down" className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terracotta/5 text-terracotta text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border">
                <Star className="w-3.5 h-3.5 fill-terracotta" />
                {t('catalog.excellence')}
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-4">
                {t('catalog.title')}
              </h1>
              <p className="text-muted-foreground max-w-xl">
                {products.length} {t('catalog.subtitle')}
              </p>
            </div>
            <Button variant="outline" className="lg:hidden rounded-full" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              {t('catalog.filters')}
            </Button>
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.1} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('catalog.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-white/50"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </SlideIn>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-8 sticky top-40">
              <h2 className="font-black text-xl mb-8">{t('catalog.filters')}</h2>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm uppercase">{t('catalog.category')}</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} />
                      <span className="text-sm">{t(`catalog.categories.${cat}`)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm uppercase">{t('catalog.region')}</h3>
                <div className="space-y-3">
                  {regions.map((region) => (
                    <label key={region} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={selectedRegions.includes(t(`home.map.regions.${region}`))} onCheckedChange={() => setSelectedRegions(prev => prev.includes(t(`home.map.regions.${region}`)) ? prev.filter(r => r !== t(`home.map.regions.${region}`)) : [...prev, t(`home.map.regions.${region}`)])} />
                      <span className="text-sm">{t(`home.map.regions.${region}`)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm uppercase">{t('catalog.price')}</h3>
                <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} />
                <div className="flex justify-between mt-3 text-sm">
                  <span>{priceRange[0]} {t('catalog.currency')}</span>
                  <span>{priceRange[1]} {t('catalog.currency')}</span>
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full rounded-full text-terracotta border-terracotta" onClick={resetFilters}>
                  {t('catalog.reset')}
                </Button>
              )}
            </motion.div>
          </aside>

          <div className="flex-1">
            {pagination.items.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {pagination.startIndex}-{pagination.endIndex} {t('catalog.resultsCount')} {pagination.totalItems}
                </p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pagination.items.map((product) => (
                    <HoverScale key={product.id}>
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card border border-gray-100 h-full flex flex-col">
                        <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 shadow-sm">
                            <Leaf className="w-4 h-4 text-olive" />
                            <span className="text-xs font-bold">{product.ecoScore}%</span>
                          </div>
                        </Link>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold line-clamp-2 mb-2 group-hover:text-terracotta transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {product.artisan}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-warm-gold text-warm-gold' : 'text-muted-foreground'}`} />
                              ))}
                            </div>
                            <span className="text-xs font-semibold">{product.rating}</span>
                          </div>
                          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-black">{product.price}</p>
                            <span className="text-xs text-muted-foreground">{t('catalog.currency')}</span>
                          </div>
                            <button onClick={() => handleAddToCart(product)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-terracotta hover:text-white transition-all flex items-center justify-center">
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </HoverScale>
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button variant="outline" disabled={!pagination.hasPreviousPage} onClick={() => pagination.previousPage()} className="rounded-full">
                      {t('catalog.prev')}
                    </Button>
                    <div className="flex gap-1">
                      {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => (
                        <Button key={i + 1} variant={i + 1 === pagination.currentPage ? 'default' : 'outline'} onClick={() => pagination.goToPage(i + 1)} className="rounded-full w-10">
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button variant="outline" disabled={!pagination.hasNextPage} onClick={() => pagination.nextPage()} className="rounded-full">
                      {t('catalog.next')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed">
                <p className="text-lg text-muted-foreground mb-4">{t('catalog.noProducts')}</p>
                <Button variant="outline" className="rounded-full" onClick={resetFilters}>
                  {t('catalog.reset')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
