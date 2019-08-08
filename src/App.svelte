<script>
    import { ticker } from './stores/ticker.js';

    import Crew from './Crew.svelte';
    import Ships from './Ships.svelte';
    import Weather from './Weather.svelte';
</script>

<style>
    .container {
        width: 80%;
        margin: 0 10%;
    }
</style>

<div class="container">
    <h1>Tick Game</h1>

    <p>Tick: {$ticker}</p>

    <Weather />

    <Crew />

    <Ships />
</div>
