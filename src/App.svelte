<script>
    import { game } from './stores/game';
    import { resolution } from './stores/resolution';

    import Start from './pages/StartPage.svelte';
    import Properties from './pages/PropertiesPage.svelte';
    import Ship from './pages/ShipPage.svelte';
    import Staff from './pages/StaffPage.svelte';
    import Goods from './pages/GoodsPage.svelte';
    import InventoryPage from './pages/InventoryPage.svelte';

    import Inventory from './components/Inventory.svelte';
    import Time from './components/Time.svelte';
    import Settings from './components/Settings.svelte';
    import Weather from './components/Weather.svelte';
    import Navigation from './components/Navigation.svelte';
    import Loader from './components/Loader.svelte';

    let gameLoaded = false;

    let unsubscribe = game.subscribe(value => {
        if (value.loaded === true) {
            gameLoaded = value.loaded;
            unsubscribe();
        }
    });
</script>

<style>
    .white-panel {
        background: rgba(255, 255, 255, 0.9);
    }
    h1 {
        text-shadow: 0px 0 20px #fff;
        margin: 0;
        cursor: pointer;
    }
    .footer {
        text-shadow: 0 0 10px #fff;
    }
</style>

<div class="app wrapper">
    <Loader />

    <header class="header">
        <h1
            on:click={() => {
                const route = $resolution.mobile ? 'inventory' : 'properties';
                return game.changeRoute(route);
            }}>
            Merchant's Endeavor
        </h1>

        {#if $game.started && $game.route.page !== 'start'}
            {#if !$resolution.mobile}
                <Time />
            {/if}
            <Weather />
        {/if}
    </header>

    {#if $game.started && $game.route.page !== 'start'}
        <div class="nav">
            <Navigation />
        </div>
    {/if}

    <div class="content white-panel">
        {#if gameLoaded}
            {#if !$game.started || $game.route.page === 'start'}
                <Start />
            {:else if $game.route.page === 'properties' && $game.route.id !== 0}
                <Ship />
            {:else if $game.route.page === 'properties'}
                <Properties />
            {:else if $game.route.page === 'staff'}
                <Staff />
            {:else if $game.route.page === 'goods'}
                <Goods />
            {:else}
                <InventoryPage />
            {/if}
        {:else}
            <h2>Loading data...</h2>
        {/if}
    </div>

    {#if $game.started && !$resolution.mobile}
        <div class="inventory white-panel">
            <Inventory />
        </div>
    {/if}

    <footer class="footer">
        Merchant's Endeavor &copy; 2019
        {#if $game.started && $game.route.page !== 'start'}
            <Settings />
        {/if}
    </footer>
</div>
