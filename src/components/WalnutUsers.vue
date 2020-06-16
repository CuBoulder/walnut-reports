<template v-slot:content>
    <div id="content">
    <div class="card" v-if="!auth">
        <div>
            <div class="header-options">
            <h3> Walnut Users  </h3>
            <select v-model="sort">
                <option selected value="all"> All </option>
                <option value="admin"> Admin</option>
                <option value="developer"> Developer</option>
                <option value="user"> User</option>
            </select>
            </div>
        </div>
        <table>
            <tr>
                <th> Username </th>
                <th> Role </th>
            </tr>
            <template v-for="i in users">
                <tr :key="i._id" v-if="i.role === sort || sort === 'all' ">
                    <td> {{i.username}} </td>
                    <td> {{i.role}} </td>
                </tr>
            </template> 
        </table>
        <div id="pagnation"> 
            <p class="see-more" @click="getNextPage(--page)"> Previous </p> 
            <span> | </span> 
            <p class="see-more" @click="getNextPage(++page)"> Next</p> 
        </div>
    </div>
    <div class="card" v-else> <p> {{auth}}</p></div>
    </div>
</template>

<script>
    export default{
        name: 'WalnutUsers',
        data: function(){
            return {
                users: [],
                auth: null,
                sort: 'all',
                page: 1,
                maxPages: 0
            }
        },
        mounted: function(){
            fetch('/accounts')
            .then(res => {
                if(res.status === 401){
                    this.auth = "Invalid Credentials. Please login to view users.";
                    throw new Error("Invalid login credentials");
                }
                else{
                    return res.json();
                }
            })
            .then(res => {
                this.maxPages = Math.ceil(res._meta.total / res._meta.max_results);
                this.users = res._items
            })
            .catch(err => console.error(err));
        },
        methods: {
            getNextPage: function(page){
                if(page <= 0) this.page = 1;
                if(page >= this.maxPages) this.page = this.maxPages;
                fetch(`/accounts?page=${this.page}`)
                .then(res => res.json())
                .then( res => this.users = res['_items'])
                .catch(err => console.error(err));
            }
        }
    }
</script>
<style scoped>

</style>