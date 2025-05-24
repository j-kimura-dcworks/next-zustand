import { create } from 'zustand';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type FilterType = 'all' | 'active' | 'completed';

type TodoState = {
  todos: Todo[];
  filter: FilterType;

  // アクション
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  filteredTodos: () => Todo[];
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',

  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          text,
          completed: false,
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      ),
    })),
  setFilter: (filter) => set({ filter }),
  filteredTodos: () => {
    const { todos, filter } = get();

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
}));
