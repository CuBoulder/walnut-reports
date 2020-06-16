<template>
  <BaseTheme v-slot:content @onChangeReport="changeReport" :report="report">
    <template v-if="report === 'Walnut'">
<!--    show an overview of users and instances     -->
        <Walnut/>
    </template>
    <template v-else-if="report === 'Walnut Users'">
        <WalnutUsers/>
    </template>
    <template v-else>
        <h1> Reports coming soon...  </h1>
    </template>

  </BaseTheme>
</template>

<script>
// this template manages which report to show

import BaseTheme from './components/BaseTheme.vue';
import Walnut from './components/Walnut.vue';
/*
import AvailableInstances from './components/AvailableInstances';
import InstanceSummary from './components/InstanceSummary';
*/
import WalnutUsers from './components/WalnutUsers.vue';

export default {
    name: 'App',
    data: function(){
        return{
          items: [],
          report: 'Walnut'
        };
    },
    mounted: function(){
        this.$store.dispatch('fetch_all_instances');
    },
    methods:{
        changeReport: function(reportName){
            this.report = reportName;
        }
    },
    components: {
        BaseTheme, Walnut, WalnutUsers
    }
}
</script>
