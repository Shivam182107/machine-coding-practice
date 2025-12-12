import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { fetchData } from '../api/data';
import { RecipeContext } from '../api/DataContext';
import { Apple, ChefHat, Shield, ShoppingBag } from 'lucide-react';

const RecipeCard = lazy(() => import('../comoponent/RecipeCard'))

const Home = () => {
    const [page, setpage] = useState(1);
    const limit = 6;
    const [skip, setskip] = useState(0);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["fetchdata", skip],
        queryFn: () => fetchData(skip),
        staleTime: Infinity
    })

    useEffect(() => {
        setskip((page - 1) * limit);
    }, [page])
    const { getRecipeData } = useContext(RecipeContext);

    useEffect(() => {
        if (data) {
            getRecipeData(data);
        }
    }, [data]);
    return (
        <>

            <section className='mb-12 relative overflow-hidden'>
                <div className='relative h-[500px] md:h-[600px] lg:h-[700px]'>
                    {/* Background image with overlay */}
                    <div className='absolute inset-0'>
                        <img
                            src="/HomeImage.avif"
                            alt="Delicious gourmet dish with fresh ingredients"
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent'></div>
                        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent'></div>
                    </div>

                    {/* Content container */}
                    <div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
                        <div className='max-w-2xl'>
                            {/* Badge/Tag */}
                            <div className='mb-6'>
                                <span className='inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30'>
                                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2'></span>
                                    <span className='text-emerald-100 text-sm font-medium'>5,000+ Recipes Available</span>
                                </span>
                            </div>

                            {/* Main heading */}
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
                                Discover & Share
                                <span className='block text-orange-400'>Amazing Recipes</span>
                            </h1>

                            {/* Subtitle */}
                            <p className='text-xl text-gray-200 mb-8 max-w-lg'>
                                Join our community of food lovers. Find inspiration, save your favorites, and share your culinary creations.
                            </p>

                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <button className='px-8 py-3 bg-orange-400 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center'>

                                    Explore Recipes
                                </button>

                                <button className='px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 flex items-center justify-center'>

                                    Join Community
                                </button>
                            </div>

                            {/* Stats/Features */}
                            <div className='mt-12 flex flex-wrap gap-6'>
                                <div className='flex items-center'>
                                    <div className='text-orange-500 font-bold text-2xl mr-2'>15K+</div>
                                    <div className='text-gray-300'>Active Cooks</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='text-orange-500 font-bold text-2xl mr-2'>4.8★</div>
                                    <div className='text-gray-300'>Community Rating</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='text-orange-500 font-bold text-2xl mr-2'>24/7</div>
                                    <div className='text-gray-300'>Live Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>

                <div className='bg-white h-[200px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-center items-center p-6'>
                    <h1 className='text-4xl font-bold text-center mb-3'>
                        <span className='text-orange-500'>Explore </span>
                        <span className='text-gray-800'>Recipes</span>
                    </h1>
                    <p className='text-xl text-gray-600'>Delicious recipes you'll love!</p>
                </div>
                <div className='grid grid-cols-3 gap-4 place-items-center gap-y-16 pb-4 h-[1000px] max-h-[1200px] mb-8'>
                    <Suspense fallback={<div className='h-full w-full' ><h1 className='text-center text-6xl text-orange-400'>Loading.....</h1></div>}>
                        <RecipeCard data={data} />
                    </Suspense>
                </div>

                <div className='w-full flex flex-row justify-center items-center space-x-2'>
                    <button
                        onClick={() => setpage(prev => Math.max(prev - 1, 1))}
                        className={`flex items-center justify-center h-10 px-4 rounded-lg font-bold transition-all duration-200 ${page == 1
                            ? "bg-gray-100 text-gray-400 border- cursor-not-allowed border border-gray-500"
                            : "bg-white text-orange-600 border border-orange-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-md"
                            }`}
                        disabled={page == 1}
                    >

                        Prev
                    </button>

                    <div className='flex items-center space-x-2'>
                        <span className='bg-white border border-orange-200 text-orange-600 font-bold h-10 w-10 rounded-lg flex items-center justify-center shadow-sm'>
                            {page}
                        </span>

                    </div>

                    <button
                        onClick={() => setpage(prev => prev + 1)}
                        className={`flex items-center justify-center h-10 px-4 rounded-lg font-bold transition-all duration-200 ${data?.limit + skip >= data?.total
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-500"
                            : "bg-white text-orange-600 border border-orange-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-md"
                            }`}
                        disabled={data?.limit + skip >= data?.total}
                    >
                        Next

                    </button>
                </div>
            </section>

            <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-12 pb-8 px-4 md:px-8 mt-16 border-t border-orange-500/20">
                <div className="max-w-7xl mx-auto">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                        {/* Brand & Description */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500 rounded-lg">
                                    <ChefHat className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    RecipeHub
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Discover, cook, and share amazing recipes from around the world.
                                Your culinary journey starts here with thousands of delicious recipes
                                for every occasion.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                                    <i className="fab fa-pinterest-p"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-orange-300">Quick Links</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Browse Recipes
                                </a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Trending Now
                                </a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Meal Planner
                                </a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Cooking Tips
                                </a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Submit Recipe
                                </a></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-orange-300">Categories</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Vegetarian</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Vegan</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Quick Meals</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Desserts</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Healthy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">International</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-orange-300">Stay Updated</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Get weekly recipe inspiration and cooking tips delivered to your inbox.
                            </p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02]"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span>We respect your privacy. No spam, ever.</span>
                            </div>
                        </div>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800 pt-8">

                        {/* Bottom Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                            {/* Copyright */}
                            <div className="text-gray-500 text-sm">
                                <p>© {new Date().getFullYear()} RecipeHub. All recipes and images are for demonstration purposes.</p>
                            </div>

                            {/* Legal Links */}
                            <div className="flex flex-wrap gap-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Cookie Policy</a>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</a>
                            </div>

                            {/* App Download Badges (Optional) */}
                            <div className="flex gap-4">
                                <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Apple className="w-5 h-5" />
                                        <div className="text-xs">
                                            <div>Download on</div>
                                            <div className="font-semibold">App Store</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" />
                                        <div className="text-xs">
                                            <div>Get it on</div>
                                            <div className="font-semibold">Google Play</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 text-center text-gray-500 text-xs">
                            <p>RecipeHub is a demo application built with React. This is not a real recipe service.</p>
                            <p className="mt-1">All nutritional information is approximate. Consult a professional for dietary advice.</p>
                        </div>

                    </div>

                </div>
            </footer>
        </>
    )
}

export default Home