// // File: app/product/[productId]/page.jsx
// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppDispatch } from '@/hooks/redux';
// import { fetchProductById } from '@/store/slices/allProductSlice';
// import { useAppSelector } from '@/hooks/redux';
// // import RatingGraph from '.@/components/RatingSystem/RatingGraph';
// import ProductDescription from '@/components/product/ProductDescription';
// // import ProductReviews from '@/components/product/ProductReview';
// import SoapProductDescription from '@/components/product/SoapProductDescription';
// import { ProductPageSkeleton } from '@/components/product/ProductPageSkeleton';
//
// const ProductPage = () => {
//     const dispatch = useAppDispatch();
//     const { productId } = useParams();
//
//     // Local state
//     const [writeReview, setWriteReview] = useState(false);
//     const [confirmDelete, setConfirmDelete] = useState(false);
//     const [soap, setSoap] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     // Redux state
//     const currentProduct = useAppSelector((state) => state.allProducts.currentProduct);
//     const productLoading = useAppSelector((state) => state.allProducts.loading);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (!productId) return;
//
//             try {
//                 setLoading(true);
//                 setError(null);
//
//                 // Dispatch the Redux action to fetch product
//                 const result = await dispatch(fetchProductById(productId)).unwrap();
//
//                 // Check if it's a soap product
//                 if (result?.category) {
//                     const isSoap = result.category.find((cat) =>
//                         cat.toLowerCase().includes("homemade soaps") ||
//                         cat.toLowerCase().includes("soap")
//                     );
//                     setSoap(!!isSoap);
//                 }
//             } catch (err) {
//                 console.error('Error fetching product:', err);
//                 setError(err.message || 'Failed to fetch product');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchProduct();
//     }, [productId, dispatch]);
//
//     // Show loading skeleton
//     if (loading || productLoading) {
//         return <ProductPageSkeleton />;
//     }
//
//     // Show error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-center">
//                     <div className="text-red-500 text-xl mb-4">⚠️ Error loading product</div>
//                     <p className="text-gray-600 mb-4">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//
//     // Show product not found
//     if (!currentProduct) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-center">
//                     <div className="text-gray-400 text-6xl mb-4">📦</div>
//                     <p className="text-gray-500 text-lg mb-2">Product not found</p>
//                     <p className="text-gray-400 text-sm mb-4">The product you're looking for doesn't exist.</p>
//                     <button
//                         onClick={() => window.history.back()}
//                         className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div>
//             {/* Product Description Component */}
//             {soap ? (
//                 <SoapProductDescription product={currentProduct} />
//             ) : (
//                 <ProductDescription product={currentProduct} />
//             )}
//
//             {/* Rating and Reviews Section */}
//             <div className='xl:flex'>
//                 {/*<RatingGraph product={currentProduct} />*/}
//                 {/*<ProductReviews*/}
//                 {/*    product={currentProduct}*/}
//                 {/*    confirmDelete={confirmDelete}*/}
//                 {/*    setConfirmDelete={setConfirmDelete}*/}
//                 {/*    writeReview={writeReview}*/}
//                 {/*    setWriteReview={setWriteReview}*/}
//                 {/*/>*/}
//             </div>
//         </div>
//     );
// };
//
// export default ProductPage;
// app/product/[productId]/page.jsx - Updated with reviews
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProductById } from '@/store/slices/allProductSlice';
import ProductDescription from '@/components/product/ProductDescription';
import SoapProductDescription from '@/components/product/SoapProductDescription';
import ProductReviews from '@/components/product/ProductReviews';
import RatingGraph from '@/components/product/RatingGraph';
import { ProductPageSkeleton } from '@/components/product/ProductPageSkeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();

    // Local state
    const [soap, setSoap] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redux state
    const currentProduct = useAppSelector((state) => state.allProducts.currentProduct);
    const productLoading = useAppSelector((state) => state.allProducts.loading);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            try {
                setLoading(true);
                setError(null);

                // Dispatch the Redux action to fetch product
                const result = await dispatch(fetchProductById(productId)).unwrap();

                // Check if it's a soap product
                if (result?.category) {
                    const isSoap = result.category.find((cat) =>
                        cat.toLowerCase().includes("homemade soaps") ||
                        cat.toLowerCase().includes("soap")
                    );
                    setSoap(!!isSoap);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, dispatch]);

    // Show loading skeleton
    if (loading || productLoading) {
        return <ProductPageSkeleton />;
    }

    // Show error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️ Error loading product</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show product not found
    if (!currentProduct) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                    <p className="text-gray-500 text-lg mb-2">Product not found</p>
                    <p className="text-gray-400 text-sm mb-4">The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Product Description Component */}
            <div className="pb-8">
                {soap ? (
                    <SoapProductDescription product={currentProduct} />
                ) : (
                    <ProductDescription product={currentProduct} />
                )}
            </div>

            {/* Rating and Reviews Section */}
            <div className="xl:flex xl:space-x-8 px-4 lg:px-8">
                {/* Rating Graph */}
                <div className="xl:w-1/2">
                    <RatingGraph
                        productId={productId}
                        className="border-b xl:border-b-0 xl:border-r border-gray-200 pb-8 xl:pb-0 xl:pr-8"
                    />
                </div>

                {/* Reviews */}
                <div className="xl:w-1/2">
                    <ProductReviews
                        productId={productId}
                        className="pt-8 xl:pt-0"
                    />
                </div>
            </div>

            {/* Toast Container for notifications */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default ProductPage;