import { createStore } from 'redux';
import {rootReducer} from './RootReducer'

let store = createStore(rootReducer);