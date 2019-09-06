<script>
    import { game } from '../stores/game';
    import { resolution } from '../stores/resolution';

    let currentRoutePage = '';

    game.subscribe(value => {
        currentRoutePage = value.route.page;
    });
</script>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 110%;
        font-family: 'Redressed', cursive;
    }
    li {
        display: inline;
        margin-right: 1em;
    }
    li.active a {
        text-decoration: underline;
    }
    @media (min-width: 1000px) {
        ul {
            font-size: 170%;
        }
        li {
            margin-right: 0.5em;
        }
    }
</style>

<nav>
    <ul>
        {#if $resolution.mobile}
            <li class:active={currentRoutePage === 'inventory'}>
                <a href="/inventory" on:click|preventDefault={() => game.changeRoute('inventory')}>Inventory</a>
            </li>
        {/if}
        <li class:active={currentRoutePage === 'properties'}>
            <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>Properties</a>
        </li>
        <li class:active={currentRoutePage === 'staff'}>
            <a href="/staff" on:click|preventDefault={() => game.changeRoute('staff')}>Staff</a>
        </li>
        <li class:active={currentRoutePage === 'goods'}>
            <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>Goods</a>
        </li>
        <li class:active={currentRoutePage === 'logs'}>
            <a href="/logs" on:click|preventDefault={() => game.changeRoute('logs')}>Logs</a>
        </li>
    </ul>
</nav>
