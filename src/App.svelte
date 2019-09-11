<script>
    import { game } from './stores/game';
    import { resolution } from './stores/resolution';

    import StartPage from './pages/StartPage.svelte';
    import LogsPage from './pages/LogsPage.svelte';
    import PropertiesPage from './pages/PropertiesPage.svelte';
    import ShipPage from './pages/ShipPage.svelte';
    import BusinessPage from './pages/BusinessPage.svelte';
    import StaffPage from './pages/StaffPage.svelte';
    import GoodsPage from './pages/GoodsPage.svelte';
    import InventoryPage from './pages/InventoryPage.svelte';

    import Notifications from './components/Notifications.svelte';
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
        color: #fff;
        text-shadow: 0 0 10px #000;
    }
</style>

<div class="app wrapper">
    <Loader />
    <Notifications />

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
                <StartPage />
            {:else if $game.route.page === 'ship' && $game.route.id !== 0}
                <ShipPage />
            {:else if $game.route.page === 'business' && $game.route.id !== 0}
                <BusinessPage />
            {:else if $game.route.page === 'properties'}
                <PropertiesPage />
            {:else if $game.route.page === 'logs'}
                <LogsPage />
            {:else if $game.route.page === 'staff'}
                <StaffPage />
            {:else if $game.route.page === 'goods'}
                <GoodsPage />
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
