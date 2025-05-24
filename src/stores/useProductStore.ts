import { create } from 'zustand';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  // アクション
  fetchProducts: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  clearError: () => void;
};

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const useProductStore = create<ProductState>((set) => ({
  ...initialState,

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      // データフェッチ
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('商品データの取得に失敗しました');
      }

      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (err) {
      // エラーハンドリング
      set({
        error:
          err instanceof Error ? err.message : '不明なエラーが発生しました',
        isLoading: false,
      });
    }
  },

  searchProducts: async (query) => {
    try {
      set({ isLoading: true, error: null });

      // 検索クエリを使用したデータフェッチ
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('商品検索に失敗しました');
      }

      const data = await response.json();

      // クライアント側でフィルタリング（実際のAPIでは検索エンドポイントを使用するべき）
      const filteredProducts = data.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );

      set({ products: filteredProducts, isLoading: false });
    } catch (err) {
      // エラーハンドリング
      set({
        error:
          err instanceof Error ? err.message : '検索中にエラーが発生しました',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
