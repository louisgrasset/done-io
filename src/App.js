import './App.scss';
import { useSelector, useStore } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Filter, ModalTag, ModalTodo, Placeholder, Search, Section, Todo, Tag } from './components';
import iconHome from './images/home.svg';
import iconPlus from './images/plus.svg';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_NOT_COMPLETED } from './filters';
import { ADD_TAG, SET_OPTION_FILTER } from './actions';

export const App = () => {
  const store = useStore();
  const state = useSelector(s => s);

  useEffect(() => {
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 1', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 2', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 3', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 4', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 5', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 6', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 7', color: '#fff' } });
    store.dispatch({ type: ADD_TAG, payload: { text: 'Tag 8', color: '#fff' } });
  }, [store]);

  const [searchText, setSearchText] = useState('');
  const [displayModalTodo, setDisplayModalTodo] = useState(false);
  const [displayModalTag, setDisplayModalTag] = useState(false);

  const todos = useMemo(() => {
    switch (state.options.filter) {
      case SHOW_COMPLETED: return state.todos.filter(todo => { todo.completed === true && todo.text.startsWith(searchText); });
      case SHOW_NOT_COMPLETED: return state.todos.filter(todo => { todo.completed === false && todo.text.startsWith(searchText); });
      case SHOW_ALL: return state.todos.filter(todo => todo.text.startsWith(searchText));
      default: return state.todos.filter(todo => todo.text.startsWith(searchText));
    }
  }, [state.options.filter, state.todos, searchText]);

  const countByTag = useCallback(id => {
    let count = 0;
    todos.forEach(todo => todo.tag === id && count++);
    return count;
  }, [todos]);

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="header">
          <Search searchText={searchText} setSearchText={setSearchText} />
          <div className="header-action" onClick={() => {
            setDisplayModalTodo(false);
            setDisplayModalTag(false);
            setSearchText('');
            store.dispatch({
              type: SET_OPTION_FILTER,
              payload: {
                filter: SHOW_ALL
              }
            });
          }}>
            <img className="header-action__icon" src={iconHome} alt="home" />
          </div>
        </div>
        <div className="main">
          <div className="filter-list">
            <Filter filter={SHOW_ALL} />
            <Filter filter={SHOW_NOT_COMPLETED} />
            <Filter filter={SHOW_COMPLETED} />
          </div>
          <Section name={`Todos · ${todos.length}`} itemsCount={todos.length} action={() => setDisplayModalTodo(true)}>
            {
              todos.length
                ? todos.map((todo, key) => (
                  <Todo key={key} todo={todo} />
                ))
                : <Placeholder statusText="No todo." actionText="Create a todo" action={() => setDisplayModalTodo(true)} />
            }
          </Section>
          <Section name={`Tags · ${state.tags.length}`} itemsCount={state.tags.length} action={() => setDisplayModalTag(true)}>
            {
              state.tags.length
                ?
                state.tags.map((tag, key) => (
                  <Tag key={key} tag={tag} count={countByTag(tag.id)} />
                ))
                : <Placeholder statusText="No tags." actionText="Create a tag" action={() => setDisplayModalTag(true)} />
            }
          </Section>
          {displayModalTodo && <ModalTodo close={() => setDisplayModalTodo(false)} />}
          {displayModalTag && <ModalTag close={() => setDisplayModalTag(false)} />}
          {
            !displayModalTodo &&
            !displayModalTag &&
            <div className="main__action" onClick={() => setDisplayModalTodo(true)}>
              <img className="main__action-icon" src={iconPlus} alt="plus" />
            </div>
          }
        </div>
      </div>
    </div>
  );
};
