import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as rawUseSelector } from 'react-redux';
import { combineReducers } from 'redux';
import studentReducer from './Student/slice';
import majorReducer from './Major/slice';
import facultyReducer from './Faculty/slice';

const reducer = combineReducers({
	students: studentReducer,
	major: majorReducer,
	faculty: facultyReducer,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export type AppDispatch = typeof store.dispatch;
export default store;
