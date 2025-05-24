'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useProductStore } from '../../stores/useProductStore';

const ProductPage = () => {
  const {
    products,
    isLoading,
    error,
    clearError,
    searchProducts,
    fetchProducts,
  } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');

  // コンポーネントマウント時に商品データを取得
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 検索処理
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">商品一覧</h2>
        <div className="text-xl">{products.length}件</div>
      </div>
      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="商品を検索"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            検索
          </button>
          <button
            type="submit"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            リセット
          </button>
        </div>
      </form>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={clearError}
          >
            <span className="sr-only">閉じる</span>
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      {/* ローディング表示 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // 商品リスト
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {/* 商品画像 */}
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${product.price}</span>
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 商品が見つからない場合 */}
      {!isLoading && products.length === 0 && !error && (
        <div className="text-center py-10">
          <p className="text-gray-500">商品が見つかりませんでした</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
