'use client';

import { FormEvent, useState } from 'react';
import { useTodoStore } from '../../stores/useTodoStore';

const TodoPage = () => {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    setFilter,
    filteredTodos,
  } = useTodoStore();

  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // 新しいTODOの追加
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  //　編集モードの開始
  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // 編集の保存
  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateTodo(editingId, editText);
      setEditingId(null);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2>Todo List</h2>

      {/* 新規TODO入力フォーム */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新しいTODOを入力"
            className="px-2 py-1"
          />
          <button
            className="ml-2 inline-block py-1 px-4 rounded-md bg-green-300"
            type="submit"
          >
            追加
          </button>
        </div>
      </form>

      {/* フィルター */}
      <div className="mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md ${
            filter === 'all' ? 'bg-blue-300 text-white' : 'bg-gray-400'
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-md ml-2 ${
            filter === 'active' ? 'bg-blue-400 text-white' : 'bg-gray-400'
          }`}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md ml-2 ${
            filter === 'completed' ? 'bg-blue-400 text-white' : 'bg-gray-400'
          }`}
        >
          完了済
        </button>
      </div>

      {/* TODOリスト */}
      <ul className="space-y-2">
        {filteredTodos().map((todo) => (
          <li key={todo.id} className="p-2 border rounded flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                className="flex-1 p-1 border rounded mr-2"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
                onClick={() => startEditing(todo.id, todo.text)}
              >
                {todo.text}
              </span>
            )}

            <div className="flex gap-1">
              {editingId === todo.id ? (
                <button
                  onClick={saveEdit}
                  className="px-2 py-1 bg-green-500 text-white rounded-md text-sm"
                >
                  保存
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  className="px-2 py-1 bg-gray-500 text-white rounded-md text-sm"
                >
                  編集
                </button>
              )}
              <button
                onClick={() => removeTodo(todo.id)}
                className="px-2 py-1 bg-red-500 text-white rounded-md text-sm"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* TODO件数の表示 */}
      <div className="mt-4 text-sm text gray-600">
        全{todos.length}件中 {todos.filter((t) => t.completed).length}件完了
      </div>
    </div>
  );
};

export default TodoPage;
