<template>
    <div id="content">
        <div id="results" class="card">
            <table>
                <tr>
                    <th> Created By </th>
                    <th> Pantheon Size </th>
                    <th> Path </th>
                </tr>
                <template v-for="i in items">
                    <tr :key="i.sid" >
                        <td> {{i.created_by}} </td>
                        <td> {{i.pantheon_size}} </td>
                        <td class="see-more" @click="getDetails(i['_id'])"> {{i.path}} </td>
                    </tr>
                </template> 
            </table>
            <div id="pagnation"> <p class="see-more" @click="getNextPage(--page)"> Previous </p> <span> | </span> <p class="see-more" @click="getNextPage(++page)"> Next</p> </div>
        </div>
        <div id="result-details" class="card">
            <template v-if="details">
                <h1> {{details.path }}</h1>
                <p> <strong> Created By: </strong> {{details.created_by}}</p>
                <p> <strong> CSE Creator: </strong> {{details.cse_creator}}</p>
                <p> <strong> CSE ID: </strong> {{details.cse_id}}</p>
                <p> <strong> Google Tag Client ID: </strong> {{details.google_tag_client_container_id}}</p>
                <p> <strong> Instance Type: </strong> {{details.instance_type}}</p>
                <p> <strong> Pantheon Size: </strong> {{details.pantheon_size}}</p>
                <p> <strong> Modified By: </strong> {{details.modified_by}}</p>
                <h1> Bundles</h1>
                <p> list of bundles </p>
                <h1> Users</h1>
                <p> List of users / roles</p>
            </template>
            <template v-else>
                <p> Click on a path name to see details about that instance</p>
            </template>
        </div>
    </div>
</template>

<script>
export default{
    name: 'InstaceSummary',
    data: function(){
        return { 
            items: [],
            details: null,
            page: 1,
            maxPages: 1
        }
    },
    mounted: function(){
        fetch(`/instance`)
        .then(res => res.json())
        .then(res => {
            this.items = res['_items'];
            this.maxPages = Math.floor(res._meta.total/res._meta.max_results);
        })
        .catch(err => console.error(err));
    },
    methods:{
        getDetails: function(id){
            fetch(`/instance/${id}`)
            .then(res => res.json())
            .then( res => this.details = res)
            .catch(err => console.error(err));
        },
        getNextPage(page){
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
#results{
/*     width: 50%;     */
    background-color: #eeeeee;
    height: 80vh;
    overflow: scroll;
    color: black;
    padding: .5em;
}

#result-details{
    background-color: #eeeeee;
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