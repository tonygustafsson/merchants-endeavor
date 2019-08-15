<script>
    import { ticker } from './stores/ticker';
    import { time } from './stores/time';
    import { merchant } from './stores/merchant';

    import Loader from './components/Loader.svelte';
    import Start from './components/Start.svelte';
    import Merchant from './components/Merchant.svelte';
    import Time from './components/Time.svelte';
    import Inventory from './components/Inventory.svelte';
    import Crew from './components/Crew.svelte';
    import Ships from './components/Ships.svelte';
    import Weather from './components/Weather.svelte';
    import Settings from './components/Settings.svelte';

    let merchantLoadedFromStore = false;

    merchant.subscribe(value => {
        if (Object.hasOwnProperty.call(value, 'name')) {
            merchantLoadedFromStore = true;
        }
    });
</script>

<style>
    .container {
        width: 80%;
        margin: 1rem auto;
        padding: 1rem;
    }
    .white-panel {
        background: rgba(255, 255, 255, 0.8);
    }
    h1 {
        text-shadow: 0px 0 20px #fff;
        margin: 0;
    }
</style>

<div class="app">
    <Loader />

    <div class="container">
        <h1>Merchant Simulator</h1>
    </div>

    <div class="container white-panel">
        {#if merchantLoadedFromStore}
            {#if !$merchant.startedPlaying}
                <Start />
            {:else}
                <Time />
                <Weather />
                <Merchant />
                <Inventory />
                <Crew />
                <Ships />
                <Settings />
            {/if}
        {:else}
            <h2>Loading data...</h2>
        {/if}
    </div>
</div>
