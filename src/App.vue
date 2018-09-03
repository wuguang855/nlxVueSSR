<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import  api from './api/index.js';
import './assets/common.css';

export default {

  created(){
  	api.initHeader(this);
  },

}
</script>
