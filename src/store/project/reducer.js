import * as actionTypes from './actions';
import { update } from '../utility';
import axios from '../../HttpClient';

const initialState = {
    currentProject: null,
    currentFile: null
};