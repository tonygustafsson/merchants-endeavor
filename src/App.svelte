<script>
    import { ticker } from './stores/ticker.js';
    import { crew } from './stores/crew.js';
    import { ships } from './stores/ships.js';

    import Weather from './Weather.svelte';
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Tick Game</h1>

<p>Tick: {$ticker}</p>

<Weather />

<pre>Crew members: {$crew}</pre>

<button on:click={() => crew.addCrewMembers(3)}>Find crew members</button>
<button on:click={() => crew.removeCrewMembers(1)}>Fire crew member</button>

<pre>Ships: {$ships}</pre>

<button on:click={() => ships.addShips(3)}>Buy ships</button>
<button on:click={() => ships.removeShips(1)}>Sell ship</button>
