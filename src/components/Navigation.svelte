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
        font-size: 170%;
        font-family: 'Redressed', cursive;
    }
    li {
        display: inline;
        margin-right: 1em;
    }
    li.active a {
        text-decoration: underline;
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
    </ul>
</nav>
