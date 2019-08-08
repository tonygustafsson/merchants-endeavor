<script>
    import { ships } from './stores/ships.js';
</script>

<pre>Ships: {$ships}</pre>

<button on:click={() => ships.addShips(1)}>Buy ships</button>
<button on:click={() => ships.removeShips(1)}>Sell ship</button>
