import './App.scss';
import { useSelector, useStore } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Attribution, Filter, ModalTag, ModalTodo, ModalSettings, Placeholder, Search, Section, Todo, Tag } from './components';
import iconSettings from './images/settings.svg';
import iconHome from './images/home.svg';
import iconPlus from './images/plus.svg';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_NOT_COMPLETED } from './filters';
import { ADD_TAG, ADD_TODO, SET_OPTION_FILTER } from './actions';

export const App = () => {
  const store = useStore();
  const state = useSelector(s => s);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (demo) {
      store.dispatch({ type: ADD_TAG, payload: { text: 'Travail', color: '0', id: "tag-0" } });
      store.dispatch({ type: ADD_TAG, payload: { text: 'Personnel', color: '1', id: "tag-1" } });
      store.dispatch({ type: ADD_TAG, payload: { text: 'Association', color: '2', id: "tag-2" } });
      store.dispatch({ type: ADD_TAG, payload: { text: 'Repas', color: '3', id: "tag-3" } });
      store.dispatch({ type: ADD_TAG, payload: { text: 'Animaux', color: '4', id: "tag-4" } });
      store.dispatch({ type: ADD_TODO, payload: { text: 'Finaliser la présentation', color: '1', tag: "tag-1" } });
      store.dispatch({ type: ADD_TODO, payload: { text: 'Acheter des pommes', color: '4', tag: "tag-3" } });
      store.dispatch({ type: ADD_TODO, payload: { text: 'Nourir les chats', color: '2', tag: "tag-4" } });
      store.dispatch({ type: ADD_TODO, payload: { text: 'Caliner Malware', color: '2', tag: "tag-4" } });
    }
  }, [store, demo]);

  const [searchText, setSearchText] = useState('');
  const [displayModalTodo, setDisplayModalTodo] = useState(false);
  const [displayModalTag, setDisplayModalTag] = useState(false);
  const [displayModalSettings, setDisplayModalSettings] = useState(false);

  const todos = useMemo(() => {
    let searchTextInLowercase = searchText.toLowerCase();
    switch (state.options.filter) {
      case SHOW_COMPLETED:
        return state.todos.filter(
          todo => todo.completed === true && todo.text.toLowerCase().startsWith(searchTextInLowercase)
        );
      case SHOW_NOT_COMPLETED:
        return state.todos.filter(
          todo => todo.completed === false && todo.text.toLowerCase().startsWith(searchTextInLowercase)
        );
      case SHOW_ALL:
        return state.todos.filter(
          todo => todo.text.toLowerCase().startsWith(searchTextInLowercase)
        );
      default:
        return state.todos.filter(
          todo => todo.text.toLowerCase().startsWith(searchTextInLowercase)
        );
    }
  }, [state.options.filter, state.todos, searchText]);

  const countByTag = useCallback(id => {
    let count = 0;
    todos.forEach(todo => todo.tag === id && count++);
    return count;
  }, [todos]);

  const showHome = () => {
    setDisplayModalTodo(false);
    setDisplayModalTag(false);
    setSearchText('');
    store.dispatch({
      type: SET_OPTION_FILTER,
      payload: {
        filter: SHOW_ALL
      }
    });
  };

  return (
    <div className="app">
      <Attribution />
      <div className="app__wrapper">
        <div className="header">
          {!demo && <div className="header-demo" onClick={() => setDemo(true)}>Test with demo data</div>}
          <Search searchText={searchText} setSearchText={setSearchText} />
          <div className="header-action" onClick={(displayModalTag || displayModalTodo ? showHome : () => setDisplayModalSettings(true))}>
            <img className="header-action__icon" src={((displayModalTag || displayModalTodo) ? iconHome : iconSettings)} alt="home" />
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
          {displayModalSettings && <ModalSettings title="Settings" close={() => setDisplayModalSettings(false)} />}
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
