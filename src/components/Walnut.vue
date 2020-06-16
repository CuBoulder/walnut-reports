<template v-slot:content>
    <div id="content">
        <!-- instances -->
        <div class="card content-child-a"> 
            <div id="tabs-header">
                <button id="button-instance" class="active" @click="handleClick($event, 'button-user')" value="instance"> Instances</button>
                <button id="button-user" @click="handleClick($event, 'button-instance')" value="user"> Users </button>
            </div>
<!--             show info about instances -->
            <div v-show="option==='instance'">
                <div class="header-options">
                <h3> {{instanceSelected}}: {{totalResults}}</h3>
                <select name="instance-options" v-model="instanceSelected">
                  <option value="All" selected>All</option>
                  <option value="Available">Available</option>
                  <option value="Down">Down</option>
                  <option value="Installed">Installed</option>
                  <option value="Launched" >Launched</option>
                </select>
                </div>
                <div>
                    <table>
                        <tr>
                            <th> Created By </th>
                            <th> Pantheon Size </th>
                            <th> Path </th>
                        </tr>
                        <template v-for="i in items">
                            <tr :key="i.sid" >
                                <td> {{i.created_by || 'n/a'}} </td>
                                <td> {{i.pantheon_size || 'n/a'}} </td>
                                <td class="see-more" @click="getDetails(i['_id'])"> {{i.path}} </td>
                            </tr>
                        </template> 
                    </table>
                    <div id="pagnation"> <p class="see-more" @click="getNextPage(--page)"> Previous </p> <span> | </span> <p class="see-more" @click="getNextPage(++page)"> Next</p> </div>
                </div>
            </div>
            <div v-show="option==='user'">
                <div class="header-options">
                <h3> {{userSelected}}: {{totalResults}}</h3>
                <select name="users-options" v-model="userSelected">
                  <option value="all" selected> All </option>o
                  <option value="access_manager">Access Manager</option>
                  <option value="campaign_manager">Campaign Manager</option>
                  <option value="configuration_manager">Configuration Manager</option>
                  <option value="content_editor">Content Editor</option>
                  <option value="edit_my_content">Edit My Content</option>
                  <option value="form_manager">Form Manager</option>
                  <option value="site_editor">Site Editor</option>
                  <option value="site_owner">Site Owner</option>
                </select>
                </div>
                <div>
                    <table>
                        <tr>
                            <th> Identikey </th>
                            <th> Email </th>
                        </tr>
                        <template v-for="i in items">
                            <tr :key="i.sid" >
                                <td> {{i.created_by || 'n/a'}} </td>
                                <td> {{i.created_by + '@colorado.edu'}} </td>
                            </tr>
                        </template> 
                    </table>
                    <div id="pagnation"> <p class="see-more" @click="getNextPage(--page)"> Previous </p> <span> | </span> <p class="see-more" @click="getNextPage(++page)"> Next</p> </div>
                </div>
            </div>
        </div>
        <!--  users -->
        <div class="card content-child-b">
            <template v-if="details">
                <h1> {{details.path }}</h1>
                <p> <strong> Created By: </strong> {{details.created_by || 'n/a'}}</p>
                <p> <strong> CSE Creator: </strong> {{details.cse_creator || 'n/a'}}</p>
                <p> <strong> CSE ID: </strong> {{details.cse_id || 'n/a'}}</p>
                <p> <strong> Google Tag Client ID: </strong> {{details.google_tag_client_container_id || 'n/a'}}</p>
                <p> <strong> Instance Type: </strong> {{details.instance_type || 'n/a'}}</p>
                <p> <strong> Pantheon Size: </strong> {{details.pantheon_size || 'n/a'}}</p>
                <p> <strong> Modified By: </strong> {{details.modified_by || 'n/a'}}</p>
                <h1> Bundles</h1>
                <p> list of bundles </p>
                <h1> Users</h1>
                <p> List of users / roles</p>
            </template>
            <template v-else>
                <p> Click on a path name to see details about that instance. For users, no additional information will be displayed. </p>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Walnut',
    data: function(){
        return {
            instanceSelected: "All",
            userSelected: "all",
            option: "instance",
            details: null,
            page: 1,
            totalResults: 500
        }
    },
    computed:{
        items(){return this.$store.state.items; },
        maxPages(){return this.$store.state.maxInstancePages; }
    },
    methods:{
        handleClick: function(e, id){
            this.option = e.target.value;
            document.getElementById(id).classList.remove("active");
            e.target.classList.add("active");
        },
        getDetails: function(id){
            fetch(`/instance/${id}`)
            .then(res => res.json())
            .then( res => this.details = res)
            .catch(err => console.error(err));
        },
        getNextPage: function(page){
            if(page <= 0) this.page = 1;
            if(page >= this.maxPages) this.page = this.maxPages;
            fetch(`/instance?page=${this.page}`)
            .then(res => res.json())
            .then( res => this.items = res['_items'])
            .catch(err => console.error(err));
        }
    }
}
</script>
<style>
    button{
        background-color: #eeeeee;
        border: none; 
        color: black;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    button:hover{
        cursor: pointer;
    }
    .active{
        border-bottom: 3px solid black;
    }
    #pagnation{
    display: flex;
    margin-top: 1em;
    }
    
    table{
        width: 100%;
        border-collapse: collapse;
    }
    
    th, td {
    /*   border-bottom: 1px solid black; */
      padding-top: 5px;
      padding-bottom: 5px;
      text-align: left;
    }
    
    tr:nth-child(even) {background-color: #d8d8d8;}
    
    .see-more{
        color: #0277BD;
        text-decoration: underline;
        margin: 0px;
    }
    
    .see-more:hover{
        cursor: pointer;
    }
</style>
