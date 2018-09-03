import * as mutation from './mutation.types.js';

export default {
	ISHOME(state,value) {
      state.isHome=value;
   },
   SETUSERINFO(state,value) {
      state.user=value;
   },
   SETCOOKIES(state,value) {
		state.cookies = state.cookies || {};
		state.cookies[value[0]] = value[1];
   },

}
