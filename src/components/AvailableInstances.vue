<template>
    <div id="content">
        <div class="card">
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
                    <td> {{i.path}} </td>
                </tr>
            </template> 
        </table>
        </div>
    </div>
</template>

<script>
export default{
    name: 'AvailableInstances',
    data: function(){
        return { items: [] }
    },
    mounted: function(){
        fetch('/instance')
        .then(res => res.json())
        .then(res => {
            this.items = res['_items'];
        })
        .catch(err => console.error(err));
    }
}

</script>

<style>
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

</style>