<script>
    import { ticker } from './stores/ticker';
    import { time } from './stores/time';
    import { merchant } from './stores/merchant';
    import { game } from './stores/game';

    import Start from './pages/Start.svelte';
    import Stats from './pages/Stats.svelte';
    import Properties from './pages/Properties.svelte';
    import Goods from './pages/Goods.svelte';

    import Navigation from './components/Navigation.svelte';
    import Loader from './components/Loader.svelte';

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

        <Navigation />
    </div>

    <div class="container white-panel">
        {#if merchantLoadedFromStore}
            {#if $game.route === 'start'}
                <Start />
            {:else if $game.route === 'properties'}
                <Properties />
            {:else if $game.route === 'goods'}
                <Goods />
            {:else}
                <Stats />
            {/if}
        {:else}
            <h2>Loading data...</h2>
        {/if}
    </div>
</div>
