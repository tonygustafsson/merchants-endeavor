<script>
    import { game } from '../stores/game';

    let currentRoute = '';

    game.subscribe(value => {
        currentRoute = value.route;
    });
</script>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0.5em 0 0 0;
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
        <li class:active={currentRoute === 'general'}>
            <a href="/general" on:click|preventDefault={() => game.changeRoute('general')}>General</a>
        </li>
        <li class:active={currentRoute === 'properties'}>
            <a href="/properties" on:click|preventDefault={() => game.changeRoute('properties')}>Properties</a>
        </li>
        <li class:active={currentRoute === 'staff'}>
            <a href="/staff" on:click|preventDefault={() => game.changeRoute('staff')}>Staff</a>
        </li>
        <li class:active={currentRoute === 'goods'}>
            <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>Goods</a>
        </li>
    </ul>
</nav>
