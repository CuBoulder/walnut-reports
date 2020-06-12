<template>
  <BaseTheme v-slot:content @onChangeReport="changeReport" :report="report">
    <template v-if="report === 'Walnut'">
<!--    show an overview of users and instances     -->
        <Walnut/>
    </template>
    <template v-else-if="report === 'Available Instances'">
<!--    Get a list of the available instances -->
        <AvailableInstances/>
    </template>
    <template v-else-if="report === 'Instance Summary'">
<!--    show a summary of all of the instances -->
        <InstanceSummary/>
    </template>
    <template v-else-if="report === 'Lookup Instance'">
        <Walnut/>
    </template>
    <template v-else>
        <h1> sdfhsdjafhjk </h1>
    </template>

  </BaseTheme>
</template>

<script>
// this template manages which report to show

import BaseTheme from './components/BaseTheme.vue';
import Walnut from './components/Walnut.vue';
import AvailableInstances from './components/AvailableInstances';
import InstanceSummary from './components/InstanceSummary';

export default {
    name: 'App',
    data: function(){
        return{
          items: [],
          report: 'Walnut'
        };
    },
    methods:{
        changeReport: function(reportName){
            this.report = reportName;
        }
    },
    components: {
        BaseTheme, Walnut, AvailableInstances, InstanceSummary
    }
}
</script>
