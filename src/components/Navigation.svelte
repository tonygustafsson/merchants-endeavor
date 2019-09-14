<script>
    import { game } from '../stores/game';
    import { resolution } from '../stores/resolution';
    import { routes } from '../constants/game';

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
        font-size: 100%;
        font-family: 'Redressed', cursive;
    }
    li {
        display: inline;
        margin-right: 0.5em;
    }
    li.active a {
        text-decoration: underline;
    }
    @media (min-width: 1000px) {
        ul {
            font-size: 170%;
        }
        li {
            margin-right: 1em;
        }
    }
</style>

<nav>
    <ul>
        {#if $resolution.mobile}
            <li class:active={currentRoutePage === routes.inventory}>
                <a href={`/${routes.inventory}`} on:click|preventDefault={() => game.changeRoute(routes.inventory)}>
                    Inventory
                </a>
            </li>
        {/if}
        <li class:active={currentRoutePage === routes.properties || currentRoutePage === routes.ship}>
            <a href={`/${routes.properties}`} on:click|preventDefault={() => game.changeRoute(routes.properties)}>
                Properties
            </a>
        </li>
        <li class:active={currentRoutePage === routes.staff}>
            <a href={`/${routes.staff}`} on:click|preventDefault={() => game.changeRoute(routes.staff)}>Staff</a>
        </li>
        <li class:active={currentRoutePage === routes.goods}>
            <a href={`/${routes.goods}`} on:click|preventDefault={() => game.changeRoute(routes.goods)}>Goods</a>
        </li>
        <li class:active={currentRoutePage === routes.logs}>
            <a href={`/${routes.logs}`} on:click|preventDefault={() => game.changeRoute(routes.logs)}>Logs</a>
        </li>
    </ul>
</nav>
