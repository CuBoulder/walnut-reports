<template>
  <div id="app">
    <div class="grid-child-a">
    <header>
        <div class="container report-header">
            <h1 id="report-name"> {{report}} </h1>
            <input type="text" placeholder="Search for a path, identikey, or email" v-model="search" @keyup.enter="handleSearch"/>
            <div id="search-modal" v-show="details">
                <div id="modal-content">
                    <span class="close" @click="details = null; search = null; ">&times;</span>
                    <h3> Searching for {{search}}</h3>
                    <div v-html="details"> </div>
                </div>
            </div>
        </div>
    </header>
    </div>
    <div class="grid-child-b">
        <ul id="side-menu">
            <div id="logo-header" class="container">
                <img src="/cu-logo.png" alt="cu logo" width="30px" height="auto"/>
                <h2 id="title"> Walnut </h2>
            </div>
            <li @click="$emit('onChangeReport', 'Walnut')" class="report-option"> Walnut </li>
            <li> <strong>Instances </strong> </li>
                <ul>
                    <li @click="$emit('onChangeReport', 'Available Instances')" class="report-option">Available Instances</li>
                    <li @click="$emit('onChangeReport', 'Instance Summary')" class="report-option">Instance Summary</li>
                    <li @click="$emit('onChangeReport', 'Instances by Bundle')" class="report-option">Instances by Bundle</li>
                </ul>
            <li> <strong> Users </strong> </li>
                <ul>
                    <li @click="$emit('onChangeReport', 'All Users')" class="report-option">All Users</li>
                    <li @click="$emit('onChangeReport', 'Site Owners')" class="report-option">Site owners</li>
                    <li @click="$emit('onChangeReport', 'Content Editors')" class="report-option">Content Editors</li>
                </ul>
            <li @click="$emit('onChangeReport', 'CSE')" class="report-option"> CSE </li>
            <li @click="$emit('onChangeReport', 'Site Stats')" class="report-option"> Site Stats </li>
            <li @click="$emit('onChangeReport', 'Walnut Users')" class="report-option"> Walnut API Users </li>
        </ul>
    </div>
    <div class="grid-child-c">
        <slot name="content" ></slot>
    </div>
    <!-- stats -->
    <div class="grid-child-d">
        <h2 id="stat-header"> Statistics </h2>
        <div id="site-stats">
            <div class="card">
                <p> <strong> avg_days_since_edit: </strong> 333 </p>
                <p> <strong> beans_avg: </strong> 54 </p>
                <p> <strong> beans_total: </strong> 68,000 </p>   
            </div>
            <div class="card">
                <p> <strong> nodes_avg: </strong> 155</p>
                <p> <strong> nodes_total: </strong> 196,447 </p>
                <p> <strong> single_node_instances: </strong> 155 </p>
            </div>
            <div class="card">
                <p> <strong> percent_responsive: </strong> 94.6% </p>   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BaseTheme',
    props: {
        report: String
    },
    data: function(){
        return{
            search: null,
            details: null
        }
    },
    methods:{
        getPathDetails: async function(pages){
            for(let i=1; i <= pages; i++){
                let res = await fetch(`/instance?page=${i}`).then(res => res.json());
                let items = await res._items;
                for(let j=0; j< items.length; j++){
                    if(items[j].path === this.search){
                        this.details = `<h1> ${items[j].path }</h1>
                                        <p> <strong> Created By: </strong> ${items[j].created_by}</p>
                                        <p> <strong> CSE Creator: </strong> ${items[j].cse_creator}</p>
                                        <p> <strong> CSE ID: </strong> ${items[j].cse_id}</p>
                                        <p> <strong> Google Tag Client ID: </strong> ${items[j].google_tag_client_container_id}</p>
                                        <p> <strong> Instance Type: </strong> ${items[j].instance_type}</p>
                                        <p> <strong> Pantheon Size: </strong> ${items[j].pantheon_size}</p>
                                        <p> <strong> Modified By: </strong> ${items[j].modified_by}</p>
                                        <h1> Bundles</h1>
                                        <p> list of bundles </p>
                                        <h1> Users</h1>
                                        <p> List of users / roles</p>`;
                        return;
                    }
                }
            }
            this.details = '<p> No results found </p>';
            return;
        },
        getIndentikeyDetails: function(){
            this.details = `<p> Identikey search to be added soon. </p>`;
            return;
        },
        getEmailDetails: function(){
            this.details = `<p> Email search to be added soon </p>`;
            return;
        },
        handleSearch: async function(){
            this.details = "Waiting for results... Please be patient";
            if(/.@colorado\.edu/g.test(this.search)){
                this.getEmailDetails();
            }
            else if(/^[a-z]{4}[0-9]{4}$/g.test(this.search)){
                this.getIndentikeyDetails();
            }
            else{
                // search for a path if not an email or identikey
                let res = await fetch(`/instance`).then(res => res.json());
                let max = Math.ceil(res._meta.total/res._meta.max_results);
                await this.getPathDetails(max);
            }
            return;
        }
    }
}
</script>

<style>
body{
    margin: 0px;
}

ul{
    padding: 1em;
}

li{
    list-style-type: none;
}

select{
    margin-left: 1em;
    padding: 3px;
    border-radius: 4px;
}

input{
    width: 40%;
    padding: 8px;
    padding-left: 15px;
    border-radius: 15px;
    border: none;
}

p{
    margin-top: 0px;
    margin-bottom: .5em;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    display: grid;
    grid-template-columns: 210px auto 250px;
    grid-template-rows: 60px 200px auto;
    grid-template-areas: 
    "side header header"
    "side stats stats"
    "side body body";
    min-height: 100vh;
}

#logo-header{
    display: flex;
    align-items: center;
    background-color: white;
    padding-left: 0px;
}

.menu-item{
    margin-top: .83em;
    margin-bottom: .83em;
    margin-left: .75em;
    color: black;
}

#title{
    margin-left: .5em;
    color: black;
}

.grid-child-a{ 
    grid-area: header; 
    background-color: #424242;
    border-bottom: 1px solid grey;
}

.grid-child-b{ 
    grid-area: side;
    background-color: white;
    color: black;
    border-right: 1px solid grey;
}
.grid-child-c{ 
    grid-area: body; 
    background-color: #424242;
/*     background-color: #eeeeee; */
}
.grid-child-d{ 
    grid-area: stats;
    padding-left: .5em;
    border-left: 1px solid grey;
    background-color: #424242;
    color: black;
}

#side-menu{
    margin-top: 0px;
    padding-top: 0px;
    position: fixed;
}

.container{
    padding-left: 10px;
}

.report-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10%;
}

#report-name{
    background-color: inherit;
    margin : 0px;
    padding-right: 1em;
    padding-top: .25em;
    color: white;
}
.content-child-a{ grid-area: table;}
.content-child-b{ grid-area: results;}
#content{
    display: grid;
    grid-template-columns: 50% auto;
    grid-template-rows: auto;
    grid-template-areas: 
    "table results"
    "table results";
    background-color: #424242;
    min-height: 80vh;
    padding-left: .5em;
    padding-right: 10%;
}
.header-options{
    display: flex;
    align-items: center;
}
.card{
    border: 1px solid lightgrey;
    background-color: #EEEEEE;
    padding: 1em;
    margin: .5em;
    color: black;
    border-radius: 4px;
}

.results-box{
    display: flex;
}

.report-option:hover{
/*     color: #CFB87C; */
    color: #0277BD;
    cursor: pointer;
    text-decoration: underline;
}
#stat-header{ margin: 0; margin-top: .5em; color: white;}
#site-stats{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

#search-modal{
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
}

#modal-content{
  background-color: #fefefe;
  margin: 50px auto;
  padding: 0px 20px;
  border: 1px solid #888;
  width: 70%; /* Could be more or less, depending on screen size */
}

.close{
    float:right;
    font-size: 36px;
}
.close:hover{
    cursor: pointer;
}

</style>







