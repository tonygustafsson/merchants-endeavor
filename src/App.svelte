<script>
    import { onMount } from 'svelte';
    import { time as sTime } from './stores/time.js';
    import { crew } from './stores/crew.js';
    import { ships } from './stores/ships.js';

    const timeFormatter = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });

    onMount(async () => {});
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Tick Game</h1>

<p>Time: {timeFormatter.format($sTime)}</p>

<pre>Crew members: {$crew}</pre>

<button on:click={() => crew.addCrewMembers(3)}>Find crew members</button>
<button on:click={() => crew.removeCrewMembers(1)}>Fire crew member</button>

<pre>Ships: {$ships}</pre>

<button on:click={() => ships.addShips(3)}>Buy ships</button>
<button on:click={() => ships.removeShips(1)}>Sell ship</button>
